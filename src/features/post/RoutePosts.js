import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { Link, useNavigate } from 'react-router-dom'

const RoutePosts = () => {
    const navigate = useNavigate()

    const users = useSelector(selectAllUsers)

    const usersli = users.map(user => <Link to={`/posts/user=${user.id}`} key={user.id} > <li >{user.name}</li> </Link>)

    return (
        <>
            <article>
                <ul>
                    {usersli}
                </ul>
            </article>
            <div className="addANewPost">
            <button onClick={() => {navigate("/posts/addpost")}}>Add a New Post</button>
            </div>
        </>
    )
}

export default RoutePosts