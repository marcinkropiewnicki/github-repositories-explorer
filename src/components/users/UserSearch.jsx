import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUserData } from '../../store/github-actions'

const UserSearch = () => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!searchText.current.value) {
      toast.error('Try typing something first...')
      return
    }
    dispatch(fetchUserData(searchText.current.value))
  }

  const searchText = useRef('')

  return (
    <div className="search__container">
      <form onSubmit={handleSubmit} data-testid="search-form">
        <input type="text" placeholder="Enter username" ref={searchText} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default UserSearch
