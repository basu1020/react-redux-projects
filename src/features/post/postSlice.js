import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await fetch(POSTS_URL)
        const data = await response.json()
        return data
    } catch (err) {
        return err.message
    }
})
 
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try{
        const response = await fetch(POSTS_URL, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(initialPost)
        }) 
        const res = await response.json()
        return res
    } catch(err){
        return err.message
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.unshift(action.payload)  // state is generally immutable, we cannot state.posts.push like this, we generally use setstate.posts.However it is possible in createSlice because it uses library called Immer.js which deals with changing immutable data structures.
            },

            prepare(title, content, userId) {  // this prepare callback will run first, prepare callback is used to customize the payload of a action creator. 
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            },
        },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction] += 1
            }
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString()
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post
            })
            state.posts = state.posts.concat(loadedPosts)
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.posts = []
            state.error = action.error.message
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            console.log(action.payload, "action.payload")
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0, 
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            state.posts.push(action.payload)
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const { postAdded, reactionAdded } = postSlice.actions

export default postSlice.reducer