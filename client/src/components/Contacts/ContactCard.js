import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactCard({ contact }) {

    const navigate = useNavigate()

    function navigateToContact() {
        navigate(`/contacts/${contact.id}`, { state: contact })
    }

    return (
        <div className="contactCard">
            <div onClick={navigateToContact}>
                <h3>Name: {contact.name}</h3>
                <p>Position: {contact.position}</p>
                <a href={contact.linkedin_url}>Linkedin</a>
                <p>Length of Position: {contact.length_of_position}</p>
                {contact.connected ? <p>Connected</p> : <p>Not Connected</p>}
            </div>
            <button>Delete</button>
        </div>
    )
}

export default ContactCard