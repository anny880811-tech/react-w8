import { configureStore} from "@reduxjs/toolkit";
import messageReducer from '../slice/messageSlice';
import cartRuducer from '../slice/cartSlice';

export const store = configureStore({
    reducer: {
        message: messageReducer,
        cart:cartRuducer,
    },
});

export default store;