export const isStaff = () => {
    const auth = localStorage.getItem("lu_token")
    const userType = JSON.parse(auth)
    return userType?.is_staff
}

