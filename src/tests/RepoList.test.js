import { render, screen } from '@testing-library/react'
import RepoList from '../components/repos/RepoList'
import { Provider } from 'react-redux'
import store from '../store/index'

describe('RepoList component', () => {
  it('should display all repos for a given user', () => {
    // given
    const repos = [
      {
        name: 'rails',
        description: 'Ruby on Rails',
        stargazers_count: 5,
        watchers_count: 5,
      },
      {
        name: 'trains',
        description: 'Ruby on Trains',
        stargazers_count: 15,
        watchers_count: 15,
      },
    ]

    render(
      <Provider store={store}>
        <RepoList repos={repos} />
      </Provider>
    )

    const username = screen.getByText(/Ruby on Trains/i)

    // then
    expect(username).toBeInTheDocument()
  })

  it('should display `empty` when user doesnt have repos', () => {
    // given
    const repos = []

    render(
      <Provider store={store}>
        <RepoList repos={repos} />
      </Provider>
    )

    const emptyRepo = screen.getByText(/empty/i)

    // then
    expect(emptyRepo).toBeInTheDocument()
  })
})
