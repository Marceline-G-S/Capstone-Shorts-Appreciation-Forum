import { useEffect, useState } from "react"
import { getTypeById } from "../../services/typeService.js"
import "./profile.css"

export const ProfileRender = ({user}) => {
    const [trainerType, setTrainerType] = useState("")

    useEffect(()=>{
        getTypeById(user?.type).then((typeObj)=>{
            setTrainerType(typeObj)
        })
    }, [])

    return <div className="user">
                <div className="user-info">
                    <div>Name</div>
                    <div>{user?.username}</div>
                </div>
                <div className="user-info">
                    <div>Trainer type:</div>
                    <div>{trainerType.typeName}</div>
                </div>
            </div>
}