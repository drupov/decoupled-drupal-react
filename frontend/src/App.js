import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Articles from './components/Articles';
import CreateArticle from './components/CreateArticle';
import ArticleFull from './components/ArticleFull';
import './App.css';

const client = new ApolloClient({
  uri: 'https://d8-decoupled.lndo.site/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Articles} />
          <Switch>
            <Route exact path="/node/add/" component={CreateArticle} />
            <Route exact path="/node/:id/" component={ArticleFull} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App;
