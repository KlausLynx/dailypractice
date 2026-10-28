import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: 0}
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            state.value += 1
        },
        decremented(state) {
            state.value = state.value - 1;
        },
        incrementedByAmount(state, action) {
            state.value += action.payload
        },
        decrementedByAmount(state, action) {
            state.value = state.value - action.payload;
        },
        reset() {
            return initialState
        }

    }
})

export const {
    incremented,
    decremented,
    incrementedByAmount,
    decrementedByAmount,
    reset
} = counterSlice.actions

export default counterSlice.reducer