import { HomePage } from '@/components/pages'
import { LinkedinProvider } from '@/contexts'
import { getProfile } from '@/lib'

const Home = async () => (
  <LinkedinProvider data={await getProfile()}>
    <HomePage />
  </LinkedinProvider>
)
export default Home
