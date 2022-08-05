import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts, getPostsStatus, selectPostIds } from '../postSlice'
import PostItem from './supporting-components/PostItem'

const PostList = () => {
  const dispatch = useDispatch()
  const orderedPostsIds = useSelector(selectPostIds)
  const postStatus = useSelector(getPostsStatus)
  const effectRanThis = useRef(false)

  useEffect(() => {

    if (effectRanThis.current === false && postStatus !== "succeeded") {
      dispatch(fetchPosts())
    }

    return () => {
      effectRanThis.current = true
    }

  }, [orderedPostsIds, dispatch])

  return (
    <section>
      <h2>Posts</h2>
      <h3>{orderedPostsIds.length}</h3>
      <div>
        {orderedPostsIds.map(postId =>
          <PostItem postId={postId} key={postId} />)}
      </div>
    </section>
  )
}

export default PostList