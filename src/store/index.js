import { configureStore } from '@reduxjs/toolkit'

import githubSlice from './github-slice'

const store = configureStore({
  reducer: { github: githubSlice.reducer },
})

export default store
