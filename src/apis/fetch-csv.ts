import axios from 'axios'

export const fetchCsv = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' })
  const text = await response.data.text()
  return text
}
