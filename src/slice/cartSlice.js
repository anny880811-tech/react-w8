import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
    },
    reducers: {
        setCart(state, action) {
            state.carts = action.payload;
            console.log('setCart', state.carts, action.payload);
        }
    }
});

export const getCartAsync = createAsyncThunk(
    'cart/getCartAsync',
    async (data, { dispatch }) => {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        console.log('getCartAsync', res.data.data.carts);
        dispatch(setCart(res.data.data.carts))
    }
)

export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async (sentData, { dispatch }) => {
        const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData);
        console.log('addToCartAsync', res.data);
        dispatch(getCartAsync());
        return res.data;
    }
)

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;