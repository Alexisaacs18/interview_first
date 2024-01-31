import React from "react";
import { useState, useEffect } from "react";
import NewCompanyForm from "./NewCompanyForm";
import CompanyCard from "./CompanyCard";


function Companies() {

    const url = "http://127.0.0.1:5555"

    const [companies, setCompanies] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch(`${url}/companies`)
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data)
            })
    }, [])

    function addCompany(company) {
        setCompanies([
            ...companies, company
        ])
    }

    function handleClick() {
        setShowForm(prev => !prev)
    }

    return (
        <div>
            <div className="formButton">
                {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
            </div>
            <div className="formContainer">
                {showForm ? <NewCompanyForm addCompany={addCompany} /> : <div></div>}
            </div>
            <div className="companyContainer">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </div>
    )
}


export default Companies