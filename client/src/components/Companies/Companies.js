import React from "react";
import { useState, useEffect } from "react";
import NewCompanyForm from "./NewCompanyForm";
import CompanyCard from "./CompanyCard";


function Companies() {

    const url = "http://127.0.0.1:5555"

    const [companies, setCompanies] = useState([])

    useEffect(() => {
        fetch(`${url}/companies`)
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data)
            })
    }, [])

    return (
        <div>
            <NewCompanyForm />
            {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
    )
}


export default Companies