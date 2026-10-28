import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import { fetchUser } from "./userSlice";

const initialState = {
    items: [],
    filter: 'active'
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        todoAdded: {
            prepare(text, dueDate) {           
                return { payload: { id: nanoid(), text, completed: false, dueDate, createdAt: new Date().toISOString() } }
            },
            reducer(state, action) {   
                state.items.push(action.payload)
            }
        },
        todoToggled(state, action) {
            const todo = state.items.find(item => item.id === action.payload)
            if(todo) {
                todo.completed = !todo.completed
            }
        },
        todoDeleted(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        todoEdited(state, action) {
            const editedTodo = state.items.find(item => item.id === action.payload.id)
            if(editedTodo) {
                editedTodo.text = action.payload.text
            }
        },
        filterChanged(state, action) {
            state.filter = action.payload
        },
        completedCleared(state) {
            state.items = state.items.filter(item => !item.completed)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.items.push({
                id: nanoid(),
                text: `Loaded ${action.payload.length} users`,
                completed: false,
                createdAt: new Date().toISOString()
            })
        })
    },

    selectors: {
        selectItems: (state) => state.items,
        selectFilter: (state) => state.filter,
    }
})

export const {
    todoAdded, todoToggled, todoDeleted, todoEdited, filterChanged, completedCleared
} = todoSlice.actions

export const { selectItems, selectFilter } = todoSlice.selectors

export const selectRemainingCount = createSelector(
    [selectItems],
    (items) => items.filter(item => !item.completed).length
)

export default todoSlice.reducer