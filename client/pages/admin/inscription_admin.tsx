// RegisterUser.js
import React, { useState } from "react";
import "../../app/globals.css";

import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const RegisterUser = () => {
    // State for storing the form data
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage the user's login status

    // Function to handle user registration
    const handleRegister = () => {
        const userData = {
            name: name,
            mail: mail,
            password: password,
            birthdate: birthdate,
            isAdmin: isAdmin,
        };

        console.log("Request Payload:", userData); // Add this line for debugging

        fetch("http://localhost:4242/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsLoggedIn(true); // Registration successful: automatically log in the user
            })
            .catch((err) => console.log(err));
    };

    // Function to handle the form submission
    const handleSubmit = (event:any) => {
        event.preventDefault();
        handleRegister(); // Call the registration function
    };

    return (
        <div className="gap-8 mx-auto h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl">Inscription | Admin</h1>
            <h4>Veuillez remplir les champs ci-dessous.</h4>
            <h4><span className="text-red-600">* </span> champ obligatoire.</h4>
            {/* If the user is logged in, show a success message */}
            {isLoggedIn ? (
                <>
                    <p>Vous êtes inscrit !</p>
                </>
            ) : (
                // Otherwise, show the registration form
                <>
                <div className="w-1/4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <input className="border-b-2 p-2 border-black outline-none"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                name="name"
                                placeholder="Nom"
                            />
                            <input className="border-b-2 p-2 border-black outline-none"
                                type="date"
                                value={birthdate}
                                onChange={(event) => setBirthdate(event.target.value)}
                                name="birthdate"
                                placeholder="Date de naissance"
                            />
                            <input className="border-b-2 p-2 border-black outline-none"
                                type="text"
                                value={mail}
                                onChange={(event) => setMail(event.target.value)}
                                name="mail"
                                placeholder="Mail"
                            />
                            <input 
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(event) => setIsAdmin(event.target.checked)}
                            />
                            <label>s'inscrire en tant qu'admin</label>
                            <input
                                type="text"className="border-b-2 p-2 border-black outline-none"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                name="password"
                                placeholder="Mot de passe"
                            />
                            <button type="submit">S'inscrire</button>
                        </div>
                    </form>
                </div>
                </>
            )}
        </div>
    );
};

export default RegisterUser;
