const initialState = { mode: 'light'};

export const toggletheme = () => ({type: 'theme/toggle'})

export const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case "theme/toggle":
            return {...state, mode: state.mode === 'light' ? 'dark' : 'light'}
        default:
            return state
    }

}