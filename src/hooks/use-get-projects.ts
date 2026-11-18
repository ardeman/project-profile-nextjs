import { useQuery } from '@tanstack/react-query'

import { getGithubRepoRequest } from '@/apis'
import { mergeProjectsWithLocal } from '@/data/local-projects'
import snapshot from '@/data/projects.json'
import { TGithubRepo } from '@/types'

const savedProjects: TGithubRepo[] = mergeProjectsWithLocal(snapshot)

export const useGetProjects = () =>
  useQuery({
    queryKey: ['projects'],
    queryFn: async ({ signal }) =>
      mergeProjectsWithLocal(await getGithubRepoRequest(signal)),
    initialData: savedProjects,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
