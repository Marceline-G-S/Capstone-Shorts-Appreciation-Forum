import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./profile.css"
import { getUserById } from "../../services/userService.js"

export const OtherProfileRender = () => {
    const {profileId} = useParams()
    const [otherProfile, setOtherProfile] = useState({})


    useEffect(()=>{
        getUserById(profileId).then(data => setOtherProfile(data[0]))
    }, [profileId])

    return <section className="customer">
            <header className="customer-header">{otherProfile?.username}</header>
            <div><span className="customer-info">Name : </span>{otherProfile?.username}</div>
            <div><span className="customer-info">Type : </span>{otherProfile?.type}</div>
            <div><span className="customer-info">Member since : </span>{otherProfile?.created_at}</div>
        </section>
}