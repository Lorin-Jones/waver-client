//This should list the logged in User's Profile, User's Gear For sale, User's Owned Gear, and User's Watched Gear

import { useParams } from "react-router-dom"
import { isUser } from "../../utils/isUser"
import { UserProfile } from "./UserProfile"


export const UserPage = () => {

    const {userId} = useParams()

    return (
        <article>
            <UserProfile userId={parseInt(userId)} />

        </article>

    )

}