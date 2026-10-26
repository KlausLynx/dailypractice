import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterReducer";
import { cartReducer } from "./cart";
import { themeReducer } from "./theme";

export const store = configureStore({
    reducer: {
        counter:    counterReducer,
        cart:   cartReducer,
        theme:  themeReducer
    }
})