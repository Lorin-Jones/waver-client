import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Auth.css"
import { Button } from "react-bootstrap"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("lu_token", JSON.stringify(res))
                    navigate("/gear")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="login--main">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="container--login">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Waver</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required autoFocus />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <Button type="submit">{'Sign In'}</Button>
                    </fieldset>
                </form>
            </section>

            <section>
                <Link className="link--register" to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
