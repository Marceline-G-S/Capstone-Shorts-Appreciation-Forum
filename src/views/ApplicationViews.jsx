import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar.jsx" 
import { Welcome } from "../components/welcome/welcome.jsx"
import { useEffect, useState } from "react"
import { PostList } from "../components/posts/PostList.jsx"
import { ProfileView } from "../components/profile/ProfileView.jsx"
import { OtherProfileRender } from "../components/profile/OtherProfileRender.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { MyPosts } from "../components/posts/MyPosts.jsx"
import { MyLikedPosts } from "../components/posts/Favorites.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({id:0})

  useEffect(()=>{
    setCurrentUser(getAndSetUser())
  },[])

  const getAndSetUser = () => {
    const localShortsUser = localStorage.getItem("shorts_user")
    const shortsUserObj = JSON.parse(localShortsUser)
    return shortsUserObj //Format : user.id, user.role
  }

  return <>
    <Routes>
      <Route path="/" element={<> <NavBar/> <Outlet/> </>} >
        <Route index element={<Welcome/>} />
        <Route path="posts">
          <Route index element={<PostList/>}/>
          <Route path=":postId" element={<PostDetails getAndSetUser={getAndSetUser} currentUser={currentUser}/>}/>
        </Route>

        <Route path="myposts">  
          <Route index element={<MyPosts getAndSetUser={getAndSetUser} currentUser={currentUser}/>} />
          <Route path=":postId" element={<PostDetails />}/>
        </Route>

        <Route path="favorites" element={<MyLikedPosts currentUser={currentUser}/>}></Route>

        <Route path="newpost" element={<Welcome/>}></Route>
        
        <Route path="profile">  
          <Route index element={<ProfileView getAndSetUser={getAndSetUser} currentUser={currentUser}/>} />
          <Route path=":profileId" element={<OtherProfileRender/>}/>
        </Route>

        <Route path="customers">
          <Route index element={<Welcome/>} />
          <Route path=":customerId" element={<Welcome/>}/>
        </Route>
        
      </Route>
    </Routes>
  </>
}
