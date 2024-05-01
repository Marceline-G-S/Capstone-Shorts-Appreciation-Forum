import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByUsername } from "../../services/userService"

export const Login = () => {
  const [username, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByUsername(username).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "shorts_user",
          JSON.stringify({
            id: user.id, role: user.role,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Shorts Appreciation Login</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="username"
                value={username}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Type username here"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

