import React from "react";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";

function Contacts() {

    const url = "http://127.0.0.1:5555"

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch(`${url}/contacts`)
            .then((res) => res.json())
            .then((data) => {
                setContacts(data)
            })
    }, [])

    return (
        <div className="contactContainer">
            {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    )
}

export default Contacts