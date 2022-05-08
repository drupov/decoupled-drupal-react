import Players from './Players'
import CreatePlayer from './CreatePlayer'
import { useAuthenticated } from 'drupal-react-oauth-provider'

const Overview = () => {
  const isAuthenticated = useAuthenticated()

  return (
    <>
      {isAuthenticated && <CreatePlayer />}
      <Players />
    </>
  )
}

export default Overview
