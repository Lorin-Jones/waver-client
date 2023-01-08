//This should list the logged in User's Profile, User's Gear For sale, User's Owned Gear, and User's Watched Gear

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleWaverUser, updateUser } from "../../managers/UserManager"


export const UserPage = () => {
    const { userId } = useParams()

    const [waverUser, setUser] = useState({})
    

    useEffect(() => {
        getSingleWaverUser(userId).then(data => setUser(data))
    }, [userId])

    


    return (
        <>
            <h2>Profile</h2>
            
            <img src={waverUser?.image} />
            <div>{waverUser?.user?.username}</div>
            <div>{waverUser?.full_name}</div>
            <div>{waverUser?.bio}</div>
            
            
            
            {
                waverUser.gear
                ?
                waverUser.gear.map(
                    (gear) => {
                        return <li>{gear.name}</li>
                    }
                )
                : ""
            }
        </>
    )

}