import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from './counterSlice'
import TodoReducer from './todoSlice'
import PostReducer from './postSlice'
import UserReducer from './userSlice'

export const store = configureStore({
    reducer: {
        counter: CounterReducer,
        todo: TodoReducer,
        posts: PostReducer,
        users: UserReducer
    }
})