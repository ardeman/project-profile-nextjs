import axios from 'axios'

export const getCsvRequest = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' })
  const text = await response.data.text()
  return text
}
