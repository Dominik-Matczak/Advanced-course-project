import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import orderReducer from '../slices/orderSlice'
import filterReducer from '../slices/filterSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        filters: filterReducer
    }
})

export default store;