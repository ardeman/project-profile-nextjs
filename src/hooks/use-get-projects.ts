import { useQuery } from '@tanstack/react-query'

import { getGithubRepoRequest } from '@/apis'
import snapshot from '@/data/projects.json'
import { TGithubRepo } from '@/types'

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ['projects'],
    queryFn: getGithubRepoRequest,
    initialData: snapshot as TGithubRepo[],
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
  return query
}
