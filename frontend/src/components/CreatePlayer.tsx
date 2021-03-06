import {useMutation} from '@apollo/client'
import {CREATE_PLAYER, PLAYERS} from '../gql/common'

const CreatePlayer = () => {
  const [createPlayer, {loading}] = useMutation(CREATE_PLAYER)

  return (
    <>
      <h1>Create new player</h1>
      {loading ? <p>Saving player...</p> : ''}
      <form
        onSubmit={(event: any) => {
          event.preventDefault()
          const firstName = event.target.firstName.value
          const lastName = event.target.lastName.value

          if (!firstName || !lastName) {
            alert('First or last name must be filled out.')
            return
          }

          createPlayer({
            variables: {firstName: firstName, lastName: lastName},
            refetchQueries: [{query: PLAYERS}]
          }).then((res) => {
            console.log(`Player with id ${res.data.createPlayer.id} added successfully.`)
          })

          event.target.firstName.value = ''
          event.target.lastName.value = ''
        }}
      >
        <label htmlFor="firstName">First name</label>
        <input type="text" name="firstName" />
        <br />
        <label htmlFor="lastName">Last name</label>
        <input type="text" name="lastName" />
        <br />
        <button type="submit">Create player</button>
      </form>
    </>
  )
}

export default CreatePlayer
