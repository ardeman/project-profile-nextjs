import { useQuery } from '@tanstack/react-query'

import { fetchCsv } from '@/apis'

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchCsv('/linkedin-data-export/Profile.csv'),
  })
