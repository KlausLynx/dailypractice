import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    post: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts', 
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        if(!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    },
    {condition: (_, {getState}) => getState().posts.status !== 'loading' }
)


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder ) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.post = action.payload
            state.error = null
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload ?? action.error.message
        })
    },

    selectors: {
        selectedPost: (state) => state.post,
        selectedStatus: (state) => state.status,
        selectedError: (state) => state.error
    }
})

export const {selectedPost, selectedStatus, selectedError} = postSlice.selectors

export default postSlice.reducer