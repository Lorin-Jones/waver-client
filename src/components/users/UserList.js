import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteUser, getWaverUsers } from "../../managers/UserManager"

export const UserList = () => {
    const [waverUsers, setUsers] = useState([])

    useEffect(() => {
        getWaverUsers().then(data => setUsers(data))
    }, [])



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
                        </>
                    }
                )


            }
    
        
        
        </>
    )





}



