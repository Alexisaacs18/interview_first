import React from "react";
import { useLocation } from "react-router-dom";

function OpenPosition() {

    const location = useLocation()
    const prop = location.state


    return (
        <div>
            <ul>Position: {prop.position.position}</ul>
            <p>Company: {prop.company.name}</p>
            <p>Contact: {prop.contact.name}</p>
            <p>Salary Range: {prop.position.salary_range}</p>
            <p>Date Posted: {prop.position.date_posted}</p>
            {prop.position.position_status ? <p>Status: Open</p> : <p>Status: Closed</p>}
        </div>
    )
}

export default OpenPosition