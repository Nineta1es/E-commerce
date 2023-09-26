import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import Footer from "@/src/components/footer";
import Image from "next/image";

import Laurien from "@/src/assets/laurier.png";

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { set } from "mongoose";

export default function Abonnement() {
  const [status, setstatus] = useState(false);
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    fetch("http://localhost:4242/abonnement/display", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
          setstatus(data.status);
          setstartDate(data.startDate);
          setendDate(data.endDate);
        });
  }, []);

  const Subscribe = () => {
    fetch("http://localhost:4242/abonnement/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
    window.location.reload();
  };

  const UnSubscribe = () => {
    fetch("http://localhost:4242/abonnement/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
    window.location.reload();
  };


  return (
    <>
      <main className="h-full p-2 w-full bg-gray-100">
        <div className="boxTitle flex flex-col items-center justify-center py-12 ">
          <div className="Title flex items-center justify-center gap-2">
            <h1 className="text-center text-4xl">Abonnement</h1>
            <Image
              alt="Laurier image abonnement"
              className="w-10 h-10"
              src={Laurien}
            ></Image>
          </div>

          <div className="subTitle">
            <h4 className="text-xl">Knock Off Premier.</h4>
          </div>
        </div>

        <div className="mainContainer flex flex-col justify-center items-center mt-18">
          <div className="firstBlock rounded-md bg-white w-1/2 flex flex-col items-start p-8">
            {status === true ? (
              <div className="titleFirstBox">
                <p>
                  Vous êtes abonné jusqu'au{" "}
                  <span className="font-bold">{endDate}</span>
                </p>
                <h1 className="text-2xl font-bold py-4">
                  Vous pouvez vous désabonner
                </h1>
                <div className="py-6">
                  <button
                    className="font-bold text-xl button bg-red-600 w-fit p-3 text-white hover:bg-red-500"
                    onClick={UnSubscribe}
                  >
                    Se désabonner
                  </button>
                </div>
              </div>
            ) : (
              <div className="titleFirstBox">
                <p>
                  Abonne toi à KnockOff premier pour bénéficier de la livraison
                  24h en illimité pendant 1 ans. Un montant d'achat minimum de
                  20,00 € par commande est requis.
                </p>
                <h1 className="text-2xl font-bold py-4">
                  Pour seulement 15,00€/an
                </h1>
                <p className="text-slate-500 text-sm">
                  Des échéances en terme d’horaires, de dates et de restrictions
                  de zones peuvent s'appliquer. Ces échéances peuvent changer
                  pendant les périodes chargées (regardez bien les estimations
                  de dates de livraison au moment du paiement). Valable
                  uniquement pour un usage personnel. En vous inscrivant, vous
                  acceptez les conditions générales de vente.
                </p>
                <div className="py-6">
                  <button
                    className="font-bold text-xl button bg-green-600 w-fit p-3 text-white hover:bg-green-500"
                    onClick={Subscribe}
                  >
                    S'abonner
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-md bg-white w-1/2 p-8 mt-6 items-start">
            <div className="subDescribe flex flex-col w-fit justify-start items-start">
              <h1 className="font-bold text-2xl">Faisons les comptes</h1>

              <p className="mt-6">
                A <span className="font-bold"> 15,00€ </span> pour 12 mois,
                l'abonnement KnockOff Premier devient rentable au bout de
                seulement
                <span className="font-bold"> 1 commandes </span> avec livraison
                24h.
              </p>
            </div>

            <div
              className="flex flex-cols-3 gap-16 mx-auto items-center justify-center w-full place-content-center mt-12 pb-12
                            border-2 rounded-md p-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="font-bold">
                  <h1>Commandes par an</h1>
                </div>
                <div className="flex flex-col items-center gap-4 ">
                  <p>1</p>
                  <p>2</p>
                  <p>5</p>
                  <p>10</p>
                  <p>15</p>
                  <p>20</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 bg-gray-100 p-2 rounded-md">
                <div className="font-bold">
                  <h1>Sans KnockOff premier</h1>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p>14,50€</p>
                  <p>29,00€</p>
                  <p>72,50€</p>
                  <p>145,00€</p>
                  <p>217,50€</p>
                  <p>290,00€</p>
                </div>
              </div>
              <div className=" flex flex-col items-center gap-4 bg-blue-100 p-2 rounded-md">
                <div className="font-bold">
                  <h1>Avec KnockOff premier</h1>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p>14,50€</p>
                  <p>29,00€</p>
                  <p>72,50€</p>
                  <p>145,00€</p>
                  <p>217,50€</p>
                  <p>280,00€</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
