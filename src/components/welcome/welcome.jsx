import "./welcome.css"
import joey from "../../assets/Joey.png"

export const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>
                <span>Welcome to</span>
                <span>The Shorts Appreciation Forum</span>
            </h1>
            <div>The home of shorts enthusiasts, hosted by Youngster Joey</div>
            <div className="app-heading-circle">
                <img className="app-logo" src={joey} alt="I like shorts!" />
            </div>
        </div>
    )
}