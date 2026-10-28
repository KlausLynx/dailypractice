import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    status: "idle",
    error: null
}

export const fetchUser = createAsyncThunk(
    "users/fetchUser", async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok) {
            throw new Error('Failed to fetch Users')
        }
        return response.json()
    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.users = action.payload
            state.error = null
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload ?? action.error.message
        })
    },
    selectors: {
        selectedUsers: (state) => state.users,
        selectedStatus: (state) => state.status,
        selectedError: (state) => state.error
    }
})

export const { selectedUsers, selectedStatus, selectedError } = userSlice.selectors

export default userSlice.reducer