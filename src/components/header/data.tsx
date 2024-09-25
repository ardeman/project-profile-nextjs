import { TSocial } from './type'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export const socials: TSocial[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ardeman',
    icon: <FaGithub className="h-6 w-6" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ardeman/',
    icon: <FaLinkedin className="h-6 w-6" />,
  },
]
