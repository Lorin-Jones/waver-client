import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGear } from "../../managers/GearManager"
import { createReview, getReviews } from "../../managers/ReviewManager"

export const GearDetails = () => {
    const { gearId } = useParams()
    const [details, setDetails] = useState({})
    const [gearReviews, setGearReviews] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [review, updateReview] = useState("")

    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleGear(gearId).then(setDetails)
        },
        [gearId]
    )

    useEffect(
        () => {
            getReviews(gearId).then(setGearReviews)
        },
        [gearId]
    )

    const submitReview = (evt) => {
        evt.preventDefault()
        createReview({ gearId, review }).then(() => window.location.reload())
    }
    


    return <>
            <div className="gearDetailHeader">
                <h2>{details?.name}</h2>
            </div> 
            <div>Made by {details?.manufacturer?.name}</div>
            <img src={details.image}></img>
            <div>MSRP: {details.price}</div>
            <div>{details?.gear_type?.name}</div>
            <div>Released {details?.release_date}</div>
            <button onClick={() => setShowForm(!showForm)}>Submit a Review</button>
            {
                showForm
                ?
                <form className="gameForm">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title">Write your review:</label>
                            <textarea
                                rows={65}
                                onChange={(evt)=>{
                                    updateReview(evt.target.value)
                                }}
                                required autoFocus
                                id="review"
                                className="form-control"
                            ></textarea>
                        </div>
                    </fieldset>
                <button onClick={submitReview} className="btn btn-primary">
                    Save Review
                </button>
                </form>
                :
                ""
            }
            {
                gearReviews.map(
                    gearReview => 
                    
                    <div>{gearReview?.waver_user.user.username} says {gearReview?.review}</div>

                )
                
            }

    </>
    
}
