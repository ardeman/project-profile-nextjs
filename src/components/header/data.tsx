import { GitHubIcon, LinkedInIcon } from '@/components/icons'

import { TSocial } from './type'

export const socials: TSocial[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ardeman',
    icon: <GitHubIcon className="h-6 w-6" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ardeman/',
    icon: <LinkedInIcon className="h-6 w-6" />,
  },
]
