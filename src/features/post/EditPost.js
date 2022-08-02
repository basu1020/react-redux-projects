import React, { useState } from 'react'
import { selectPostById } from './postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectAllUsers } from '../users/usersSlice'
import { changeApost } from './postSlice'

const EditPost = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const post = useSelector(state => selectPostById(state, Number(id)))
    const dispatch = useDispatch()
    const [title, settitle] = useState(post.title)
    const [content, setcontent] = useState(post.body)
    const canSave = [title, content].every(Boolean)

    const titleChange = e => settitle(e.target.value)
    const bodyChange = e => setcontent(e.target.value)

    const onSubmitChange = () => {
        dispatch(changeApost(Number(id), title, content))
        navigate(`/post/${post.id}`)
    }

    if (!post) {
        return (
            <h2>Post Not Found..</h2>
        )
    }
    else {
        console.log("sayonara")
        return (
            <>
                <div>Sayonara</div>
                <section>
                    <form>
                        <label htmlFor='postTitle'>
                            Title:
                        </label>
                        <input type="text" value={title} onChange={titleChange}/>
                        <label htmlFor="postContent">
                            Content:
                        </label>
                        <textarea type="text" value={content} onChange={bodyChange}/>
                        <button
                            type='button'
                            onClick={onSubmitChange}
                            disabled={!canSave}
                        >Save this shit</button>
                    </form>
                    <button onClick={() => {
                        navigate(`/post/${post.id}`)
                    }}>Back</button>
                </section>
            </>
        )
    }
}

export default EditPost