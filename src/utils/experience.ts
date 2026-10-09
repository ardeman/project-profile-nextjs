const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

/**
 * Parses dates formatted like "May 2023" or returns the current date for "Present" / empty.
 */
const parseDate = (dateString?: string): Date => {
  if (!dateString || dateString.toLowerCase() === 'present') {
    return new Date()
  }

  const parts = dateString.trim().split(/\s+/)
  if (parts.length === 2) {
    const monthKey = parts[0].toLowerCase().slice(0, 3)
    const month = MONTH_MAP[monthKey] ?? 0
    const year = Number.parseInt(parts[1], 10)
    if (!Number.isNaN(year)) {
      return new Date(year, month, 1)
    }
  }

  return new Date()
}

/**
 * Calculates human-readable duration between two dates (e.g., "1 yr 5 mos", "8 mos").
 */
export const calculateDuration = (
  startedOn?: string,
  finishedOn?: string
): string => {
  if (!startedOn) return ''

  const startDate = parseDate(startedOn)
  const endDate = parseDate(finishedOn)

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1

  if (totalMonths <= 0) totalMonths = 1

  const years = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12

  const parts: string[] = []
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  }
  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`)
  }

  return parts.join(' ')
}

/**
 * Splits raw description text into individual bullet strings without leading dashes.
 */
export const parseDescriptionBullets = (description?: string): string[] => {
  if (!description) return []

  return description
    .replaceAll(String.raw`\n`, '\n')
    .split(/(?:^|\s+)-\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

/**
 * Known tech keywords to scan for in case a position is dynamically added.
 */
const KNOWN_TECHNOLOGIES = [
  'Next.js',
  'React.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Vue.js',
  'Nuxt.js',
  'Angular.js',
  'Angular',
  'Laravel',
  'PHP',
  'Alpine.js',
  'CodeIgniter',
  'Tailwind CSS',
  'Tailwind',
  'Bootstrap',
  'jQuery',
  'HTML',
  'CSS',
  'WordPress',
  'Wordpress',
  'Mule ESB',
  'SQL Server',
  'REST API',
  'CMS',
]

/**
 * Curated technology skills per company for rich presentation, with automatic fallback extraction.
 */
const COMPANY_SKILLS_MAP: Record<string, string[]> = {
  'PT. Griya Mitra Digital': [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Sprint Planning',
    'Code Review',
  ],
  Pintek: ['Next.js', 'React', 'Tailwind CSS', 'Laravel', 'Alpine.js'],
  goKampus: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'CMS'],
  'FWD Singapore Pte. Ltd.': [
    'Vue.js',
    'Nuxt.js',
    'AngularJS',
    'WordPress',
    'Mule ESB',
    'SQL Server',
  ],
  'PT Daya Gagas Indonesia (FishOn)': [
    'HTML5',
    'CSS3',
    'Bootstrap',
    'jQuery',
    'Responsive Design',
  ],
  'PT. Integra Klinika Indonesia': [
    'CodeIgniter',
    'PHP',
    'Bootstrap',
    'jQuery',
    'REST API',
  ],
}

/**
 * Gets technologies associated with a position based on company name or description extraction.
 */
export const getPositionSkills = (
  companyName: string,
  description?: string
): string[] => {
  const predefined = COMPANY_SKILLS_MAP[companyName]
  if (predefined) return predefined

  if (!description) return []

  const found: string[] = []
  for (const tech of KNOWN_TECHNOLOGIES) {
    const escaped = tech.replaceAll(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`)
    const regex = new RegExp(`\\b${escaped}\\b`, 'i')
    if (regex.test(description)) {
      let normalized = tech
      if (tech === 'Tailwind') normalized = 'Tailwind CSS'
      if (tech === 'Wordpress') normalized = 'WordPress'
      if (tech === 'React.js' || tech === 'React') normalized = 'React'
      if (tech === 'Angular.js' || tech === 'Angular') normalized = 'Angular'
      if (!found.includes(normalized)) {
        found.push(normalized)
      }
    }
  }

  return found
}
