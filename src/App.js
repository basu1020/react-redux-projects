import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import AddPostForm from "./features/post/AddPostForm";
import PostList from './features/post/components/PostList';
import Layout from './features/Layout';
import IndividualPost from "./features/post/components/IndividualPost"
import EditPost from './features/post/EditPost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="post/:id" element={<IndividualPost/>}/>
          <Route path="post/:id/edit" element={<EditPost />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
