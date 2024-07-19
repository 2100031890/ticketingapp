import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/ticketSlice';
export default configureStore({
  reducer: rootReducer,
})