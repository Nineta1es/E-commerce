import React, { useState, useEffect } from "react";
import "../app/globals.css";

import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import {useRouter} from "next/router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faArrowRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Importer les composants de la librairie de connexion Google
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const LoginUser = () => {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [localStorageType, setLocalStorageType] = useState("guest");
    const router = useRouter();

    // Fonction pour afficher le message de succès ou d'erreur de la connexion Google
    const responseMessage = (response: any) => {
        console.log(response);
    };

    // Fonction pour afficher le message d'erreur de la connexion Google
    const errorMessage = (error: any) => {
        console.log(error);
    };

    const handleAuthentication = () => {
        fetch("http://localhost:4242/connexion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: mail,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    localStorage.removeItem("_id");
                    localStorage.setItem("_id", data.userId)
                    localStorage.removeItem("type");
                    toast.success('Vous êtes connecté !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setIsLoggedIn(true); // Authentication successful: log in the user
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        const type = localStorage.getItem("type");
        if(userId !== null && type == null) {
            window.location.href = "/dashboard";
        }
    }, []);

    const handleSubmit = (event:any) => {
        event.preventDefault();
        handleAuthentication();
    };

    const handleLogout = () => {
        fetch("http://localhost:4242/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLoggedIn(false); // Mettre à jour le statut de connexion à false après une déconnexion réussie
                    // Supprimer l'_id du localStorage
                    localStorage.removeItem("_id");
                } else {
                    // Gérer les erreurs de déconnexion ici (facultatif)
                    console.log("Error during logout:", data.message);
                }
            })
            .catch((err) => {
                console.log("Fetch error during logout:", err);
            });
    };
    return (
        <div className="flex gap-4 flex-col items-center mx-auto pb-28 h-screen justify-center">
            <ToastContainer />
            <GoogleOAuthProvider clientId='1000878510064-mtcaavs93cd328nqsu812tnck8r61r6r.apps.googleusercontent.com' >
                <FontAwesomeIcon icon={faCircleUser} style={{ color: '#00000' }} size="2xl" />
                <h1 className="text-4xl">Connexion</h1>
                {isLoggedIn ? (
                    <>
                        <p>Vous êtes connecté !</p>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <div className="w-1/4">
                            <hr />
                            <div className="flex justify-center items-center py-6">
                                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Common fields for registration and login */}
                                <div className="gap-2 flex flex-col">
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="text"
                                           value={mail}
                                           onChange={(event) => setMail(event.target.value)}
                                           name="mail"
                                           placeholder="Mail"
                                    />
                                    <input className="border-b-2 p-2 border-black outline-none"
                                           type="password"
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           name="password"
                                           placeholder="*******"
                                    />
                                    <button className="p-2 bg-black text-white hover:opacity-90" type="submit">
                                        Se connecter
                                    </button>
                                    <div className="text-center hover:font-bold">
                                        <a href="/inscription">Pas de compte ?</a>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </>
                )}
            </GoogleOAuthProvider>
        </div>
    );
};

export default LoginUser;