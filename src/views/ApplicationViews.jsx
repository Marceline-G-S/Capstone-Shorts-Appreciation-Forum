import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar.jsx" 
import { Welcome } from "../components/welcome/welcome.jsx"
import { useEffect, useState } from "react"

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
        <Route path="tickets" element={"tickets"} />
        
        <Route path="employees">  
          <Route index element={"EmployeesList"} />
          <Route path=":employeeId" element={"EmployeeDetails"}/>
        </Route>

        <Route path="customers">
          <Route index element={"CustomerList"} />
          <Route path=":customerId" element={"CustomerDetails"}/>
        </Route>
        <Route path="profile" element= {"EmployeeForm" /*getAndSetUser={getAndSetUser} currentUser={currentUser}*/}/>
      </Route>
    </Routes>
  </>
}
