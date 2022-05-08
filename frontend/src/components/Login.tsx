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
    const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID ?? ''
    const client_secret = process.env.REACT_APP_OAUTH_CLIENT_SECRET ?? ''
    const grant_type = process.env.REACT_APP_OAUTH_GRANT_TYPE ?? ''
    const scope = process.env.REACT_APP_OAUTH_SCOPE ?? ''

    return (
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
