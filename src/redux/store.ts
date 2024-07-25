import { configureStore, Store } from '@reduxjs/toolkit'
import userReducer from './userSlice'


export const store:Store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;