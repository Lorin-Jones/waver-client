import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGear } from "../../managers/GearManager"
import { createReview, deleteReview, getReviews } from "../../managers/ReviewManager"
import { isStaff } from "../../utils/isStaff"
import "./gear.css"

export const GearDetails = () => {
    const { gearId } = useParams()
    const [details, setDetails] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [newReview, updateReview] = useState({
        gear: gearId,
        review: "",
        rating: 0
    })

    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleGear(gearId).then(setDetails)
        },
        []
    )


    const submitReview = (evt) => {
        evt.preventDefault()

        const reviewToSend = {
            gear: newReview.gear,
            review: newReview.review,
            rating: parseInt(newReview.rating)
        }

        createReview(reviewToSend).then(() => window.location.reload())
    }
    
    const changeStateProperty = (evt) => {
        const copy = { ...newReview }
        copy[evt.target.id] = evt.target.value
        updateReview(copy)
    }

    return <article className="gearDetailPage">
                <section className="gearDetailSection">
                    <div class="jumbotron text-center">
                        <div class="image-container">
                            <img src={details?.image}></img>
                        </div>
                        <div className="gearDetailHeader">
                            <h2 class="header">{details?.specifications?.manufacturer?.name} {details?.name}</h2>
                        </div> 
                        <div className="gearPrice">${details.price}</div>
                        <div className="gearRating">Rating: {details.average_rating}</div>
                    </div>
                    <div className="gearDescription">
                        <h3 className="header">About This Item</h3>
                        <div className="gearDescriptionText">{details?.description}</div>
                    </div>
                    <div className="gearSpecs">
                        <h3 className="header">Specs</h3>
                            
                            <>
                                <div id="specs">{details?.specifications?.gear_types?.name && <div>{details.specifications.gear_types.name}</div>}</div>
                                <div id="specs">{details?.specifications?.release_date && <div>Released {details.specifications.release_date}</div>}</div>
                                <div id="specs">{details?.specifications?.number_of_keys && <div>{details.specifications.number_of_keys}</div>}</div>
                                <div id="specs">{details?.specifications?.voices && <div>{details.specifications.voices}</div>}</div>
                                <div id="specs">{details?.specifications?.arpeggiator && <div>Arpeggiator {details.specifications.arpeggiator}</div>}</div>
                                <div id="specs">{details?.specifications?.sequencer && <div>Sequencer {details.specifications.sequencer}</div>}</div>
                                <div id="specs">{details?.specifications?.velocity && <div>Velocity {details.specifications.velocity}</div>}</div>
                                <div id="specs">{details?.specifications?.aftertouch && <div>Aftertouch {details.specifications.aftertouch}</div>}</div>
                            </>
                    </div>
                </section>
                            
                

                <section className="gearReviews">
                    <h3>Reviews</h3>
                    <button onClick={() => setShowForm(!showForm)}>Submit a Review</button>
                    {
                        showForm
                        ?
                        <form className="gearForm">

                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="title">Write your review:</label>
                                    <textarea
                                        rows={65}
                                        onChange={changeStateProperty}
                                        required autoFocus
                                        id="review"
                                        className="form-control"
                                    ></textarea>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div>
                                    <label htmlFor="rating">Rate this Gear</label>
                                    <input
                                        min = "1"
                                        max = "10"
                                        onChange={changeStateProperty}
                                        required autoFocus
                                        type="number" id="rating"
                                        className="form-control"
                                        placeholder="rating"
                                    />
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
                        details?.reviews?.map(
                            gearReview => {
                                return <>
                                    <div>{gearReview?.waver_user?.user?.username}</div>
                                    <div>{gearReview?.review}</div>
                                    <div>{gearReview?.rating}</div>
                                    {
                                        isStaff()
                                        ?
                                        <button onClick={(evt)=>{
                                            evt.preventDefault()
                                            deleteReview(gearReview?.id).then(window.location.reload())}}>Delete Review</button>
                                        :
                                        ""
                                    }
                                </>
                                
                            }
                            

                        )
                        
                    }
                </section>
    </article>
}


    
                        


                    
            
