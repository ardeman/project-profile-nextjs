import axios from 'axios'

export const getGithubRepoRequest = async () => {
  const response = await axios.get('https://api.github.com/users/ardeman/repos')
  return response.data
}
