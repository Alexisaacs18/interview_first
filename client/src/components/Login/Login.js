import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {

    const navigate = useNavigate()

    function navigateToCompanies() {
        navigate('/companies')
    }

    function navigateToSignUp() {
        navigate('/signup')
    }

    const url = "http://127.0.0.1:5555"

    const formOutline = {
        email: '',
        password: ''
    }

    const [login, setLogin] = useState([])
    const [form, setForm] = useState(formOutline)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(`${url}/login`)
            .then((res) => res.json())
            .then((data) => {
                setLogin(data)
            })
    }, [])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const checkLogin = login.filter((log) => (
            log.email === form.email && log.password === form.password
        ))

        if (checkLogin.length === 1) {
            navigateToCompanies()
        } else {
            setError(prev => !prev)
        }
    }

    return (
        <div>
            <Header />
            <div className="loginContainer">
                <div className="login">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} value={form.email} name="email" type="text" />

                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} value={form.password} name="password" type="text" />

                        <button type="submit">Enter</button>
                    </form>
                    <button onClick={navigateToSignUp}>Sign Up</button>
                    {error ? <div><p>Invalid Credentials</p></div> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Login