import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from '../postSlice'
import PostItem from './supporting-components/PostItem'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const effectRan = useRef(false)

  useEffect(() => {
    if (!effectRan.current) {
      dispatch(fetchPosts())
    }

    return () => {
      effectRan.current = true
    }
  }, [posts])


  return (
    <section>
      <h2>Posts</h2>
      <h3>{posts.length}</h3>
      <div>
        {orderedPosts.map(post =>
          <PostItem post={post} key={post.id} />)}
      </div>
    </section>
  )
}

export default PostList