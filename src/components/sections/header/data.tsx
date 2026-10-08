import { FaGithub, FaLinkedin } from 'react-icons/fa6'

import { TSocial } from './type'

export const socials: TSocial[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ardeman',
    icon: <FaGithub className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ardeman/',
    icon: <FaLinkedin className="h-5 w-5" />,
  },
]
