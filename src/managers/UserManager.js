import { getToken } from "../utils/getToken"



export const getWaverUsers = () => {
    return fetch("http://localhost:8000/waver_users", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}

export const getSingleWaverUser = (userId) => {
    return fetch(`http://localhost:8000/waver_users/${userId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}` 
        }
    })
        .then(response => response.json())
}


export const deleteUser = (userId) => {
    return fetch(`http://localhost:8000/waver_users/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${getToken()}`

        }
    })
}

export const updateUser = (user, userId) => {
    return fetch(`http://localhost:8000/waver_users/${userId}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(user)
     })
        
}
