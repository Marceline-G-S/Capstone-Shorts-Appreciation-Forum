import "./profile.css"

export const ProfileRender = ({user}) => {
    return <div className="user">
                <div className="user-info">
                    <div>Name</div>
                    <div>{user?.username}</div>
                </div>
                <div className="user-info">
                    <div>Trainer type:</div>
                    <div>{user?.type}</div>
                </div>
            </div>
}