import { useQuery } from '@tanstack/react-query'

import { getCsvRequest } from '@/apis'

export const useGetProfileSummary = () =>
  useQuery({
    queryKey: ['profile-summary'],
    queryFn: () => getCsvRequest('/linkedin-data-export/Profile Summary.csv'),
  })
