import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Company from "../Companies/Company";


function NewOpenPositionForm({ addOpenPosition, url }) {

    const token = sessionStorage.getItem("access_token")

    const formSchema = yup.object({
        company_id: yup.number().required("Company ID is required."),
        contact_id: yup.number().required("Contact ID is required."),
        position: yup.string().required("Company ID is required."),
        salary_range: yup.string().required("Contact ID is required."),
    });

    const [companies, setCompanies] = useState([])
    const [contacts, setContacts] = useState([])

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

    useEffect(() => {
        fetch(`${url}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setContacts(data)
            })
    }, [])

    console.log(companies)

    const formik = useFormik({
        initialValues: {
            company_id: 1,
            contact_id: 1,
            position: '',
            salary_range: '',
            position_status: true
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch('http://127.0.0.1:5555/open_positions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    addOpenPosition(data)
                })
            resetForm()
        }
    });



    return (
        <div className="positionForm" id="positionForm">
            <h3>Add New Open Position</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="company_id">Company</label>
                    <select
                        id="company_id"
                        name="company_id"
                        onChange={formik.handleChange}
                        value={formik.values.company_id}
                    >
                        {companies.map((company) => (
                            <option key={company.id} value={company.id} label={company.name} />
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="contact_id">Contact</label>
                    <select
                        id="contact_id"
                        name="contact_id"
                        onChange={formik.handleChange}
                        value={formik.values.contact_id}
                    >
                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id} label={contact.name} />
                        ))}
                    </select>
                    {formik.errors.amount_of_employees && <div>{formik.errors.contact_id}</div>}
                </div>
                <div>
                    <label htmlFor="position">Position</label>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.position}
                        placeholder="Position"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.position}</div>}
                </div>
                <div>
                    <label htmlFor="salary_range">Salary Range</label>
                    <input
                        id="salary_range"
                        name="salary_range"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.salary_range}
                        placeholder="Salary Range"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.salary_range}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewOpenPositionForm