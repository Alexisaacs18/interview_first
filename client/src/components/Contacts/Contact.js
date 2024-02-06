import React from "react";
import { json, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Contact() {

    const navigate = useNavigate()

    function navigateToContacts() {
        navigate('/contacts')
    }

    const url = "http://127.0.0.1:5555"

    const location = useLocation();
    const contact = location.state;

    const contactFormOutline = {
        name: contact.name,
        linkedin_url: contact.linkedin_url,
        position: contact.position,
        length_of_position: contact.length_of_position
    }

    const statusFormOutline = {
        connected: contact.connected,
        sent_messages: contact.sent_messages,
        replied: contact.replied,
        tone: contact.tone
    }

    const [editContact, setEditContact] = useState(true)
    const [editStatus, setEditStatus] = useState(true)
    const [contactForm, setContactForm] = useState(contactFormOutline)
    const [statusForm, setStatusForm] = useState(statusFormOutline)

    function handleContact() {
        setEditContact(prev => !prev)
    }

    function handleStatus() {
        setEditStatus(prev => !prev)
    }

    function contactChange(e) {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        })
    }

    function statusChange(e) {
        setStatusForm({
            ...statusForm,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: contactForm.name,
            linkedin_url: contactForm.linkedin_url,
            position: contactForm.position,
            length_of_position: contactForm.length_of_position
        }

        fetch(`${url}/contacts/${contact.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    return (
        <div>
            <div className="page">
                <button onClick={navigateToContacts}>Back to Contacts</button>
            </div>
            <div className="container">
                <div className="contact">
                    {editContact ? <div>
                        <h3>Name: {contactForm.name}</h3>
                        <ul>Position: {contactForm.position}</ul>
                        <a href={contactForm.linkedin_url}>Linkedin</a>
                        <ul>Length of Position: {contactForm.length_of_position}</ul>
                        <button onClick={handleContact}>Edit</button>
                    </div>
                        :
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">Contact Name:</label>
                                <input onChange={contactChange} value={contactForm.name} type="text" name="name" />

                                <label htmlFor="position">Position:</label>
                                <input onChange={contactChange} value={contactForm.position} type="text" name="position" />

                                <label htmlFor="linkedin_url">Linkedin</label>
                                <input onChange={contactChange} value={contactForm.linkedin_url} type="text" name="linkedin_url" />

                                <label htmlFor="length_of_position">length of Position</label>
                                <input onChange={contactChange} value={contactForm.length_of_position} type="text" name="length_of_position" />

                                <button type="submit" >Update Contact</button>
                            </form>
                            <button onClick={handleContact}>Back</button>
                        </div>
                    }
                </div>
                <div className="status">
                    <h3>Status</h3>
                    {editStatus ? <div>
                        {contact.connected ? <p>Connected</p> : <p>Not Connected</p>}
                        <p>Messages Sent: {contact.sent_messages}</p>
                        {contact.replied ? <p>Reply Received</p> : <p>No Reply</p>}
                        {contact.tone ? <p>Tone: Positive</p> : <p>Tone: Negative or No Reply</p>}
                        <button onClick={handleStatus} >Edit</button>
                    </div>
                        :
                        <div>
                            <form></form>
                            <button onClick={handleStatus}>Back</button>
                        </div>}

                </div>
            </div>
        </div>
    )
}

export default Contact