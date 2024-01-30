import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()

    function navigateToCompanies() {
        navigate("/")
    }

    function navigateToContacts() {
        navigate("/contacts")
    }

    function navigateToOpenPositions() {
        navigate("/openpositions")
    }


    return (
        <nav className="nav">
            <ul>
                <li><h1>Interview First</h1></li>
                <li><button onClick={navigateToCompanies}>Companies</button></li>
                <li><button onClick={navigateToOpenPositions}>Open Positions</button></li>
                <li><button onClick={navigateToContacts}>Contacts</button></li>
            </ul>
        </nav>
    )
}

export default NavBar