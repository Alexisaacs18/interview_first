import React from "react";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import NewContactForm from "./NewContactForm";

function Contacts() {

    const url = "http://127.0.0.1:5555"

    const [contacts, setContacts] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch(`${url}/contacts`)
            .then((res) => res.json())
            .then((data) => {
                setContacts(data)
            })
    }, [])

    function handleClick() {
        setShowForm(prev => !prev)
    }

    function addContact(contact) {
        setContacts([...contacts, contact])
    }

    return (
        <div>
            <div>
                <div className="formButton">
                    {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
                </div>
                <div className="contactFormContainer">
                    {showForm ? <NewContactForm addContact={addContact} /> : <div></div>}
                </div>
            </div>
            <div className="contactContainer">
                {contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    )
}

export default Contacts