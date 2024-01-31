import React from "react";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";


function Company() {

    const location = useLocation();
    const company = location.state;

    const url = "http://127.0.0.1:5555"

    const [openPositions, setOpenPositions] = useState([])

    useEffect(() => {
        fetch(`${url}/open_positions`)
            .then((res) => res.json())
            .then((data) => {
                setOpenPositions(data)
            })
    }, [])

    const positionsForCompanies = openPositions.filter((position) =>
        (position.company_id === company.id))

    return (
        <div className="container">
            <div className="company">
                <h3>Name: {company.name}</h3>
                <p>Amount of Employees: {company.amount_of_employees}</p>
                <p>Open Positions: {company.total_open_positions}</p>
            </div>
            <div className="positions">
                <h3>Open Positions</h3>
                {positionsForCompanies.map((position) => (
                    <li>{position.position}</li>
                ))}
            </div>
        </div>
    )
}

export default Company