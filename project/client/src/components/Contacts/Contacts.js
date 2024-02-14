import React from "react";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import NewContactForm from "./NewContactForm";
import NavBar from "../../NavBar";

function Contacts() {

    const token = sessionStorage.getItem("access_token")

    const url = "http://0.0.0.0:10000"

    const [contacts, setContacts] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch(`${url}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
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

    function handleDelete(id) {
        const deleteContact = contacts.filter((contact) => (
            contact.id !== id
        ))
        setContacts(deleteContact)
    }

    return (
        <div>
            <div><NavBar /></div>
            <div>
                <div>
                    <div className="head">
                        <h1>Contacts</h1>
                    </div>
                    <div className="formButton">
                        {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
                    </div>
                    <div className="contactFormContainer">
                        {showForm ? <NewContactForm addContact={addContact} /> : <div></div>}
                    </div>
                </div>
                <div className="contactContainer">
                    {contacts.length > 0 ? contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} url={url} handleDelete={handleDelete} />
                    )) : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Contacts