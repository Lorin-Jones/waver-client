import { getToken } from "../utils/getToken"


export const getUsedGear = () => {
    return fetch("http://localhost:8000/used_gear", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}

export const getSingleUsedGear = (usedId) => {
    return fetch(`http://localhost:8000/used_gear/${usedId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const deleteUsedGear = (usedId) => {
    return fetch(`http://localhost:8000/used_gear/${usedId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
}

export const createUsedGear = (used) => {
    return fetch("http://localhost:8000/used_gear", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(used)
     })
        
}