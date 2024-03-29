import React from "react";
import { useState, useEffect } from "react";
import NewCompanyForm from "./NewCompanyForm";
import CompanyCard from "./CompanyCard";
import NavBar from "../../NavBar";


function Companies() {

    const url = "https://0.0.0.0:10000"

    const token = sessionStorage.getItem("access_token")

    console.log(token)

    const [companies, setCompanies] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetch(`${url}/companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
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

    function handleDelete(id) {
        const deleteCompany = companies.filter((company) => (
            company.id !== id
        ))
        setCompanies(deleteCompany)
    }

    return (
        <div>
            <div><NavBar /></div>
            <div>
                <div className="head">
                    <h1>Companies</h1>
                </div>
                <div className="formButton">
                    {showForm ? <button onClick={handleClick}>Hide Form</button> : <button onClick={handleClick}>Show Form</button>}
                </div>
                <div className="formContainer">
                    {showForm ? <NewCompanyForm addCompany={addCompany} /> : <div></div>}
                </div>
                <div className="companyContainer">
                    {companies.length > 0 ? companies.map((company) => (
                        <CompanyCard key={company.id} company={company} handleDelete={handleDelete} url={url} />
                    )) : <div></div>}
                </div>
            </div>
        </div>
    )
}


export default Companies