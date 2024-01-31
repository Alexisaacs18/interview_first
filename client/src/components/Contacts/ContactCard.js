import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactCard({ contact, url }) {

    const navigate = useNavigate()

    const [outreach, setOutreach] = useState({})

    useEffect(() => {
        fetch(`${url}/outreach/${contact.outreach_id}`)
            .then((res) => res.json())
            .then((data) => {
                setOutreach(data)
            })
    }, [])

    function navigateToContact() {
        navigate(`/contacts/${contact.id}`, { state: { contact: contact, outreach: outreach } })
    }

    return (
        <div onClick={navigateToContact} className="contactCard">
            <ul>Name: {contact.name}</ul>
            <p>Position: {contact.position}</p>
            <a href={contact.linkedin_url}>Linkedin</a>
            <p>Length of Position: {contact.length_of_position}</p>
            {outreach.connected ? <p>Connected</p> : <p>Not Connected</p>}
        </div>
    )
}

export default ContactCard