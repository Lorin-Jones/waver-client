import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteUser, getWaverUsers, updateUser } from "../../managers/UserManager"


export const UserList = () => {
    const [waverUsers, setUsers] = useState([])
    

    useEffect(() => {
        getWaverUsers().then(data => setUsers(data))
    }, [])

    
    const makeStaff = (waverUser) => {
        
        const updatedUser = {
            user: waverUser.user,
            bio: waverUser.bio,
            username: waverUser.username,
            image: waverUser.image,
            first_name: waverUser.first_name,
            last_name: waverUser.last_name,
            email: waverUser.email,
            is_staff: !false
        }
        updateUser(updatedUser, waverUser.id)
            .then(() => getWaverUsers().then(data => setUsers(data)))
    }

    return (
        <>
            <h2>Users</h2>
            {
                waverUsers.map(
                    (waverUser) => {
                        return <>
                        <h3>{waverUser.user.username}</h3>
                        <div>{waverUser.full_name}</div>
                        <div>{waverUser.user.email}</div>
                        <button onClick={evt => {
                            evt.preventDefault()
                            deleteUser(waverUser.id).then(window.location.reload())
                        }}
                        className="btn btn-primary">Delete</button>
                        {
                            waverUser.user.is_staff
                            ? <>
                                <h3>Admin</h3>
                                <button onClick={evt => {
                                    evt.preventDefault()
                                    
                                    const updatedUser = {
                                        user: waverUser.user,
                                        bio: waverUser.bio,
                                        image: waverUser.image,
                                        username: waverUser.username,
                                        first_name: waverUser.first_name,
                                        last_name: waverUser.last_name,
                                        email: waverUser.email,
                                        is_staff: false
                                    }
                                    updateUser(updatedUser, waverUser.id)
                                        .then(() => getWaverUsers().then(data => setUsers(data)))
                                    
                                    
                                }}>Remove Admin</button>
                            </>
                            : <>
                                <button onClick={evt => {
                                    evt.preventDefault()
                                    
                                    const updatedUser = {
                                        user: waverUser.user,
                                        bio: waverUser.bio,
                                        username: waverUser.username,
                                        image: waverUser.image,
                                        first_name: waverUser.first_name,
                                        last_name: waverUser.last_name,
                                        email: waverUser.email,
                                        is_staff: true
                                    }
                                    updateUser(updatedUser, waverUser.id)
                                        .then(() => getWaverUsers().then(data => setUsers(data)))
                                    
                                }}>Make Admin</button>
                            </>    
                            
                        
                        }
                        </>
                        
                        
                    }
                )


            }
    
        
        
        </>
    )





}



