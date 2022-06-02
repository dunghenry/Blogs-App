import { configureStore } from "@reduxjs/toolkit";
import tourReducer from './reducers/tourSlice'
import authReducer from "./reducers/authSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer
    }
})

export default store;