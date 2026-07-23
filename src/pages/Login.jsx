import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Input from "../components/ui/Input/Input";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    function handleLogin() {

        if (
            email === "admin@topeleven.com" &&
            password === "123456"
        ) {

        login();

        navigate("/app");

        } else {

            setError("Invalid email or password.");

        }

    }

    return (

        <div className="login">

            <div className="login-card">

                <h1>Top Eleven Tools</h1>

                <p>Welcome back!</p>

                <Input

                    label="Email"

                    type="email"

                    value={email}

                    placeholder="Enter your email"

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <Input

                    label="Password"

                    type="password"

                    value={password}

                    placeholder="Enter your password"

                    onChange={(e)=>setPassword(e.target.value)}

                />

                {error &&

                    <span className="login-error">

                        {error}

                    </span>

                }

                <button onClick={handleLogin}>

                    Login

                </button>

            </div>

        </div>

    );

}

export default Login;