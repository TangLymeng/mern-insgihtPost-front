import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import { useSelector } from "react-redux";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProctectedRoute from "./components/AuthRoute/ProtectedRoute";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";
import UpdatePost from "./components/Posts/UpdatePost";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import UploadCoverImage from "./components/Users/UploadCoverImage";
import PostsByTag from "./components/Posts/PostsByTag";
import BlogList from "./Templates/BlogList";
import TestAddPost from "./Templates/TestAddPost";
import NotFound from "./components/NotFound/NotFound"; // Import NotFound component

export default function App() {
  //! Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProctectedRoute>
              <PublicUserProfile />
            </ProctectedRoute>
          }
        ></Route>
        {/* private user profile */}
        <Route
          path="/user-profile"
          element={
            <ProctectedRoute>
              <PrivateUserProfile />
            </ProctectedRoute>
          }
        ></Route>
        {/* add post */}
        <Route
          path="/add-post"
          element={
            <ProctectedRoute>
              <AddPost />
            </ProctectedRoute>
          }
        ></Route>
        <Route
          path="/posts/tags/:tagName"
          element={
            <ProctectedRoute>
              <PostsByTag />
            </ProctectedRoute>
          }
        ></Route>
        {/* post details */}
        <Route
          path="/posts/:postId"
          element={
            <ProctectedRoute>
              <PostDetails />
            </ProctectedRoute>
          }
        ></Route>
        {/* post details */}
        <Route
          path="/posts"
          element={
            <ProctectedRoute>
              <PostLists />
            </ProctectedRoute>
          }
        ></Route>
        {/* update */}
        <Route
          path="/posts/:postId/update"
          element={
            <ProctectedRoute>
              <UpdatePost />
            </ProctectedRoute>
          }
        ></Route>
        {/* private upload prifile image */}
        <Route
          path="/upload-profile-image"
          element={
            <ProctectedRoute>
              <UploadProfileImage />
            </ProctectedRoute>
          }
        ></Route>

        {/* private upload cover image */}
        <Route
          path="/upload-cover-image"
          element={
            <ProctectedRoute>
              <UploadCoverImage />
            </ProctectedRoute>
          }
        ></Route>

        <Route
          path="/blog-list"
          element={
            <ProctectedRoute>
              <BlogList />
            </ProctectedRoute>
          }
        ></Route>

        <Route
          path="/test"
          element={
            <ProctectedRoute>
              <TestAddPost />
            </ProctectedRoute>
          }
        ></Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}
