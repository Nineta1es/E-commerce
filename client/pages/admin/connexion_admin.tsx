import React, { useState } from "react";
import "/home/elil-wac-003/W-WEB-502-LIL-2-1-ecommerce-lucas.pesse/client/app/globals.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        const userData = {
            mail: email,
            password: password,
        };

        console.log("Login Request Payload:", userData);
        fetch("http://localhost:4242/connexion_admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.isAdmin) {
                    localStorage.setItem("isAdmin", "true");
                    setIsLoggedIn(true);
                } else {
                    console.log("Login failed");
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleLogout = () => {
        fetch("http://localhost:4242/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLoggedIn(false);
                    localStorage.removeItem("isAdmin");
                } else {
                    console.log("Error during logout:", data.message);
                }
            })
            .catch((err) => {
                console.log("Fetch error during logout:", err);
            });
    };

    if (isLoggedIn) {
        return (
            <div>
                <p className="py-24"> Connecté en tant qu'admin!</p>
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
        );
    }

    return (
        <div className="mt-40">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        placeholder="Mail"
                    />
                    <br />
                </div>
                <input
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    placeholder="Mot de passe"
                />
                <br />
                <button type="submit">Se connecter</button>
                <br />
            </form>
        </div>
    );
};

export default Login;
