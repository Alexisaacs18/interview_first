import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {

    // const url = "http://127.0.0.1:5555"

    // const token = sessionStorage.getItem("access_token")

    const navigate = useNavigate()

    function navigateToCompanies() {
        navigate("/companies")
    }

    function navigateToContacts() {
        navigate("/contacts")
    }

    function navigateToOpenPositions() {
        navigate("/openpositions")
    }

    function navigateToLogin() {
        sessionStorage.removeItem("access_token")
        navigate("/")
    }

    // function logout() {
    //     fetch(`${url}/logout`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    // }


    return (
        <nav className="nav">
            <ul>
                <li><h1>Interview First</h1></li>
                <li><button onClick={navigateToCompanies}>Companies</button></li>
                <li><button onClick={navigateToOpenPositions}>Open Positions</button></li>
                <li><button onClick={navigateToContacts}>Contacts</button></li>
                <li><button onClick={navigateToLogin}>Log Out</button></li>
            </ul>
        </nav>
    )
}

export default NavBar