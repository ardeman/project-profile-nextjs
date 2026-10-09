# AGENTS.md

Instructions for AI coding agents working in this repository. Read [README.md](README.md)
for the overview, setup, commands, layout, content workflow, and deployment.
This file owns conventions and architectural constraints.

## Definition of done

- For application, styling, configuration, or content changes, run the commands
  under [README → Checks](README.md#checks). Report what actually ran and any
  failures; never claim an unrun check passed.
- For UI changes, also inspect the result using
  [README → Checking UI changes](README.md#checking-ui-changes). Compilation
  cannot detect clipped focus outlines, obscured anchors, or broken layouts.
- Check changed behavior with meaningful tests or browser checks. Add automated
  regression coverage when it justifies its setup; do not introduce a testing
  dependency solely for a trivial visual or copy edit.
- For documentation-only changes, check Markdown formatting and local links.
  Keep commands accurate against `package.json` and the repository configuration.
- Summarize the change, validation, and any remaining limitations.

## Conventions

- Use Conventional Commit subjects as described in [README → Commits](README.md#commits).
- Follow `.eslintrc.json` and `.prettierrc`. Fix lint findings rather than adding
  suppressions; if a suppression is necessary, explain the reason next to it.
- Use TypeScript and kebab-case filenames. Follow the existing section/component
  folders and named exports; framework route files keep their default exports.
- Import shared project modules through their `@/` barrel exports. The lint
  configuration restricts deep imports and parent-directory imports. Add new
  shared exports to the relevant `index.ts`.
- Keep browser state local. Shared theme state belongs in its context; remote
  project state belongs in the TanStack Query hook. Do not duplicate fetched
  profile state or add another state library for a local interaction.
- Keep server filesystem access in `src/lib/` and server routes. Profile data
  is read at build time and passed into the client provider. Serialize only the
  profile fields the UI uses; do not restore browser CSV-fetching hooks.
- Browser APIs belong in effects or event handlers. Initial rendering must work
  during static export; avoid reading localStorage, matchMedia, or window at
  module scope or during the initial render.
- Read the relevant implementation before editing. Preserve unrelated work in
  the working tree and follow the user's current commit/push scope.

## UI and content

- Use the existing semantic theme tokens and shared controls; see
  [README → Styling](README.md#styling). Use accent color for actions and active
  states, muted text for supporting copy, and `on-accent` on filled buttons.
- Preserve the editorial hierarchy: distinctive name, readable body copy, quiet
  monospace labels, visible section headings, and strong project visuals.
- Make controls usable with keyboard and touch. Primary buttons, icon controls,
  and filter buttons have at least 44px targets. Keep focus visible within clipped
  cards and separate theme options so their outlines do not overlap.
- Keep mobile section navigation sticky and anchor offsets clear of it. Ensure
  the desktop sidebar remains usable at short window heights.
- Prefer native controls, including `details` for disclosures. Use button groups
  with `aria-pressed` for filters unless implementing complete tab semantics.
- Maintain reduced-motion behavior. The cursor effect must stay out of React's
  page-level state and remain disabled for touch/reduced-motion users.
- Keep profile copy, page metadata, résumé links, screenshots, and sharing images
  consistent using the sources listed in [README → Updating content](README.md#updating-content).
- Claims must be supported by the owner's profile and actual project features.
  Do not invent impact metrics, job history, contact details, or authenticated
  product screens. Use authentic screenshots and descriptive alt text.

## Guardrails

- Preserve static export to GitHub Pages. Server-only runtime features such as
  API routes, server actions, request-time rendering, or an image optimization
  service need an explicit architecture change and hosting plan.
- GitHub refreshes are optional enhancements. Retain the committed snapshot on
  failure, keep requests bounded, and avoid letting refresh errors obscure
  usable content. The site must not need a token to display public projects.
- Keep the build independent of live GitHub availability. Refresh snapshots
  through the documented script and commit the resulting data deliberately.
- Add dependencies through pnpm and include `pnpm-lock.yaml`. Keep the existing
  package manager, framework version alignment, and deployment toolchain unless
  the task calls for changing them.
- Never commit secrets or private profile data. Files in `public/` are published
  directly; `.env` values and GitHub tokens do not belong in browser code.
- The LinkedIn workflow prepares reviewable text only; see
  [README → LinkedIn update drafts](README.md#linkedin-update-drafts). Keep its
  output outside `public/`. Do not introduce account credentials or browser
  automation as a substitute for approved profile-edit API access.
- Do not hand-edit generated output in `.next/`, `out/`, `node_modules/`,
  `next-env.d.ts`, or TypeScript build-info files. Use an isolated checkout if a
  development server and validation build would share generated output.
- The current résumé PDF is generated output. Edit its CSV inputs and
  `src/data/resume.json`, then use the generator described in
  [README → Résumé and sharing images](README.md#résumé-and-sharing-images).
  Keep generation before static export and outside browser code.
- Pushing `main` publishes through the workflow; see [README → Deployment](README.md#deployment).
  Follow the user's authorization for commits, pushes, and publishing without
  adding a separate approval requirement when that action is already authorized.

## Keeping docs current

- When setup, commands, source locations, or deployment change, update `README.md`.
  When conventions or constraints change, update this file.
- Keep one owner for each topic; link to it instead of copying instructions.
- `CLAUDE.md` and `GEMINI.md` must each contain only `@AGENTS.md` and a newline.
- Add an architectural decision below when a change alters how the application
  is built or maintained. State its date, choice, and reason in one line.

## Decisions

The entries below document the existing architecture as of 2026-10-09; the date
is the documentation date, not a claim about when a dependency was introduced.

- 2026-10-09: Next.js App Router with static export on GitHub Pages keeps deployment simple and requires no application server.
- 2026-10-09: Parse curated profile CSV files during the build so the introduction and experience render immediately and remain readable without JavaScript.
- 2026-10-09: Commit a GitHub snapshot and refresh it with TanStack Query so project content survives API failures and rate limits.
- 2026-10-09: Keep featured project selection and case-study copy separate from GitHub metadata so the homepage order and descriptions remain intentional.
- 2026-10-09: Share semantic CSS theme tokens across both themes and bundle fonts locally for consistent styling without a font service.
- 2026-10-09: Apply the theme before painting, then manage it through React context so saved/system preferences work without an initial background flash.
- 2026-10-09: Use native disclosures for project details and earlier experience so those interactions also work without JavaScript.
- 2026-10-09: Generate LinkedIn profile drafts on curated CSV changes so wording can be reused without requiring restricted profile-edit API access.
- 2026-10-09: Generate the résumé from curated CSVs and preserved education/contact details before each static build so the website and downloadable PDF share current content.
