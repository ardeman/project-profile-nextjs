import { useQuery } from '@tanstack/react-query'

import { getGithubRepoRequest } from '@/apis'

export const useGetProjects = () =>
  useQuery({
    queryKey: ['projects'],
    queryFn: () => getGithubRepoRequest(),
  })
