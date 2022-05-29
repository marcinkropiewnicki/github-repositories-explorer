import { useSelector } from 'react-redux'
import { Spinner } from '../layout/Spinner'
import UserItem from './UserItem'

const UserResults = () => {
  const loading = useSelector(state => state.github.loading)
  const users = useSelector(state => state.github.users)
  const searchTerm = useSelector(state => state.github.searchTerm)

  if (loading) return <Spinner />

  if (users.length < 1 && searchTerm.length > 0) {
    return <h1>Found nothing...</h1>
  }

  if (!loading && users.length > 0) {
    return (
      <div className="results__container">
        {searchTerm && (
          <h1 className="results__title">
            Showing users for <b>"{searchTerm}"</b>
          </h1>
        )}
        <div className="accordion">
          {users.map(user => {
            return <UserItem key={user.id} user={user} />
          })}
        </div>
      </div>
    )
  }
}

export default UserResults
