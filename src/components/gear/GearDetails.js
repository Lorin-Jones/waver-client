import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGear } from "../../managers/GearManager"

export const GearDetails = () => {
    const { gearId } = useParams()
    const [details, setDetails] = useState({
    })
    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleGear(gearId).then(setDetails)
        },
        [gearId]
    )

    return <>
            <div className="gearDetailHeader">
                <h2>{details.name}</h2>
            </div> 
            <div>Made by {details?.manufacturer?.name}</div>
            <img src={details.image}></img>
            <div>MSRP: {details.price}</div>
            <div>{details?.gear_type?.name}</div>
            <div>Released {details?.release_date}</div>


    </>
    
}
