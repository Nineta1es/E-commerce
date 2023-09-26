import React, { useState, useEffect} from "react";
import "../app/globals.css";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

const RegisterUser = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [localStorageType, setLocalStorageType] = useState("guest");
    const [localStorageId, setLocalStorageId] = useState(null);
    const router = useRouter();
    const handleRegister = () => {
        fetch("http://localhost:4242/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                mail: mail,
                password: password,
                birthdate: birthdate,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Une erreur est survenue lors de l'inscription.");
                }
            })
            .then((data) => {
                console.log(data);
                setIsLoggedIn(true);
                toast.success("Inscription réussie ! Vous êtes inscrit.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                });
            })
            .catch((err) => {
                console.log(err);
                // Display an error notification
                toast.error(err.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    };

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        const type = localStorage.getItem("type");
        if(userId !== null && type == null) {
            window.location.href = "/dashboard";
        }
    }
    , []);

    const handleSubmit = (event:any) => {
        event.preventDefault();
        handleRegister();
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Déconnecter l'utilisateur en mettant le state isLoggedIn à false
    };

    return (
        <>
            <div className="flex gap-4 flex-col items-center mx-auto h-screen justify-center">
                <ToastContainer />
                <FontAwesomeIcon icon={faCircleUser} style={{ color: '#00000' }} size="2xl" />
                {isLoggedIn ? (
                    <>
                        <h1 className="text-4xl">Inscription réussie !</h1>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl">Créer un compte</h1>
                        <h4>Veuillez remplir les champs ci-dessous.</h4>
                        <h4><span className="text-red-600">* </span> champ obligatoire.</h4>

                        <div className="w-1/4">
                            <form onSubmit={handleSubmit}>
                                <div className="gap-2 flex flex-col">
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="text"
                                           value={name}
                                           onChange={(event) => setName(event.target.value)}
                                           name="name"
                                           placeholder="* Nom"
                                           required
                                    />
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="date"
                                           value={birthdate}
                                           onChange={(event) => setBirthdate(event.target.value)}
                                           name="birthdate"
                                    />
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="text"
                                           value={mail}
                                           onChange={(event) => setMail(event.target.value)}
                                           name="mail"
                                           placeholder="* Mail"
                                           required
                                    />
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="password"
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           name="password"
                                           placeholder="*******"
                                           required
                                    />
                                    <button className="p-2 bg-black text-white hover:opacity-90" type="submit">
                                        S'inscrire
                                    </button>

                                    <div className="text-center hover:font-bold">
                                        <a href="/connexion">Déjà un compte ?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}

                {!isLoggedIn && <p className="text-red-600 font-semibold">Vous n'êtes pas connecté !</p>}

            </div>
            <Footer />
        </>
    );
};

export default RegisterUser;