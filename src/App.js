import UserResults from './components/users/UserResults'
import UserSearch from './components/users/UserSearch'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import store from './store/index'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <main className="container">
        <ToastContainer />
        <UserSearch />
        <UserResults />
      </main>
    </Provider>
  )
}

export default App
