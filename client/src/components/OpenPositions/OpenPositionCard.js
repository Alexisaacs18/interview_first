import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OpenPositionCard({ position, url, handleDelete }) {

    const navigate = useNavigate()

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

    function navigateToOpenPosition() {
        navigate(`/openpositions/${position.id}`, {
            state: {
                position: position,
                company: company,
                contact: contact
            }
        })
    }

    function handleClick() {
        deleteOpenPosition()
        handleDelete(position.id)
    }

    function deleteOpenPosition() {
        fetch(`${url}/open_positions/${position.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="openPositionCard">
            <div onClick={navigateToOpenPosition}>
                <h3>Position: {position.position}</h3>
                <h4>Company: {company.name}</h4>
                <h4>Contact: {contact.name}</h4>
                <p>Salary Range: {position.salary_range}</p>
                {position.position_status ? <p>Status: Open</p> : <p>Status: Closed</p>}
            </div>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default OpenPositionCard