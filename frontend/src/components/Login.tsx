import { useLazyLogin, useLazyLogout, useAuthenticated } from 'drupal-react-oauth-provider'
import { useApolloClient } from '@apollo/client'

const Login = () => {
  // Run the 'drupal-react-oauth-provider' hooks.
  const isAuthenticated = useAuthenticated()
  const [login, {loading, error, data}] = useLazyLogin()
  const [logout] = useLazyLogout()

  // Make logout async, so that the store clearance can be done only after a successful logout.
  const logoutUser = async () => {
    logout();
  }

  // Get the client, so that the store can be cleared after the logout.
  const client = useApolloClient()

  // Get oauth data from the environment variables.
  const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID ?? ''
  const client_secret = process.env.REACT_APP_OAUTH_CLIENT_SECRET ?? ''
  const grant_type = process.env.REACT_APP_OAUTH_GRANT_TYPE ?? ''
  const scope = process.env.REACT_APP_OAUTH_SCOPE ?? ''

  if (data) {
    localStorage.setItem('token', JSON.stringify(data))
  }

  return (
    <>
      {!isAuthenticated &&
        <form onSubmit={(event: any) => {
          event.preventDefault()
          const username = event.target.username.value
          const password = event.target.password.value

          login({
            username,
            password,
            client_id,
            client_secret,
            grant_type,
            scope
          })
        }}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <br />
          <button type="submit">Login</button>
        </form>
      }

      {loading && <p>Loading...</p>}

      {error && <p>{error.message}</p>}

      {isAuthenticated && (
        <button onClick={() => {
          logoutUser().then(() => client.clearStore())
        }}>Logout</button>
      )}
    </>
  )
}

export default Login
