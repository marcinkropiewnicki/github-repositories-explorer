import axios from 'axios'
import { githubActions } from './github-slice'
import { toast } from 'react-toastify'

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN_TOO

// automatically add authorization token to all axios API calls
const github = axios.create({
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// filters searched user list and leaves those containing searched username
const filterSimilarUsers = (users, login) => {
  const loginRegExp = new RegExp(login, 'i')
  return users.filter(user => {
    return user['login'].search(loginRegExp) >= 0 ? true : false
  })
}

const escapeRegex = string => {
  // eslint-disable-next-line
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export const fetchUserData = text => {
  // checking if search input field is empty
  if (!text) {
    toast.error('You have to enter something first!')
    return
  }

  // escape user input
  const searchTerm = escapeRegex(text)

  // set search query parameters
  const params = new URLSearchParams({
    q: searchTerm,
    per_page: 5,
  })

  return async dispatch => {
    const fetchUsers = async () => {
      const response = await github.get(
        `https://api.github.com/search/users?${params}`
      )
      const newUserSet = response['data']['items'].map(item => {
        return {
          login: item.login,
          id: item.id,
          avatar_url: item.avatar_url,
          repos_url: item.repos_url,
          repos: [],
        }
      })

      return newUserSet
    }

    const usersAndReposMerge = (users, repos) => {
      const newUserSet = users.map((item, idx) => {
        return {
          login: item.login,
          id: item.id,
          avatar_url: item.avatar_url,
          repos_url: item.repos_url,
          repos: repos[`${idx}`],
        }
      })

      return newUserSet
    }

    const fetchRepos = async usersData => {
      const promises = usersData.map(async user => {
        const result = await github.get(user.repos_url)
        return result.data
      })
      const repos = await Promise.all(promises)

      let reducedRepos = []

      for (const singleUserRepos of repos) {
        const reducedUserRepos = singleUserRepos.map(repo => {
          return {
            name: repo.name,
            description: repo.description,
            watchers_count: repo.watchers_count,
          }
        })
        reducedRepos.push(reducedUserRepos)
      }

      return reducedRepos
    }

    try {
      dispatch(githubActions.setLoading())

      // get user list from github
      const userData = await fetchUsers()

      // filter out users with logins not similar to searchTerm
      const filteredUsers = filterSimilarUsers(userData, searchTerm)

      // get searched users' repos
      const reposData = await fetchRepos(filteredUsers)

      if (reposData.length < 1) {
        toast.info('Maybe try searching for something different')
      }

      // merge user data and user's repos data
      const mergedUserData = usersAndReposMerge(filteredUsers, reposData)
      // console.log(mergedUserData)

      // save searched data to store
      dispatch(githubActions.setUsers(mergedUserData))
      dispatch(githubActions.setSearchTerm(searchTerm))
    } catch (error) {
      // show error msg
      toast.error('Fetching user data failed')
      // throw new Error('Fetching user data failed')
    }
  }
}
