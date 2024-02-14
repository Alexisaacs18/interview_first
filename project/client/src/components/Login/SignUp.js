import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {

    const navigate = useNavigate()

    function navigateToLogin() {
        navigate('/')
    }

    const url = "http://0.0.0.0:10000"

    const formOutline = {
        email: '',
        password: ''
    }

    const [form, setForm] = useState(formOutline)
    const [error, setError] = useState(false)

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
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    sessionStorage.setItem('access_token', data.access_token)
                } else {
                    setError(prev => !prev)
                }
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
                    {error ? <div><p>Email Already Exists</p></div> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default SignUp