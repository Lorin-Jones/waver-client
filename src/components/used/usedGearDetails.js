import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSingleUsedGear } from "../../managers/UsedManager"

export const UsedGearDetails = () => {
    const { usedId } = useParams()
    const [usedDetails, setUsedDetails] = useState({})
    
    

    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleUsedGear(usedId).then(setUsedDetails)
        },
        []
    )


    return <article key={`usedDetails--${usedDetails.id}`} className="used_gear">
                        
                        <section id={`${usedDetails.id}`} className="gear__title">
                                <img src={usedDetails.image} />
                                <div className="gear__name">{usedDetails.item}</div>
                                <div className="gear__price">{usedDetails.price}</div>
                                {/* <div className="gear__user">{usedDetails.waver_user.user.username}</div> */}
                                <div className="gear__details">{usedDetails.details}</div>
                        </section>
                    </article>
    
}
