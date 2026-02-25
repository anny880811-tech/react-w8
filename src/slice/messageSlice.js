import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
            });
        },

        removeMessage(state, action) {
            const index = state.findIndex((item) => { return item.id === action.payload });
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

//   // 1. 定義名為 removeMessage 的函式
//   removeMessage: function(state, action) {
//     // 2. 使用傳統 function 來尋找索引 (Index)
//     // 我們要把陣列裡的每一個項目 (item) 拿出來檢查
//     const index = state.findIndex(function(item) {
//       // 檢查項目的 id 是否等於我們傳進來的 payload (要刪除的 ID)
//       return item.id === action.payload;
//     });
//     // 3. 安全檢查：如果 index 不是 -1，代表有找到資料
//     if (index !== -1) {
//       // 4. 從該位置 (index) 開始，刪除 1 個項目
//       state.splice(index, 1);
//     }
//   }
// }

// Action creators 自動生成
export const { createMessage, removeMessage } = messageSlice.actions;
// Reducer 匯出給 store 使用
export default messageSlice.reducer;

export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async (payload, { dispatch, requestId }) => {
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id: requestId,
        }));

        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId));
        }, 2000);
    }
);