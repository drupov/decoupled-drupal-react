import React, { useState } from 'react';
import Overview from './components/Overview';
import Player from './components/Player';
import PlayerContext from './context/PlayerContext';
import { ApolloProvider } from 'react-apollo';
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

const httpLink = new HttpLink({ uri: 'https://decoupled-drupal-react.lndo.site/graphql' });
const persistedQueriesLink = createPersistedQueryLink({ sha256 });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: persistedQueriesLink.concat(httpLink)
});

const App = () => {
  const [activePlayerId, setActivePlayerId] = useState(0);

  return (
    <ApolloProvider client={client}>
      <PlayerContext.Provider value={
        {
          activePlayerId: activePlayerId,
          setActivePlayerId: setActivePlayerId
        }
      }>
        {activePlayerId ? <Player /> : <Overview /> }
      </PlayerContext.Provider>
    </ApolloProvider>
  )
}

export default App;
