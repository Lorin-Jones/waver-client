import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGear } from "../../managers/GearManager"
import { createReview, deleteReview, getReviews } from "../../managers/ReviewManager"
import { isStaff } from "../../utils/isStaff"

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
        []
    )

    useEffect(
        () => {
            getReviews(gearId).then(setGearReviews)
        },
        []
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
            <h3>Specs</h3>
            {
                details?.specifications?.map(
                    (specification) => {
                       return <div className="specification">{specification.description}</div>
                    }
                )
            }
        
            
            <h3>Reviews</h3>
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
                    gearReview => {
                        return <>
                            <div>{gearReview?.waver_user.user.username} says {gearReview?.review}</div>
                            {
                                isStaff()
                                ?
                                <button onClick={(evt)=>{
                                    evt.preventDefault()
                                    deleteReview(gearReview.id).then(window.location.reload())}}>Delete Review</button>
                                :
                                ""
                            }
                        </>
                        
                    }
                    

                )
                
            }

    </>
    
}
