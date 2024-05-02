import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./profile.css"
import { getUserById } from "../../services/userService.js"
import { getTypeById } from "../../services/typeService.js"

export const OtherProfileRender = () => {
    const {profileId} = useParams()
    const [otherProfile, setOtherProfile] = useState({})
    const [trainerType, setTrainerType] = useState("")


    useEffect(()=>{
        getUserById(profileId).then(data => {
            setOtherProfile(data[0])
        })
    }, [profileId])

    useEffect(()=>{
        if(otherProfile.type){
            getTypeById(otherProfile?.type).then((typeObj)=>{
                setTrainerType(typeObj)
            })
        }
    }, [otherProfile])



    return <section className="customer">
            <header className="customer-header">{otherProfile?.username}</header>
            <div><span className="customer-info">Name : </span>{otherProfile?.username}</div>
            <div><span className="customer-info">Type : </span>{trainerType.typeName}</div>
            <div><span className="customer-info">Member since : </span>{otherProfile?.created_at}</div>
        </section>
}