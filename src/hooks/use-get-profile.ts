import { useQuery } from '@tanstack/react-query'

import { fetchCsvData } from '@/apis'

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchCsvData('/linkedin/Profile.csv'),
  })
