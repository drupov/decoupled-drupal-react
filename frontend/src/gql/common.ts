import gql from 'graphql-tag'

export const PLAYER = gql`
query Player ($id: Int!) {
  player(id: $id) {
    firstName
    lastName
  }
}
`

export const PLAYERS = gql`
{
  players {
    items {
      id
      firstName
      lastName
    }
  }
}
`

export const CREATE_PLAYER = gql`
mutation CreatePlayer ($firstName: String!, $lastName: String!) {
  createPlayer (data: {firstName: $firstName, lastName: $lastName}) {
    id
  }
}
`
