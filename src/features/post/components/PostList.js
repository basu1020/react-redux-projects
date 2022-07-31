import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../../users/usersSlice'
import { selectAllPosts, fetchPosts, getPostsError, getPostsStatus } from '../postSlice'
import ReactionButtons from './supporting-components/ReactionButtons'
import TimeAgo from './supporting-components/TimeAgo'
import PostAuthor from './supporting-components/PostAuthor'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const users = useSelector(selectAllUsers)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const effectRan = useRef(false)
  
  useEffect(() => {

    if (effectRan.current === false) {
      dispatch(fetchPosts())
    }

    return () => {
      effectRan.current = true
    }
  }, [posts])

  const renderedPosts = orderedPosts.map(post =>
  (<article key={post.id}>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <p className="postCredit">
      <PostAuthor userId={post.userId}/>
    </p>
    <p>
      <TimeAgo timestamp={post.date}/>
    </p>
    <ReactionButtons post={post}/> 
  </article>))

  return (
    <section>
      <h2>Posts</h2>
      <h3>{posts.length}</h3>
      <div>
        {renderedPosts}
      </div>
    </section>
  )
}

export default PostList