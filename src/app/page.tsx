import { HomePage } from '@/components/pages'
import { LinkedinProvider } from '@/contexts'
import { getProfile } from '@/lib'

export default async function Home() {
  return (
    <LinkedinProvider data={await getProfile()}>
      <HomePage />
    </LinkedinProvider>
  )
}
