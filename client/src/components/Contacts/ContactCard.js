import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactCard({ contact, url, handleDelete }) {

    const token = sessionStorage.getItem("access_token")

    const navigate = useNavigate()

    function navigateToContact() {
        navigate(`/contacts/${contact.id}`, { state: contact })
    }

    function handleClick() {
        handleDelete(contact.id)
        deleteContact()
    }

    function deleteContact() {
        fetch(`${url}/contacts/${contact.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
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
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default ContactCard