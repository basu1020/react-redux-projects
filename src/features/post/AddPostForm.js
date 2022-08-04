import React, { useState } from 'react'
import { addNewPost } from './postSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorIdChange = (e) => {
        setUserId(e.target.value)
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                console.log(userId, content, title)
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                //redux toolkit adds an unwrap function to the returned promise which adds a new promise which returns action.payload or returns an error if action was rejected. 

                // definition from the website - The promise returned by the dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
                navigate("/")
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id} >
            {user.name}
        </option>
    ))

    return (
        <section>
            <form>
                <label htmlFor="postTitle">
                    Title:
                </label>
                    <input type="text" id='postTitle' name='postTitle' value={title} onChange={onTitleChange} />
                
                <label htmlFor="postContent">
                    Content:
                </label>
                <textarea
                    type="text"
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={onContentChange}
                />
                
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorIdChange}>
                    {usersOptions}
                </select>
                {/* <input type="text" value={"wakanda forever"} name="" id="" readOnly /> */}
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm