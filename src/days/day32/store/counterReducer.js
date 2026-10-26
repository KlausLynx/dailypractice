const initialState = { value: 0 };

export const increment = () => ({type: "counter/increment"})
export const decrement = () => ({type: "counter/decrement"})
export const addBy = (amount) => ({type: "counter/addBy", payload: amount})
export const reset = () => ({type: "counter/reset"})

export const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'counter/increment':
            return {...state, value: state.value + 1 }
        case 'counter/decrement':   
            return { ...state, value: Math.max(0, state.value - 1) };
        case 'counter/addBy':
            return {...state, value: Math.max(0, state.value + action.payload)};
        case 'counter/reset':
            return initialState
        default:
        return state
    }
}