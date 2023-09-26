import React, { useState } from "react";
import Link from "next/link";
import "@/pages/admin/create_categorie";
import "@/app/globals.css/"

import { faArrowAltCircleRight, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const CreateCategorie = () => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();

        fetch("http://localhost:4242/createCategorie", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Une catégorie avec ce nom existe déjà.");
                }
                return response.json();
            })
            .then(data => {
                setSuccessMessage("Catégorie créée avec succès!");
                setErrorMessage('');
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.message || "Une erreur s'est produite lors de la création de la catégorie.");
                setSuccessMessage('');
            });
    }

    return (
        <div className="gap-12 mx-auto h-screen flex flex-col items-center justify-center text-center">
            <FontAwesomeIcon icon={faRectangleList} style={{ color: '#00000' }} size="2xl" />
            <h1 className="text-4xl">Créer une Catégorie</h1>
            <div className="flex items-center gap-4">
                <input className="border-b-2 p-2 border-black outline-none" type="text" value={name} onChange={event => setName(event.target.value)} name="name" placeholder="nom" />
                <button onClick={handleCreate}>Créer</button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <Link className='' href="/admin">
                <div className="flex gap-6">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ color: '#00000' }} size="xl" />
                    Accéder à la page admin
                </div>
            </Link>
        </div>
    );
}

export default CreateCategorie;