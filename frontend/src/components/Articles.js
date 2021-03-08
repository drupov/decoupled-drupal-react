import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_NODES = gql`
query {
  nodeQuery (limit: 100) {
    entities {
      entityId
      entityLabel
    }
  }
}
`;

const Articles = () => {
  return (
    <Query query={GET_NODES}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <div>
            <Link to='node/add'>Add article</Link>
            {data.nodeQuery.entities.map((item, index) => (
              <p key={item.entityId}>
                <Link to={`/node/${item.entityId}/`}>
                  {item.entityLabel} ({item.entityId})
                </Link>
              </p>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

export default Articles;

