export const featuredProjects = [
  {
    name: 'project_cobalagi_flutter',
    title: 'Coba Lagi',
    linkLabel: 'View project',
    category: 'Playful learning',
    summary:
      'A coding adventure for children using picture blocks and spoken instructions.',
    technologies: ['Flutter', 'Dart', 'Android'],
    image: '/images/projects/cobalagi.png',
    video: {
      id: 'WotaFEFb2ug',
      title: 'Coba Lagi 2.1.0: learn to code through play, no reading needed',
    },
    alt: 'Coba Lagi coding game with a path, character, and visual instruction blocks',
    problem:
      'Introduce coding concepts through play, including for children who are still learning to read.',
    contribution:
      'Visual coding puzzles with spoken instructions in Indonesian and English, plus a typed-code mode for children who can read.',
    result:
      'Children arrange instructions to guide a character to the goal, then explore loops and other coding concepts.',
  },
  {
    name: 'project-catatsaja-reactrouter',
    title: 'Catat Saja',
    linkLabel: 'View project',
    category: 'Everyday tools',
    summary:
      'Notes, tasks, finances, and health logs, encrypted and shared in one place.',
    technologies: ['React Router', 'TypeScript', 'Firebase', 'Web Crypto'],
    image: '/images/projects/catatsaja.png',
    darkImage: '/images/projects/catatsaja-dark.png',
    video: {
      id: 'iLcWg5vs8Hs',
      title:
        'Catat Saja v2026-10-11: notes, budget and family health in one private app',
    },
    alt: 'Catat Saja landing page showing a weekly plan note, a grocery checklist, a shared health log, and a trip finance book with spending by category',
    problem:
      'Keep everyday notes, tasks, money, and family health records together, with control over who can read them.',
    contribution:
      'A React Router and Firebase app with autosaving Markdown notes, checklists, multi-currency finance books with cash flow and spending charts, and health logs for body measurements, child growth, lab results, calories, and periods. Web Crypto encrypts records on the device, including when sharing them.',
    result:
      'Search across notes, tasks, finances, and health logs, and share any record with view or edit access and real-time updates. Finance entries keep their exchange rates, and health charts show trends and reference ranges. Available in English and Indonesian as an installable app for phones and computers.',
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
