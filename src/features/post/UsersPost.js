import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllPosts, selectPostByUser } from './postSlice'
import { Link } from 'react-router-dom'

const UsersPost = () => {
    const { userId } = useParams()
    const posts = useSelector(selectAllPosts)

    const usersPosts = useSelector(state => selectPostByUser(state, Number(userId)))
    
    const usersPostsli = usersPosts.map(userPost => <Link to={`/post/${userPost.id}`} key={userPost.id}> <li>{userPost.title}</li> </Link> )

    return (
        <article>

        <ul>
            {usersPostsli}
        </ul>
        </article>
    )
}

export default UsersPost