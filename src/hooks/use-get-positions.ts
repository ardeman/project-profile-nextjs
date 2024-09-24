import { useQuery } from '@tanstack/react-query'

import { getCsvRequest } from '@/apis'

export const useGetPositions = () =>
  useQuery({
    queryKey: ['positions'],
    queryFn: () => getCsvRequest('/linkedin/Positions.csv'),
  })
