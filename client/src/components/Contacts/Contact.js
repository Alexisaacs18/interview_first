import React from "react";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Contact() {

    const location = useLocation();
    const contact = location.state;

    return (
        <div>
            <div>
                <h3>Name: {contact.name}</h3>
                <ul>Position: {contact.position}</ul>
                <a href={contact.linkedin_url}>Linkedin</a>
                <ul>Length of Position: {contact.length_of_position}</ul>
            </div>
            <div>
                <h4>Status</h4>
                {contact.connected ? <p>Connected</p> : <p>Not Connected</p>}
                <p>Messages Sent: {contact.sent_messages}</p>
                {contact.replied ? <p>Reply Received</p> : <p>No Reply</p>}
                {contact.tone ? <p>Tone: Positive</p> : <p>Tone: Negative or No Reply</p>}
            </div>
        </div>
    )
}

export default Contact