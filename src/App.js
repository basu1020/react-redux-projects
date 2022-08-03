import './App.css';
import { Routes, Route } from "react-router-dom";
import PostList from './features/post/components/PostList';
import Layout from './features/Layout';
import IndividualPost from "./features/post/components/IndividualPost"
import EditPost from './features/post/EditPost';
import RoutePosts from './features/post/RoutePosts';
import UsersPost from './features/post/UsersPost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="post/:id" element={<IndividualPost/>}/>
          <Route path="post/:id/edit" element={<EditPost />}/>
          <Route path="posts" element={<RoutePosts />}/>
          <Route path="posts/user=:userId" element={<UsersPost />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
