import { useLazyLogin, useLazyLogout, useAuthenticated } from 'drupal-react-oauth-provider'
import { useApolloClient } from '@apollo/client'

const Login = () => {
  const isAuthenticated = useAuthenticated()

  const [login, {loading, error, data}] = useLazyLogin()
  const [logout] = useLazyLogout()
  const logoutUser = async () => {
    logout();
  }
  const client = useApolloClient()

  if (!isAuthenticated) {
    const username = 'editor'
    const password = 'editor'
    const client_id = '133d13b8-8c86-4a98-9c4e-b18fbe5e5f54'
    const client_secret = 'oauth'
    const grant_type = 'password'
    const scope = 'oauth' // Drupal role that's set in oauth

    return (
      <button onClick={() =>
        login({
          username,
          password,
          client_id,
          client_secret,
          grant_type,
          scope
        })}>Login
      </button>
    )
  }
  else {
    if (data) {
      localStorage.setItem('token', JSON.stringify(data))
    }

    return (
      <button onClick={() => {
        logoutUser().then(() => client.clearStore())
      }}>Logout</button>
    )
  }
}

export default Login
