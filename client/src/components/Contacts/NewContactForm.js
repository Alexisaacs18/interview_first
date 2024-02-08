import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';


function NewContactForm({ addContact }) {

    const formSchema = yup.object({
        name: yup.string().required("Company ID is required."),
        linkedin_url: yup.string().required("Contact ID is required."),
        position: yup.string().required("Company ID is required."),
        length_of_position: yup.string().required("Contact ID is required."),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            linkedin_url: '',
            position: '',
            length_of_position: '',
            connected: false,
            sent_messages: null,
            replied: false,
            tone: false
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch('http://127.0.0.1:5555/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    addContact(data)
                })
            resetForm()
        }
    });

    return (
        <div className="contactForm" id="contactform">
            <h3>Add New Contact</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Name"
                    />
                    {formik.errors.name && <div>{formik.errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="linkedin_url">Linkedin</label>
                    <input
                        id="linkedin_url"
                        name="linkedin_url"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Linkedin Url"
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
                    <label htmlFor="length_of_position">Length of Position</label>
                    <input
                        id="length_of_position"
                        name="length_of_position"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.amount_of_employees}
                        placeholder="Length of Position"
                    />
                    {formik.errors.amount_of_employees && <div>{formik.errors.amount_of_employees}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewContactForm