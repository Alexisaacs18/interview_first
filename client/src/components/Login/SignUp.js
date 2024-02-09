import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {

    const navigate = useNavigate()

    function navigateToLogin() {
        navigate('/')
    }

    const url = "http://127.0.0.1:5555"

    const formOutline = {
        email: '',
        password: ''
    }

    const [form, setForm] = useState(formOutline)

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            email: form.email,
            password: form.password
        }

        fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) =>
                res.ok ? res.json() : Promise.reject("Failed to register.")
            )
            .then((data) => {
                sessionStorage.setItem('access_token', data.access_token)
            })

        setForm(formOutline)
    }

    return (
        <div>
            <Header />
            <div className="signUpContainer">
                <div className="signUp">
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} value={form.email} name="email" type="text" />
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} value={form.password} name="password" type="text" />
                        <button type="submit">Enter</button>
                    </form>
                    <button onClick={navigateToLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp