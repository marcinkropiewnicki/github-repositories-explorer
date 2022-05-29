import UserResults from './components/users/UserResults'
import UserSearch from './components/users/UserSearch'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <main className="container">
      <ToastContainer />
      <UserSearch />
      <UserResults />
    </main>
  )
}

export default App
