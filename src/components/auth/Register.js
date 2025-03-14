import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"
import { Button } from "react-bootstrap"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "bio": bio.current.value,
                "password": password.current.value,
                
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res && "is_staff" in res) {
                        localStorage.setItem("lu_token", JSON.stringify(res))
                        navigate("/gear")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="registration">
            <div className="register--form">
                    <dialog className="dialog dialog--password" ref={passwordDialog}>
                        <div>Passwords do not match</div>
                        <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                    </dialog>

                    <form className="form--login" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal pt-4">Register an account</h1>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputUsername">Username</label>
                            <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail">Email Address</label>
                            <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="verifyPassword"> Verify Password </label>
                            <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputBio"> Bio </label>
                            <textarea ref={bio} name="bio" className="form-control" placeholder="Let other users know a little bit about you..." />
                        </fieldset>
                        <fieldset style={{
                            textAlign: "center"
                        }}>
                            <Button type="submit">{'Register'}</Button>
                        </fieldset>
                    </form>
                    <section className="link--register">
                        Already registered? <Link style={{ color: '#fafafa'}} to="/">Login</Link>
                    </section>
                </div>
        </main>
    )
}
