import React from "react";
import Company from "./Company";
import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {

    const navigate = useNavigate()

    function navigateToCompany() {
        navigate(`/company/${company.id}`, { state: company })
    }

    return (
        <div onClick={navigateToCompany} className="companyCard">
            <ul>Name: {company.name}</ul>
            <p>Amount of Employees: {company.amount_of_employees}</p>
            <p>Open Positions: {company.total_open_positions}</p>
        </div>
    )
}

export default CompanyCard