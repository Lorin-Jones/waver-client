import { useEffect, useState } from "react"
import { getSingleWaverUser } from "../../managers/UserManager"
import { isUser } from "../../utils/isUser"
import { useParams } from "react-router-dom"


export const UserProfile = ({userId}) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        getSingleWaverUser(userId).then(data => setUser(data))
    }, [])

    return (
        <>
            <h2>Profile</h2>
            <div></div>
            <div>{user.user.username}</div>
            <div>{user.full_name}</div>
            <div>{user.bio}</div>
            
            {
                user.gear
                ?
                user.gear.map(
                    (gear) => {
                        return <li>{gear.name}</li>
                    }
                )
                : ""
            }
        </>
    )
}