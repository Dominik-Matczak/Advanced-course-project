import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: JSON.parse(localStorage.getItem("orders")) || []
    },
    reducers: {
        addNewOrder: (state, action) => {
            const newOrder = {
                ...action.payload,
                createdAt: new Date().toISOString()
            };

            state.orders = [...state.orders, newOrder];
            localStorage.setItem("orders", JSON.stringify(state.orders));
        }
    }
})

export const { addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;