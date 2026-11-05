import { FaGithub, FaGooglePlay, FaLinkedin, FaYoutube } from 'react-icons/fa6'

import { TSocial } from './type'

export const youtubeChannel = {
  handle: '@MrArdeman',
  url: 'https://www.youtube.com/@MrArdeman',
}

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
  {
    name: 'YouTube',
    url: youtubeChannel.url,
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    name: 'Google Play',
    url: 'https://play.google.com/store/apps/dev?id=7867682702873066080',
    icon: <FaGooglePlay className="h-5 w-5" />,
  },
]
