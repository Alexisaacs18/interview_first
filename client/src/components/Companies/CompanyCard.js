import React from "react";

function CompanyCard({ company }) {


    return (
        <div className="companyCard">
            <ul>Name: {company.name}</ul>
            <p>Amount of Employees: {company.amount_of_employees}</p>
            <p>Open Positions: {company.total_open_positions}</p>
        </div>
    )
}

export default CompanyCard