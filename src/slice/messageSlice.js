import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    createMessage(state, action) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? 'success' : 'danger',
        title: action.payload.success ? '成功' : '失敗',
        text: action.payload.message,
      })
    },

    removeMessage(state, action) {
      const index = state.findIndex((item) => {
        return item.id === action.payload
      })
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

// Action creators 自動生成
export const { createMessage, removeMessage } = messageSlice.actions
// Reducer 匯出給 store 使用
export default messageSlice.reducer

export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async (payload, { dispatch, requestId }) => {
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      }),
    )

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId))
    }, 2000)
  },
)
