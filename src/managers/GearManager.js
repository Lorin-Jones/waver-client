// JSON.parse(localStorage.getItem("lu_token")).is_staff

import { getToken } from "../utils/authorizations"

export const getGear = () => {
    return fetch("http://localhost:8000/gear", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}

export const getSingleGear = (gearId) => {
    return fetch(`http://localhost:8000/gear/${gearId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const deleteGear = (gearId) => {
    return fetch(`http://localhost:8000/gear/${gearId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
    })
}

export const createGear = (gear) => {
    return fetch("http://localhost:8000/gear", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(gear)
     })
        
}

export const updateGear = (gear, gearId) => {
    return fetch(`http://localhost:8000/gear/${gearId}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(gear)
     })
        
}

export const getGearTypes = () => {
    return fetch("http://localhost:8000/gear_type", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
     })
        .then(response => response.json())
}

export const getManufacturers = () => {
    return fetch("http://localhost:8000/manufacturers", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
     })
        .then(response => response.json())
}

export const getGearByType = (gearTypeId) => {
    return fetch(`http://localhost:8000/gear?gear_type=${gearTypeId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        }
     })
        .then(response => response.json())
}