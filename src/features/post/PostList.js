import React, {useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { selectAllPosts, fetchPosts, getPostsError, getPostsStatus } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

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
  }, [])

  const renderedPosts = orderedPosts.map(post =>
  (<article key={post.id}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
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