import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: JSON.parse(localStorage.getItem("orders")) || []
    },
    reducers: {
        addNewOrder: (state, action) => {
            state.orders = [...state.orders, action.payload]
            localStorage.setItem("orders", JSON.stringify(state.orders));
        }
    }
})

export const { addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;