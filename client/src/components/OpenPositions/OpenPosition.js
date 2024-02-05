import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OpenPosition() {

    const navigate = useNavigate()

    function navigateToOpenPositions() {
        navigate('/openpositions')
    }

    const location = useLocation()
    const prop = location.state


    return (
        <div>
            <div className="page">
                <button onClick={navigateToOpenPositions}>Back to Open Positions</button>
            </div>
            <div className="container">
                <div className="openPosition">
                    <h3>Position: {prop.position.position}</h3>
                    <p>Company: {prop.company.name}</p>
                    <p>Contact: {prop.contact.name}</p>
                    <p>Salary Range: {prop.position.salary_range}</p>
                    {prop.position.position_status ? <p>Status: Open</p> : <p>Status: Closed</p>}
                    <button>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default OpenPosition