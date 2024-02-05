import React from "react";
import { useLocation } from "react-router-dom";

function OpenPosition() {

    const location = useLocation()
    const prop = location.state


    return (
        <div className="container">
            <div className="openPosition">
                <h3>Position: {prop.position.position}</h3>
                <p>Company: {prop.company.name}</p>
                <p>Contact: {prop.contact.name}</p>
                <p>Salary Range: {prop.position.salary_range}</p>
                {prop.position.position_status ? <p>Status: Open</p> : <p>Status: Closed</p>}
            </div>
        </div>
    )
}

export default OpenPosition