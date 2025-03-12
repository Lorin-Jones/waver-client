import { Link, useNavigate } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { isUser } from "../../utils/isUser"
import "./NavBar.css"

const userId = isUser()

export const NavBar = () => {
    const navigate = useNavigate()
    return ( 
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <li class='navbar-brand'>
                <h1 class="mainHeader">Waver</h1>
            </li>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" to="/gear">Gear</Link>
                </li>
                <li class="nav-item active">
                    <Link class="nav-link" to="/posts">News</Link>            
                </li>
                <li class="nav-item active">
                    <Link class="nav-link" to="/used_gear">Used</Link> 
                </li>
                
                
                {
                    isStaff()
                    ?
                    <li class="nav-item active">
                        <Link class="nav-link" to="/users">Users</Link> 
                    </li>
                    : ""
                }
                {
                    (localStorage.getItem("lu_token") !== null) ?
                    <li class="nav-item">
                            <button class="nav-link fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("lu_token")
                                    navigate('/')
                                }}
                                >Logout</button>
                        </li> :
                        <>
                            <li class="nav-item">
                                <Link class="nav-link" to="/">Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }        
            </ul>
        </nav>
    </>
)
}
