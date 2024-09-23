import { useQuery } from '@tanstack/react-query'

import { getCsvRequest } from '@/apis'

export const useGetSkills = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: () => getCsvRequest('/linkedin-data-export/Skills.csv'),
  })
