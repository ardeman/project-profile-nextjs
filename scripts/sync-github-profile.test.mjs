import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { parseProfileCsv } from './profile-data.mjs'
import {
  renderGithubProfile,
  syncGithubProfile,
  updateManagedSections,
} from './sync-github-profile.mjs'

const fixtures = {
  'Profile.csv':
    'First Name,Headline,Summary,Address\nExample,Engineer & Lead,"Build interfaces.\\nLead teams.",PRIVATE',
  'Profile Summary.csv': 'Profile Summary\nUseful interfaces.',
  'Positions.csv':
    'Company Name,Title,Description,Location,Started On,Finished On\nExample Inc.,Lead,"- Build back-office tools. - Review code.",Jakarta,May 2023,',
  'Skills.csv': 'Name\nReact.js\nSQL\n',
}
const original = [
  'KEEP BANNER',
  '<!-- portfolio-profile:intro:start -->',
  'old intro',
  '<!-- portfolio-profile:intro:end -->',
  'KEEP BADGES',
  '<!-- portfolio-profile:details:start -->',
  'old details',
  '<!-- portfolio-profile:details:end -->',
  'KEEP STATS AND CONTACTS',
  '',
].join('\n')

test('preserves handwritten content, updates CSV copy and is idempotent', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'github-profile-'))
  try {
    const input = path.join(root, 'public/linkedin')
    await mkdir(input, { recursive: true })
    await Promise.all(
      Object.entries(fixtures).map(([name, source]) =>
        writeFile(path.join(input, name), source)
      )
    )
    const target = path.join(root, 'README.md')
    await writeFile(target, original)
    assert.equal(await syncGithubProfile(target, root), true)
    const updated = await readFile(target, 'utf8')
    assert.match(updated, /KEEP BANNER\n<!-- portfolio-profile:intro:start -->/)
    assert.match(
      updated,
      /<!-- portfolio-profile:intro:end -->\nKEEP BADGES\n<!-- portfolio-profile:details:start -->/
    )
    assert.match(
      updated,
      /<!-- portfolio-profile:details:end -->\nKEEP STATS AND CONTACTS\n$/
    )
    assert.match(updated, /Engineer &amp; Lead/)
    assert.match(updated, /Build interfaces\.\n\nLead teams\./)
    assert.match(updated, /May 2023 – Present · Jakarta/)
    assert.match(updated, /- Build back-office tools\.\n- Review code\./)
    assert.match(updated, /<code>React\.js<\/code> · <code>SQL<\/code>/)
    assert.doesNotMatch(updated, /PRIVATE|old intro|old details/)
    assert.equal(await syncGithubProfile(target, root), false)
    await writeFile(path.join(input, 'Skills.csv'), 'Name\nTypeScript\n')
    assert.equal(await syncGithubProfile(target, root), true)
    assert.doesNotMatch(
      await readFile(target, 'utf8'),
      /<code>React\.js<\/code> · <code>SQL<\/code>/
    )
    const previous = await readFile(target, 'utf8')
    await writeFile(path.join(input, 'Skills.csv'), 'Wrong\nSQL\n')
    await assert.rejects(syncGithubProfile(target, root), /Skills\.csv:/)
    assert.equal(await readFile(target, 'utf8'), previous)
    await writeFile(path.join(input, 'Skills.csv'), fixtures['Skills.csv'])
    await writeFile(target, 'Handwritten README without markers')
    await assert.rejects(syncGithubProfile(target, root), /markers/)
    assert.equal(
      await readFile(target, 'utf8'),
      'Handwritten README without markers'
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('rejects missing, repeated, reversed and nested managed sections', () => {
  const sections = { intro: 'New intro', details: 'New details' }
  for (const input of [
    'Unmarked README',
    original + '<!-- portfolio-profile:intro:start -->',
    original
      .replace('portfolio-profile:intro:start', 'TEMP')
      .replace('portfolio-profile:intro:end', 'portfolio-profile:intro:start')
      .replace('TEMP', 'portfolio-profile:intro:end'),
    '<!-- portfolio-profile:intro:start --><!-- portfolio-profile:details:start --><!-- portfolio-profile:details:end --><!-- portfolio-profile:intro:end -->',
  ])
    assert.throws(() => updateManagedSections(input, sections), /README\.md:/)
})

test('escapes HTML and Markdown from profile content', () => {
  const data = Object.fromEntries(
    Object.entries(fixtures).map(([name, source]) => [
      name,
      parseProfileCsv(source, name),
    ])
  )
  data['Profile.csv'][0]['First Name'] = '<script>name</script>'
  data['Profile.csv'][0].Summary =
    '<!-- portfolio-profile:intro:end --> [link](bad) **bold**'
  const sections = renderGithubProfile(data)
  data['Skills.csv'][0].Name = '<img src=x onerror=alert(1)>`skill`'
  const escapedSkills = renderGithubProfile(data).details
  assert.doesNotMatch(escapedSkills, /<img/)
  assert.match(
    escapedSkills,
    /<code>&lt;img src=x onerror=alert\(1\)&gt;`skill`<\/code>/
  )
  assert.doesNotMatch(sections.intro, /<script>/)
  assert.match(sections.intro, /&lt;script&gt;name/)
  assert.doesNotMatch(sections.details, /<!--|\[link]|\*\*bold\*\*/)
})
