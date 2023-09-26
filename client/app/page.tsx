"use client";
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/src/components/carousel';
import Footer from '@/src/components/footer';
import NavbarPage from '@/src/components/navbar';
import AnnounceBar from '@/src/components/announceBar'
import Laurien from "@/src/assets/laurier.png"
import React, { use, useEffect, useState } from "react";



const images = [
  "https://shop.wankil.fr/cdn/shop/products/sweatsovietrougemockup.jpg?v=1579800917&width=600/",
  "https://shop.wankil.fr/cdn/shop/products/sweatwankil_1_40a811ad-d859-4237-93eb-9778162ca8c4.jpg?v=1616257159&width=600",
  "https://shop.wankil.fr/cdn/shop/products/sweatcasquette_2_01bdd90a-05d8-4c01-b08c-83d93c965a42.jpg?v=1616257503&width=600",
  "https://shop.wankil.fr/cdn/shop/products/sweatcasquette_3.jpg?v=1616257503&width=670",
];

export default function Home() {
  const [status, setstatus] = useState([]);

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
        setstatus(data);
      });
  }, []);

  return (
    <>
      <NavbarPage />

      <main className='h-full w-full'>
        {/* Start | Banner Welcome*/}
        <div className="bg-gradient-to-b from-slate-700 to-slate-500 text-white flex flex-col sm:h-screen justify-center items-center gap-5 p-2 py-20 ">
          <h1 className="font-bold text-center text-2xl sm:text-5xl">Bienvenue, Welcome.</h1>
          <h3 className="sm:text-2xl text-sm text-center">"C'est cher, mais toujours plus abordable que Balenciaga."</h3>

          {/* Start | Collection Button*/}
          <div className="border-2 w-auto p-2 hover:bg-white hover:cursor-pointer rounded-sm hover:text-slate-600 duration-0 transition hover:duration-700">
            <Link href={"#"}>
              <h3>Collection KnockOff</h3>
            </Link>
          </div>
          {/* End | Collection Button*/}
        </div>
        {/* End | Banner Welcome*/}

        <AnnounceBar />
        {/* Start | Subscribe infos*/}
        <div className="subscribeInfoContainer bg-gray-100 flex flex-col items-center py-8 sm:py-12 mx-auto gap-8">

          <div className="flex gap-2 items-center sm:flex-row sm:gap-2">
            <h1 className="sm:text-3xl text-xl">L'abonnement KnockOff Premier</h1>
            <Image alt="Laurier image abonnement" className="sm:w-10 sm:h-10 w-8 h-8" src={Laurien}></Image>
          </div>

          <div className="bg-white shadow-sm shadow-gray-400 rounded-md w-full sm:w-1/2 p-8 flex flex-col sm:flex-row gap-3">
            <div className="infoContent flex flex-col gap-3">
              <h1 className="font-bold text-xl">Comment ça marche ?</h1>
              <p className='text-sm sm:text-md'>Parce que le client est roi, l'abonnement KnockOff Premier vous supprime les frais de ports et accélère votre temps de livraisons !</p>
              <h1 className="font-bold text-xl">Vous hésitez encore ?</h1>
              <p className='text-sm sm:text-md'>Pour seulement 15,00€ par an, vous bénéficiez d'une livraison illimitée en 24h toute l'année et faites des économies jusqu'à 275€ sur vos commandes.</p>
              <div className="flex flex-col gap-4">
                <Link href="/user/abonnement/">
                  <button className="font-bold text-xl button bg-green-600 w-fit p-3 text-white hover:bg-green-500">
                    S'abonner
                  </button>
                </Link>
                <p className="text-slate-500 text-sm">
                  * Voir les détails et conditions générales <a className="border-b-2 border-black" href="/user/abonnement/">ici</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start | Carousel Element*/}
        <div className="py-6 mx-6">
          <h1 className="font-bold text-3xl">#Collection <span className="text-slate-700">Mankil</span></h1>
          <div className="py-8">
            <Carousel loop>
              {images.map((src, i) => {
                return (
                  <div className="relative h-64 sm:h-96 flex-[0_0_30%]" key={i}>
                    <Image src={src} fill className="" alt="alt" />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
        {/* Start | Carousel Element*/}

        <Footer />
      </main>
    </>
  );
}
