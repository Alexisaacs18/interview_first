import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';


function NewCompanyForm({ addCompany }) {

    const token = sessionStorage.getItem("access_token")

    const formSchema = yup.object({
        name: yup.string().required("Company name is required."),
        amount_of_employees: yup.string().required("Company amount of employees is required."),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            amount_of_employees: '',
            total_open_positions: 0,
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch('http://127.0.0.1:5555/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    addCompany(data)
                })
            resetForm()
        }
    });

    return (
        <div className="newform" id="companynewform">
            <h3>Add New Company</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Company Name"
                    />
                    {formik.errors.name && <div>{formik.errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="employees">Amount of Employees</label>
                    <input
                        id="amount_of_employees"
                        name="amount_of_employees"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Number of Employees"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.amount_of_employees}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewCompanyForm