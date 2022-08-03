import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAllPosts } from './postSlice'
import { Link } from 'react-router-dom'

const UsersPost = () => {
    const { userId } = useParams()
    const posts = useSelector(selectAllPosts)

    const usersPosts = posts.map(post => post.id === userId)

    const usersPostsli = usersPosts.map(userPost => <Link to={`/post/${userPost.id}`} key={userPost.id}> <li>{userPost.title}</li> </Link> )

    return (
        <ul>
            {usersPostsli}
        </ul>
    )
}

export default UsersPost