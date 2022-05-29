import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  loading: false,
  searchTerm: '',
}

const githubSlice = createSlice({
  name: 'github',
  initialState,
  //  using Immer internally to write simpler immutable update logic
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
      state.loading = false
    },
    getUserAndRepos(state, action) {
      state.repos = action.payload
      state.loading = false
    },
    clearUsers() {},
    setLoading(state) {
      state.loading = true
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
  },
})

export const githubActions = githubSlice.actions

export default githubSlice
