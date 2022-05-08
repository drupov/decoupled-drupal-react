import { useContext } from 'react'
import PlayerContext from '../context/PlayerContext'
import { useQuery } from '@apollo/client'
import { PLAYERS } from '../gql/common'

const Players: any = () => {
  const context: any = useContext(PlayerContext)
  const {data, loading, error} = useQuery(PLAYERS)

  if (error) {
    return <p>{error.message}</p>
  }

  const players = data?.players?.items?.length ? data.players.items.map((item: any) => (
    <button key={item.id} onClick={() => context.setActivePlayerId(item.id)}>
      {item.firstName} {item.lastName} ({item.id})
    </button>
  )) : <p>No players data available</p>

  return (
    <>
      <h2>Players</h2>
      {loading ? <p>Loading...</p> : players}
    </>
  )
}

export default Players
