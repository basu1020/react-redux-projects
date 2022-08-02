import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'


const PostItem = ({ post }) => {
    return (
        <>
            <article>
                <h3>{post.title}</h3>
                <p>{post.body.slice(0, 100)+ "..."}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
                <Link to={`/post/${post.id}`}><p>View Blog</p></Link>
            </article>
        </>
    )
}

export default PostItem