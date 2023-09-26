import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Promotion = () => {

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [percent, setPercent] = useState("0");
    const [doExist, setDoExist] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4242/displayPromotion", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
            if(data.result.startDate != null)
            {
                setDoExist(true);
                setStart(data.result.startDate);
                setEnd(data.result.endDate);
                setPercent(data.result.percent)
            }
        })
    }, [doExist])

    const validate = () => {
        fetch("http://localhost:4242/promotion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                start: start,
                end: end,
                percent: percent
            })
        })
        .then(response => response.json())
        .then(data => toast(data.message))
    };

    const handleDelete = () => {
        fetch("http://localhost:4242/deletePromotion", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
            setDoExist(false)
        })
    }

    return (
        <div className="gap-8 mx-auto flex flex-col p-2">
            <ToastContainer/>
            <h1 className="text-2xl font-semibold text-center">Promotion globale</h1>
            <div className="text-left">
                <p>Vous pouvez choisir la date de début et de fin de la période de promotion, ainsi que le pourcentage de rabais.</p>
                <p className="text-red-600">C'est une promotion globale pour tous les articles, elle s'appliquera même si des produits sont déjà en reduction.</p>
            </div>
            <div className="mt-24 flex justify-center">
                {
                    doExist ? (
                        <div>
                            <div>
                                <p className="text-xl font-semibold">Il y a déjà une promo qui a commencé le {start} et qui va finir le {end}</p>
                            </div>
                            <div>
                                <button className="text-white bg-red-600 hover:bg-red-500 p-2 rounded-lg" onClick={handleDelete}>Supprimer la promotion en cours</button>
                            </div>
                        </div>
                    ) : (
                    <div>
                        <div className="my-4">
                            <label htmlFor="start">Date de début : </label>
                            <input name="promo" type="date" className="border-b-2 p-2 border-black outline-none" value={start} onChange={(event) => setStart(event.target.value)} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="end">Date de fin : </label>
                            <input name="end" type="date" className="border-b-2 p-2 border-black outline-none" value={end} onChange={(event) => setEnd(event.target.value)} />
                        </div>
                        <div className="my-4">
                            <label htmlFor="percent">Pourcentage : </label>
                            <input type="number" name="percent" max={100} min={0} className="border border-black rounded-lg" value={percent} onChange={(event) => setPercent(event.target.value)}/>
                        </div>
                        <div className="my-4">
                            <button className="text-white bg-black p-2 rounded-lg" onClick={validate}>Valider les changements</button>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Promotion