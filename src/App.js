import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import HomePostsLists from "./Templates/HomePostListsTemplate"
import LoginTemplate from "./Templates/LoginTemplate"
import NavbarTemplate from "./Templates/NavBarTemplate"
import UserProfileTemplate from "./Templates/UserProfileTemplate"

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserProfileTemplate />}></Route>
      </Routes>
    </BrowserRouter>
  )
}