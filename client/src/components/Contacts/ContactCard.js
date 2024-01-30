import React from "react";

function ContactCard({ contact }) {

    return (
        <div className="contactCard">
            <ul>Name: {contact.name}</ul>
            <p>Position: {contact.position}</p>
            <a href={contact.linkedin_url}>Linkedin</a>
            <p>Length of Position: {contact.length_of_position}</p>
        </div>
    )
}

export default ContactCard