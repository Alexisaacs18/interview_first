import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';


function NewOpenPositionForm({ addOpenPosition }) {

    const formSchema = yup.object({
        company_id: yup.number().required("Company ID is required."),
        contact_id: yup.number().required("Contact ID is required."),
        position: yup.string().required("Company ID is required."),
        salary_range: yup.string().required("Contact ID is required."),
    });

    const formik = useFormik({
        initialValues: {
            company_id: null,
            contact_id: null,
            position: '',
            salary_range: '',
            position_status: true
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('http://127.0.0.1:5555/open_positions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    addOpenPosition(data)
                })
        }
    });

    return (
        <div className="positionForm" id="companynewform">
            <h3>Add New Company</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="company_id">Company</label>
                    <input
                        id="company_id"
                        name="company_id"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Company"
                    />
                    {formik.errors.name && <div>{formik.errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="contact_id">Contact</label>
                    <input
                        id="contact_id"
                        name="contact_id"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Contact"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.amount_of_employees}</div>}
                </div>
                <div>
                    <label htmlFor="position">Position</label>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Position"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.amount_of_employees}</div>}
                </div>
                <div>
                    <label htmlFor="salary_range">Salary Range</label>
                    <input
                        id="salary_range"
                        name="salary_range"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Salary Range"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.amount_of_employees}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewOpenPositionForm