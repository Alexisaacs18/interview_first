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


    console.log(positionsForCompanies)

    return (
        <div>
            <div>
                <h3>Name: {company.name}</h3>
                <ul>Amount of Employees: {company.amount_of_employees}</ul>
                <ul>Open Positions: {company.total_open_positions}</ul>
            </div>
            <div>
                {positionsForCompanies.map((position) => (
                    <h4>{position.position}</h4>
                ))}
            </div>
        </div>
    )
}

export default Company