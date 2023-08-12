import { NavLink } from "react-router-dom"
import "./navbar.css"

export function Navbar () {
    return(
        <nav className="navbar-container">
            <NavLink className="link" to={"/"}>Dashboard</NavLink>            
            <NavLink className="link" to={"/departments"}>Departments</NavLink>            
            <NavLink className="link" to={"/products"}>Products</NavLink>            
        </nav>
    )
}