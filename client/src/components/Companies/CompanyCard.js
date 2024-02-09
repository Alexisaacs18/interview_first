import React from "react";
import Company from "./Company";
import { useNavigate } from "react-router-dom";

function CompanyCard({ company, handleDelete, url }) {

    const token = sessionStorage.getItem("access_token")

    const navigate = useNavigate()

    function navigateToCompany() {
        navigate(`/company/${company.id}`, { state: company })
    }

    function handleClick() {
        handleDelete(company.id)
        deleteCompany()
    }

    function deleteCompany() {
        fetch(`${url}/companies/${company.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }

    return (
        <div className="companyCard">
            <div onClick={navigateToCompany} >
                <h3>Company Name: {company.name}</h3>
                <p>Amount of Employees: {company.amount_of_employees}</p>
                <p>Open Positions: {company.total_open_positions}</p>
            </div>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default CompanyCard