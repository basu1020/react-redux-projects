import { 
    createSlice,
    nanoid, 
    createAsyncThunk, 
    createSelector,
    createEntityAdapter
    } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
})


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
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction] += 1
            }
        },

        postEdited(state, action) {
            const { postId, title, body} = action.payload
            const existingPost = state.entities[postId]
            if(existingPost) {
                existingPost.title = title
                existingPost.body = body
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
            postAdapter.upsertMany(state, loadedPosts) // upsertMany - the word upsert is a combination of two words update and insert. 
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.posts = []
            state.error = action.error.message
        })
        builder.addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
                thumbsUp: 0, 
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            postAdapter.addOne(state, action.payload)
        })
    }
})

// getSelectors creates these selctors and we rename them with aliases using destructuring.

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // selectAllPosts and selectPostById are the aliases here. 
    // so that they run effectively with our predefined code.
    //pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors(state => state.posts)

export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { postAdded, postEdited, reactionAdded } = postSlice.actions

export default postSlice.reducer