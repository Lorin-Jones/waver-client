export const isStaff = () => {
    const auth = localStorage.getItem("lu_token")
    const userType = JSON.parse(auth)
    return userType?.staff
}

export const getToken = () => {
    const auth = localStorage.getItem("lu_token")
    const userType = JSON.parse(auth)
    return userType?.token
}