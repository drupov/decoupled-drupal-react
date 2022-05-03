import {useContext} from 'react'
import PlayerContext from '../context/PlayerContext'
import {useQuery} from '@apollo/client'
import {PLAYERS} from '../gql/common'

const Players: any = () => {
  const context: any = useContext(PlayerContext)
  const {data, loading, error} = useQuery(PLAYERS)
  
  if (error) {
    return error.message
  }

  return (
    <>
      <h1>Players</h1>
      {loading ? <p>Loading...</p> :
        data.players.items.map((item: any) => (
          <button key={item.id} onClick={() => context.setActivePlayerId(item.id)}>
            {item.firstName} {item.lastName} ({item.id})
          </button>
        ))
      }
    </>
  )
}

export default Players
