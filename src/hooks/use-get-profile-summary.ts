import { useQuery } from '@tanstack/react-query'

import { fetchCsv } from '@/apis'

export const useGetProfileSummary = () =>
  useQuery({
    queryKey: ['profile-summary'],
    queryFn: () => fetchCsv('/linkedin-data-export/Profile Summary.csv'),
  })
