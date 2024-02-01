import React from "react";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";


function Company() {

    const location = useLocation();
    const company = location.state;

    const url = "http://127.0.0.1:5555"

    const formOutline = {
        name: company.name,
        amount_of_employees: company.amount_of_employees,
        total_open_positions: company.total_open_positions
    }

    const [openPositions, setOpenPositions] = useState([])
    const [edit, setEdit] = useState(true)
    const [form, setForm] = useState(formOutline)

    useEffect(() => {
        fetch(`${url}/open_positions`)
            .then((res) => res.json())
            .then((data) => {
                setOpenPositions(data)
            })
    }, [])

    function handleClick() {
        setEdit(prev => !prev)
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name: form.name,
            amount_of_employees: form.amount_of_employees,
            total_open_positions: form.total_open_positions
        }

        fetch(`${url}/companies/${company.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    const positionsForCompanies = openPositions.filter((position) =>
        (position.company_id === company.id))

    return (
        <div className="container">
            <div className="company">
                {edit ?
                    <div>
                        <h3>Name: {form.name}</h3>
                        <p>Amount of Employees: {form.amount_of_employees}</p>
                        <p>Open Positions: {form.total_open_positions}</p>
                    </div> :
                    <div>
                        <form onSubmit={handleSubmit} className="companyUpdateForm">
                            <label htmlFor="name">Company Name:</label>
                            <input onChange={handleChange} value={form.name} type="text" name="name" defaultValue={company.name} />

                            <label htmlFor="amount_of_employees">Amount of Employees:</label>
                            <input onChange={handleChange} value={form.amount_of_employees} type="text" name="amount_of_employees" defaultValue={company.amount_of_employees} />

                            <label htmlFor="total_open_positions">Total_open_positions:</label>
                            <input onChange={handleChange} value={form.total_open_positions} type="number" name="total_open_positions" defaultValue={company.total_open_positions} />

                            <button type="submit">Update Company</button>
                        </form>
                    </div>}
                <button onClick={handleClick}>Edit</button>
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