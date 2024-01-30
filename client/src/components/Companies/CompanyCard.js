import React from "react";

function CompanyCard({ company }) {


    return (
        <div>
            <h3>Company Name: {company.name}</h3>
            <ul>Amount of Employees: {company.amount_of_employees}</ul>
            <ul>Open Positions: {company.total_open_positions}</ul>
        </div>
    )
}

export default CompanyCard