import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { Link } from 'react-router-dom'

const RoutePosts = () => {

    const users = useSelector(selectAllUsers)

    const usersli = users.map(user => <Link to={`/posts/user=${user.id}`} key={user.id} > <li >{user.name}</li> </Link> )

    return (
        <article>
            <ul>
            {usersli}
            </ul>
        </article>
    )
}

export default RoutePosts