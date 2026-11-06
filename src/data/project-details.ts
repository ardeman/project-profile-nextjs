import { TProjectDetails } from '@/types'

// Curated copy for any repository, whether or not it appears in Selected work.
export const projectDetails: TProjectDetails[] = [
  {
    name: 'project_cobalagi_flutter',
    title: 'Coba Lagi',
    linkLabel: 'View project',
    category: 'Playful learning',
    summary:
      'A coding adventure for children using picture blocks and spoken instructions.',
    technologies: [
      'Flutter',
      'Dart',
      'Android',
      'iOS',
      'Windows',
      'macOS',
      'Linux',
    ],
    image: '/images/projects/cobalagi.png',
    video: {
      id: 'QtcAlUmpbhU',
      title: 'Coba Lagi 2.9.0: learn to code through play, no reading needed',
    },
    alt: 'Coba Lagi coding game with a path, character, and visual instruction blocks',
    problem:
      'Introduce coding concepts through play, including for children who are still learning to read.',
    contribution:
      'Visual coding puzzles with spoken instructions in Indonesian, English, Javanese, and Sundanese, plus a typed-code mode for children who can read. Playable with a game controller, including on Steam Deck.',
    result:
      'Children arrange instructions to guide a character to the goal, then explore loops and other coding concepts. Available on Google Play and the App Store, and as downloads for Windows, macOS, and Linux, including Steam Deck.',
  },
  {
    name: 'project_bedug_flutter',
    title: 'Bedug',
    linkLabel: 'View project',
    category: 'Daily worship',
    summary:
      'Prayer times, the Qibla, the Quran, and a Hijri calendar, free and private.',
    technologies: ['Flutter', 'Dart', 'Riverpod', 'iOS', 'WidgetKit'],
    image: '/images/projects/bedug.png',
    alt: 'Three Bedug iPhone screens: the opening page of Al-Baqara in page mode, prayer times counting down to Asr in Jakarta, and the Qibla compass above the worship menu',
    problem:
      'Keep prayer times, reminders, and daily worship in one app that works offline, without ads or an account.',
    contribution:
      'A Flutter app with Kemenag RI or nine global calculation methods, adhan reminders, the Quran with page mode and a khatam planner, morning and evening dhikr, a Qibla compass, a Hijri calendar, a Ramadan fasting log, and a zakat calculator. Its design follows each platform, with Liquid Glass on Apple devices, plus home screen and lock screen widgets.',
    result:
      'Everything is calculated on the device, so reading, bookmarks, and fasting logs stay private. Available in Indonesian, English, Arabic, and Malay on the App Store for iPhone and iPad.',
  },
  {
    name: 'project-catatsaja-reactrouter',
    title: 'Catat Saja',
    linkLabel: 'View project',
    category: 'Everyday tools',
    summary:
      'Notes, tasks, finances, and health logs, encrypted and shared in one place.',
    technologies: [
      'React Router',
      'TypeScript',
      'Firebase',
      'Web Crypto',
      'Gemini',
    ],
    image: '/images/projects/catatsaja.png',
    darkImage: '/images/projects/catatsaja-dark.png',
    video: {
      id: 'KAJqhUYZLLQ',
      title: '4 real-life stories, 1 private app | Catat Saja',
    },
    alt: 'Catat Saja landing page showing a weekly plan note, a grocery checklist, a shared health log, and a trip finance book with spending by category',
    problem:
      'Keep everyday notes, tasks, money, and family health records together, with control over who can read them.',
    contribution:
      'A React Router and Firebase app with autosaving Markdown notes, checklists, multi-currency finance books with cash flow and spending charts, savings goals, and recurring entries, and health logs for body measurements, child growth, lab results, calories, and a period calendar with predictions, plus medicine reminders with dose tracking. Gemini helps scan receipts, dictate notes, and turn pasted text into tasks. Web Crypto encrypts records on the device, including when sharing them.',
    result:
      'Search across notes, tasks, finances, and health logs, and share any record with view or edit access, real-time updates, and push notifications for reminders and invitations. Finance entries keep their exchange rates, and health charts show trends and reference ranges. Available in English and Indonesian as an installable app for phones and computers.',
  },
  {
    name: 'project-profile-nextjs',
    title: 'Personal portfolio',
    linkLabel: 'View project',
    category: 'Personal website',
    summary: 'Selected projects and professional experience in one place.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/images/projects/portfolio.png',
    darkImage: '/images/projects/portfolio-dark.png',
    alt: 'Ardeman personal portfolio showing the introduction and selected work',
    problem: 'Make professional experience and selected work easy to explore.',
    contribution:
      'A responsive portfolio built with Next.js and Tailwind CSS, with clear navigation and support for light and dark themes.',
    result:
      'Visitors can explore projects and experience using a keyboard or touch, with project details available even when live updates fail.',
  },
]

// Repositories shown in Selected work, in display order. Removing a name here
// keeps its details in the archive.
export const featuredProjectNames = [
  'project_cobalagi_flutter',
  'project_bedug_flutter',
  'project-catatsaja-reactrouter',
]

// Forks are hidden from the archive unless the owner contributed to them.
export const contributedForkNames = ['project-tesbareng-react']

export const getProjectDetails = (name: string) =>
  projectDetails.find((project) => project.name === name)

export const featuredProjects = featuredProjectNames
  .map((name) => getProjectDetails(name))
  .filter((project): project is TProjectDetails => Boolean(project))
