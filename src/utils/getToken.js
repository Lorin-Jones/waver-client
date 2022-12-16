export const getToken = () => {
    const auth = localStorage.getItem("lu_token")
    const userType = JSON.parse(auth)
    return userType?.token
}