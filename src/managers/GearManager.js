export const getGear = () => {
    return fetch("http://localhost:8000/gear", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGear = (gearId) => {
    return fetch(`http://localhost:8000/gear/${gearId}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteGear = (gearId) => {
    return fetch(`http://localhost:8000/gear/${gearId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
}