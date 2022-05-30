import { render, screen } from '@testing-library/react'
import UserItem from '../components/users/UserItem'
import { Provider } from 'react-redux'
import store from '../store/index'

describe('UserItem component', () => {
  it('should display all user data and repos for a given user', () => {
    // given
    const user = {
      login: 'johndoe',
      id: 33137,
      avatar_url: 'https://avatars.githubusercontent.com/u/29063?v=4',
      repos_url: 'https://api.github.com/users/johndoe/repos',
      repos: [
        {
          name: 'rails',
          description: 'Ruby on Rails',
          stargazers_count: 5,
          watchers_count: 5,
        },
      ],
    }

    render(
      <Provider store={store}>
        <UserItem user={user} />
      </Provider>
    )

    const username = screen.getByLabelText(/johndoe/i)

    // then
    expect(username).toBeInTheDocument()
  })

  it('should display `empty` when user doesnt have repos', () => {
    // given
    const user = {
      login: 'johndoe',
      id: 33137,
      avatar_url: 'https://avatars.githubusercontent.com/u/29063?v=4',
      repos_url: 'https://api.github.com/users/johndoe/repos',
      repos: [],
    }

    render(
      <Provider store={store}>
        <UserItem user={user} />
      </Provider>
    )

    const emptyRepo = screen.getByText(/empty/i)

    // then
    expect(emptyRepo).toBeInTheDocument()
  })
})
