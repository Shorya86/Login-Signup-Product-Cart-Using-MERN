import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart:cartSlice
  },
  
})

export default store