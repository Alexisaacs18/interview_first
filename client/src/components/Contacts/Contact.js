import React from "react";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

function Contact() {

    const location = useLocation();
    const prop = location.state;

    return (
        <div>
            <div>
                <h3>Name: {prop.contact.name}</h3>
                <ul>Position: {prop.contact.position}</ul>
                <a href={prop.contact.linkedin_url}>Linkedin</a>
                <ul>Length of Position: {prop.contact.length_of_position}</ul>
            </div>
            <div>
                <h4>Status</h4>
                {prop.outreach.connected ? <p>Connected</p> : <p>Not Connected</p>}
                <p>Messages Sent: {prop.outreach.sent_messages}</p>
                {prop.outreach.replied ? <p>Reply Received</p> : <p>No Reply</p>}
                {prop.outreach.tone ? <p>Tone: Positive</p> : <p>Tone: Negative or No Reply</p>}
            </div>
        </div>
    )
}

export default Contact