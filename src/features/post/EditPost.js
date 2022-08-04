import React, { useState } from 'react'
import { postEdited, selectPostById } from './postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const post = useSelector(state => selectPostById(state, Number(id)))
    const dispatch = useDispatch()
    const [title, settitle] = useState(post.title)
    const [content, setcontent] = useState(post.body)
    const canSave = [title, content].every(Boolean)

    const titleChange = e => {
        settitle(e.target.value)
        console.log(title)
    }
    const bodyChange = e => {
        setcontent(e.target.value)
        console.log(content)
    }

    const onSubmitChange = () => {
        dispatch(postEdited({ postId: Number(id), title: String(title), body: String(content) }))
        navigate(`/post/${post.id}`)
    }

    if (!post) {
        return (
            <h2>Post Not Found..</h2>
        )
    }
    else {
        return (
            <>
                <section>
                    <form>
                        <label htmlFor='postTitle'>
                            Title:
                        </label>
                        <input type="text" value={title} onChange={titleChange} />
                        <label htmlFor="postContent">
                            Content:
                        </label>
                        <textarea type="text" value={content} onChange={bodyChange} />
                        <button
                            type='button'
                            onClick={onSubmitChange}
                            disabled={!canSave}
                        >Save</button>
                        <button
                            onClick={() => {
                                navigate(`/post/${post.id}`)
                            }}
                            type='button'
                        >Back</button>
                    </form>
                </section>
            </>
        )
    }
}

export default EditPost