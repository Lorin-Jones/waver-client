export const isUser = () => {
    const auth = localStorage.getItem("lu_token")
    const userType = JSON.parse(auth)
    return userType?.id
}