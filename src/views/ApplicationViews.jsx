import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar.jsx" 
import { Welcome } from "../components/welcome/welcome.jsx"
import { useEffect, useState } from "react"
import { PostList } from "../components/posts/PostList.jsx"
import { ProfileView } from "../components/profile/ProfileView.jsx"
import { OtherProfileRender } from "../components/profile/OtherProfileRender.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

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
        <Route path="posts" element={PostList} />

        <Route path="employees">  
          <Route index element={<Welcome/>} />
          <Route path=":employeeId" element={<Welcome/>}/>
        </Route>
        
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
