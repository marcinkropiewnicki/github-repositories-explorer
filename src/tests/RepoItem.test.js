import { render, screen } from '@testing-library/react'
import RepoItem from '../components/repos/RepoItem'
import { Provider } from 'react-redux'
import store from '../store/index'

describe('RepoItem component', () => {
  it('should display single repo description for a given user', () => {
    // given
    const repo = {
      name: 'rails',
      description: 'Ruby on Rails',
      stargazers_count: 5,
      watchers_count: 5,
    }

    render(
      <Provider store={store}>
        <RepoItem repo={repo} />
      </Provider>
    )

    const repoDescription = screen.getByText(/Ruby on Rails/i)

    // then
    expect(repoDescription).toBeInTheDocument()
  })
})
