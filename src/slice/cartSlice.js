import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
  },
  reducers: {
    setCart(state, action) {
      state.carts = action.payload
    },
  },
})

export const getCartAsync = createAsyncThunk(
  'cart/getCartAsync',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
      dispatch(setCart(res.data.data.carts))
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (sentData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE}/api/${API_PATH}/cart`,
        sentData,
      )
      dispatch(getCartAsync())
      return res.data
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItemAsync',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`)
      dispatch(getCartAsync())
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteAllCartItemAsync = createAsyncThunk(
  'cart/deleteAllCartItemAsync',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`)
      dispatch(getCartAsync())
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
