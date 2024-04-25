import "./profile.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProfileRender } from "./ProfileRender.jsx"
import { getUserById } from "../../services/userService.js"


export const ProfileView = ({currentUser}) => {
    const [profile, setProfile] = useState([])

    useEffect(() => {
        if (!!currentUser.id){
            getUserById(currentUser.id).then(accounts => {setProfile(accounts[0])})
        }
    }, [currentUser])

    return <div className="profiles">
        <Link to={`/profiles/${currentUser.id}`}>
            <ProfileRender key={currentUser.id} user={profile} />
        </Link>
    </div>
}

/* Planning this out.
Things I need : 
page that loads profile based on user.id
set up page to load logged in users profile
handle conditional statements to add edit profile buttons
edit profile page or autofill edit fields on same page

*/