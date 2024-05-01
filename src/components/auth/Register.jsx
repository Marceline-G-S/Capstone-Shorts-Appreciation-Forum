import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByUsername } from "../../services/userService"
import { formatCurrentTime } from "../../services/likeService.js"
import { TypesDropdown } from "../typeDropdown/typesDropdown.jsx"

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    type: 0,
  })
  let navigate = useNavigate()
  const [type, setType] = useState(0)
  

  const registerNewUser = () => {
    const newUser = {
      ...user,
      type: parseInt(type),
      role: "user",
      created_at: formatCurrentTime()
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "shorts_user",
          JSON.stringify({
            id: createdUser.id,
            role: createdUser.role,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByUsername(user.username).then((response) => {
      if (response.length > 0) {
        // Duplicate username. No good.
        window.alert("Account with that username address already exists")
      } else if (user.type > 15 || user.type < 0) {
        //Stopgap measure to prevent accidentally entering a non-type number.
        window.alert("Hey, now! That's not a typing.")
      } else {
        // Good username, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Shorts Appreciation</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="auth-form-input"
              placeholder="username here"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <TypesDropdown onTypeChange={(selectedTypeId) => {setType(selectedTypeId)}} />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
