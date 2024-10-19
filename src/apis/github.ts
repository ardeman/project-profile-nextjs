import axios from 'axios'

import { github } from '@/constants'

export const getGithubRepoRequest = async () => {
  try {
    const data = await axios.get(
      `https://api.github.com/users/${github.username}/repos`,
      {
        params: {
          sort: 'updated',
          direction: 'desc',
        },
      }
    )

    return data
  } catch (error) {
    throw new Error('Error fetching Github repos', { cause: error })
  }
}
