import { useState } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { sha256 } from 'crypto-hash'
import Login from './components/Login'
import PlayerContext from './context/PlayerContext'
import Overview from './components/Overview'
import Player from './components/Player'

const persistedQueriesLink = createPersistedQueryLink({sha256})
const httpLink = createHttpLink({uri: `${process.env.REACT_APP_DRUPAL_URL}graphql`})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token).access_token}` : '',
    }
  }
});

const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink.concat(authLink).concat(httpLink)
})

const App = () => {
  const [activePlayerId, setActivePlayerId] = useState(0)

  return (
    <ApolloProvider client={client}>
      <PlayerContext.Provider value={{
        activePlayerId: activePlayerId,
        setActivePlayerId: setActivePlayerId
      }}>
        {activePlayerId ? <Player /> : <Overview />}
        <div>
          <Login />
        </div>
      </PlayerContext.Provider>
    </ApolloProvider>
  )
}

export default App
