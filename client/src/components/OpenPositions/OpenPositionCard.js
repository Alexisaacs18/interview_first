import React from "react";
import { useEffect, useState } from "react";

function OpenPositionCard({ position, url }) {

    const [company, setCompany] = useState({})
    const [contact, setContact] = useState({})

    useEffect(() => {
        fetch(`${url}/companies/${position.company_id}`)
            .then((res) => res.json())
            .then((data) => {
                setCompany(data)
            })
    }, [])

    useEffect(() => {
        fetch(`${url}/contacts/${position.contact_id}`)
            .then((res) => res.json())
            .then((data) => {
                setContact(data)
            })
    }, [])

    return (
        <div>
            <ul>Position: {position.position}</ul>
            <p>Company: {company.name}</p>
            <p>Contact: {contact.name}</p>
            <p>Salary Range: {position.salary_range}</p>
            <p>Date Posted: {position.date_posted}</p>
            {position.position_status ? <p>Status: Open</p> : <p>Status: Closed</p>}
        </div>
    )
}

export default OpenPositionCard