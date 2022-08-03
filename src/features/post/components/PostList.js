import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts, getPostsStatus } from '../postSlice'
import PostItem from './supporting-components/PostItem'

const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const effectRanThis = useRef(false)

  useEffect(() => {

    if (effectRanThis.current === false && postStatus !== "succeeded") {
      dispatch(fetchPosts())
    }

    return () => {
      effectRanThis.current = true
    }

  }, [posts, dispatch])


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