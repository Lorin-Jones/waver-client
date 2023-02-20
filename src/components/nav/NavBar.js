import { Link, useNavigate } from "react-router-dom"
import { isStaff } from "../../utils/isStaff"
import { isUser } from "../../utils/isUser"
import "./NavBar.css"

const userId = isUser()

export const NavBar = () => {
    const navigate = useNavigate()
    return ( <>
    
    <ul className="navbar">

        <li>
            <h1 className="mainHeader">Waver</h1>
        </li>
        <li className="navbar__item">
            <Link className="nav-link" to="/gear">Gear</Link>
        </li>
        <li className="navbar__item">
            <Link className="nav-link" to="/posts">News</Link>            
        </li>
        <li className="navbar__item">
            <Link className="nav-link" to="/used_gear">Used</Link> 
        </li>
        
        
        {
            isStaff()
            ?
            <li className="navbar__item">
                <Link className="nav-link" to="/users">Users</Link> 
            </li>
            : ""
        }
        {
            (localStorage.getItem("lu_token") !== null) ?
                <li className="nav-item">
                    <button className="nav-link fakeLink"
                        onClick={() => {
                            localStorage.removeItem("lu_token")
                            navigate('/login')
                        }}
                    >Logout</button>
                </li> :
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </>
        }        </ul>
    </>
)
}
