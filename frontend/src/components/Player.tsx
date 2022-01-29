import {useContext} from 'react'
import PlayerContext from '../context/PlayerContext'
import {useQuery} from 'react-apollo'
import {PLAYER} from '../gql/common'

const Player: any = () => {
  const context: any = useContext(PlayerContext)

  const {data, loading, error} = useQuery(PLAYER, {variables: {id: context.activePlayerId}})

  if (error) {
    return error.message
  }

  return (
    <>
      <h1>Player data</h1>
      {
        loading ? <p>Loading...</p> :
        <>
          <p>First name: {data.player.firstName}</p>
          <button onClick={() => context.setActivePlayerId(0)}>Return to players list</button>
        </>
      }
    </>
  )
}

export default Player
