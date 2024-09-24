import { useQuery } from '@tanstack/react-query'

import { getCsvRequest } from '@/apis'

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getCsvRequest('/linkedin/Profile.csv'),
  })
