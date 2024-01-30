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
        <nav>
            <ul>
                <h1>Hunt</h1>
                <button onClick={navigateToCompanies}>Companies</button>
                <button onClick={navigateToOpenPositions}>Open Positions</button>
                <button onClick={navigateToContacts}>Contacts</button>
            </ul>
        </nav>
    )
}

export default NavBar