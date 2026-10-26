const initialState = {items:[]}

export const addItem = (item) => ({type: 'cart/addItem', payload: item});
export const removeItem = (itemId) => ({type: 'cart/removeItem', payload: itemId});


export const  cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case "cart/addItem": {
        const existing = state.items.find((item) => item.id === action.payload.id);
        if (existing) {
            return {
            ...state,
            items: state.items.map((i) =>
                i.id === existing.id ? { ...i, qty: i.qty + 1 } : i
            ),
            };
        }
        return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
        }
        case "cart/removeItem" :
            return{...state,  items: state.items.filter(item => item.id !== action.payload )}
        default:
            return state
    }
}