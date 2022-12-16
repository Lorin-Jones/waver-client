import { getToken } from "../utils/getToken"

export const getReviews = (gearId) => {
    return fetch(`http://localhost:8000/reviews?gear=${gearId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}

export const createReview = (reviewObject) => {
    return fetch(`http://localhost:8000/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(reviewObject)
    })
        .then(res => res.json())
}

export const deleteReview = (reviewId) => {
    return fetch(`http://localhost:8000/reviews/${reviewId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
}