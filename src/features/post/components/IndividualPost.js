import React from 'react'
import PostAuthor from './supporting-components/PostAuthor'
import TimeAgo from './supporting-components/TimeAgo'
import ReactionButtons from './supporting-components/ReactionButtons'
import { useSelector } from 'react-redux'
import { selectPostById } from '../postSlice'
import { useParams, Link } from "react-router-dom"

const IndividualPost = () => {
    const { id } = useParams()
    const post = useSelector(state => selectPostById(state, Number(id)))

    if (!post) {
        return (
            <h2>Post not found ..</h2>
        )
    }
    else {

        return (
            <>
            <article>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
                <Link to={`/post/${post.id}/edit`}>Edit Post</Link>
            </article>
            </>
        )
        }
}

export default IndividualPost