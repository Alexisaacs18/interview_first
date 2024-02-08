import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate()

    function navigateToLogin() {
        navigate('/')
    }

    return (
        <div>
            <Header />
            <div className="signUpContainer">
                <div className="signUp">
                    <h3>Sign Up</h3>
                    <form>
                        <label>Email:</label>
                        <input type="text" />
                        <label>Password:</label>
                        <input type="text" />
                        <button>Enter</button>
                    </form>
                    <button onClick={navigateToLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp