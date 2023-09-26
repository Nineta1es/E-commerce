

import React, { useState } from 'react';
import "app/globals.css";
import Navbar from "@/src/components/navbar";

const InformationStep: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Renseignements</h2>
        <form onSubmit={handleNext}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-2">Nom et Prénom</label>
              <input type="text" name="full-name" id="full-name" placeholder="John Doe" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Adresse Postale</label>
              <input type="text" name="address" id="address" placeholder="Numéro, Rue" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
              <input type="text" name="city" id="city" placeholder="Ville" className="w-full mt-2 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
              <input type="text" name="region" id="region" placeholder="Région" className="w-full mt-2 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
              <input type="text" name="country" id="country" placeholder="Pays" className="w-full mt-2 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Suivant</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentStep: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Information de Paiement</h2>
        <form>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Numéro de Carte</label>
              <input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Date D'expiration</label>
              <input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Titulaire De Carte</label>
              <input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg focus:outline-none">Payer</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const PaymentPage: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <InformationStep onNextStep={handleNextStep} />}
      {step === 2 && <PaymentStep />}
    </>
  );
};

export default PaymentPage;