import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import { useSelector } from "react-redux";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProctectedRoute from "./components/AuthRoute/ProtectedRoute";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";

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
          path="/user-profile"
          element={
            <ProctectedRoute>
              <UserProfile />
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
      </Routes>
    </BrowserRouter>
  );
}
