import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate();

    return <ul className="navbar">
        <li className="navbar-item"><Link to=''>Welcome</Link></li>
        <li className="navbar-item"><Link to='posts'>All Posts</Link></li>
        <li className="navbar-item"><Link to='myposts'>My Posts</Link></li>
        <li className="navbar-item"><Link to='favorites'>Favorites</Link></li>
        <li className="navbar-item"><Link to='newpost'>New Post</Link></li>
        {/**This section below loads log out option of navbar if logged in. */}
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
        {localStorage.getItem("shorts_user") ? (<li className="navbar-item navbar-logout">
        <Link className="navbar-link" to=""
        onClick={() => {
            localStorage.removeItem("shorts_user")
            navigate("/", { replace: true })
        }}
            >
            Logout
            </Link>
        </li>
        ) : (
        ""
        )}
    </ul>
}