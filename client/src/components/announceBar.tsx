import React, { useState } from "react";
import "@/app/globals.css";
import Footer from "@/src/components/footer";
import Image from 'next/image';

import Laurien from "@/src/assets/laurier.png"

import { faCircleUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function AnnounceBar(){
    return(
        <main className="h-full w-full bg-black">
            <div className="mainContainerAnnounce flex justify-center p-5">
                <div className="announce text-white flex">
                    <h1 className="text-center text-sm sm:text-xl"><FontAwesomeIcon icon={faStar} style={{color: '#00000'}}  size="lg"/> Testez l'abonnement Premier et découvrez les avantages en vous abonnants ! <a className="border-b-2" href="/user/abonnement/"> voir ici</a></h1>
                </div>
            </div>
        </main>
    )
}