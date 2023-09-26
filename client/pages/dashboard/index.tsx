import React, { useEffect, useState } from 'react';
import "app/globals.css";
import Navbar from "@/src/components/navbar";

const Dashboard: React.FC = () => {

  const [history, setHistory] = useState([]);
  const [usersub, setUsersub] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    if((userId == null && type == null) || (userId !== null && type == "guest")) {
        window.location.href = "/connexion";
    }
    fetch("http://localhost:4242/displayHistory", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userid: userId,
      })
  })
  .then(response => response.json())
  .then(data => setHistory(data))
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem("_id");

    fetch('http://localhost:4242/userid', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userId
      })
    })
    .then(response => response.json())
    .then(data => {
      setUsersub(data[0].subscribe[0]);
    })
  }
  , [])


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="md:col-span-1 bg-white border-r p-6">
            <nav>
              <ul>
                <li className="mb-4">
                  <a href="/dashboard" className="text-gray-600 hover:text-gray-800 text-lg transition duration-300">
                    Tableau de bord
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/dashboard/profil" className="text-gray-600 hover:text-gray-800 text-lg transition duration-300">
                    Profil
                  </a>
                </li>
                <li className="mb-4">
                  <a href="http://localhost:3000/user/abonnement" className="text-gray-600 hover:text-gray-800 text-lg transition duration-300">
                    Abonnement
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/dashboard/history" className="text-gray-600 hover:text-gray-800 text-lg transition duration-300">
                    Historique de commandes
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <section className="md:col-span-3 bg-white p-6">
            <h1 className="text-2xl font-semibold mb-6">Abonnement</h1>
            <div className="bg-gray-200 p-6 rounded-lg mb-6">
              {usersub.status == true ? (
                <p className="text-lg">Status : Actif</p>
              ) : (
                <p className="text-lg">Status : Inactif</p>
              )}
              {usersub.startDate == null ? (
                <p className="text-lg">Début de l'abonnement : Non défini</p>
              ) : (
                <p className="text-lg">Début de l'abonnement : {usersub.startDate}</p>
              )}
              {usersub.endDate == null ? (
                <p className="text-lg">Fin de l'abonnement : Non défini</p>
              ) : (
                <p className="text-lg">Fin de l'abonnement : {usersub.endDate}</p>
              )}
            </div>
            <h1 className="text-2xl font-semibold mb-6">Historique de commandes</h1>
            <ul>
              {
                history.map(item => (
                  <li className="border-t py-4 hover:bg-gray-100 transition duration-300">
                    <p className="text-gray-600 text-lg">Commande #{item._id}</p>
                    <p className="text-gray-400 text-lg">Date : {item.date}</p>
                    <p className="text-gray-400 text-lg">Total : {item.totalPrice}€</p>
                  </li>              
                ))
              }
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
