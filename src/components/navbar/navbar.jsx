import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate();

    return <ul className="navbar">
        <li className="navbar-item"><Link to=''>Welcome</Link></li>
        <li className="navbar-item"><Link to='tickets'>Tickets</Link></li>
        <li className="navbar-item"><Link to='employees'>Employees</Link></li>
        <li className="navbar-item"><Link to='customers'>Customers</Link></li>
        {/**This section below loads log out option of navbar if logged in. */}
        <li className="navbar-item"><Link to="/profile">Profiles</Link></li>
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