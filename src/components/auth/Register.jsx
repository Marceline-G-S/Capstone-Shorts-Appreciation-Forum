import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByUsername } from "../../services/userService"

const formatCurrentTime = () => {
  // Create a new Date object for the current date and time
  var now = new Date();

  // Extract the date and time components
  var year = now.getFullYear()
  var month = now.getMonth() + 1; // Months are 0-based, so we add 1
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Pad single-digit months, days, hours, minutes, and seconds with a leading zero
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  // Format the date and time as a string
  var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  return formattedDateTime;
}

export const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    type: 0,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
      type: parseInt(user.type),
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
            <input
              onChange={updateUser}
              type="number"
              id="type"
              className="auth-form-input"
              placeholder="Type # (enter a number 1-15)"
              required
            />
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
