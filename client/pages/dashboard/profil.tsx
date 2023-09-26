import React, { useEffect, useState } from 'react';
import "app/globals.css";
import Navbar from "@/src/components/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardInfo, setCardInfo] = useState({});
  const [adress, setAdress] = useState([]);
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    if((userId == null && type == null) || (userId !== null && type == "guest")) {
        window.location.href = "/connexion";
    }
    if(userId)
    {
      fetch('http://localhost:4242/userid', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId
        })
      })
      .then(response => response.json())
      .then(data => {
        setMail(data[0].mail);
        setUsername(data[0].name);
        setBirthdate(data[0].birthdate)
        setCardInfo(data[0].creditalcard);
        setAdress(data[0].adress)
      })
    }
  }, [])

  const changeInfo = () => {
    const userId = localStorage.getItem("_id");
    if(userId)
    {
      fetch("http://localhost:4242/updateUser/" + userId, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
          mail: mail,
          password: password,
          birthdate: birthdate,
          cardInfo: cardInfo,
          adress: adress,
        })
      })
      .then(response => response.json())
      .then(data => toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }))
    }
  }

  const deleteCardInfo = () => {
    setCardInfo({
      cardnumber: "",
      expiration: "",
      owner: "",
      cvv: ""
    });
    toast.success("Données bancaires supprimées, n'oubliez pas de valider les changements pour que les changements se prennent en compte.", {theme: "colored"});
  }

  const deleteAdresses = () => {
    setAdress([]);
    toast.success("Adresses supprimées, n'oubliez pas de valider les changements pour que les changements se prennent en compte.", {theme: "colored"})
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer/>
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
        <section className="md:col-span-3 bg-white p-6" id="profile">
          <h1 className="text-2xl font-semibold mb-6">Profil</h1>
          <h2 className='text-xl font-semibold mb-2'>Modifier ses informations</h2>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Adresse mail
            </label>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Dâte de naissance
            </label>
            <input
              required
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full"
            />
          </div>
          <hr/>
          <h2 className='text-xl font-semibold'>Supprimer les données enregistrées</h2>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mt-5 mb-2">
              Numéro de carte
            </label>
            <p className='italic'>Par mesure de sécurité, nous cachons vos données bancaires mais vous pouvez supprimer vos données</p>
            <button className='border border-red-600 bg-red-500 hover:bg-red-600 rounded-lg p-1 font-bold' onClick={deleteCardInfo}>Supprimer vos données bancaires</button>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mt-5 mb-2">
              Liste d'adresses
            </label>
            <p className='italic'>Vous pouvez supprimer votre liste d'adresses</p>
            <button className='border border-red-600 bg-red-500 hover:bg-red-600 rounded-lg p-1 font-bold' onClick={deleteAdresses}>Supprimer la liste d'adresses</button>
          </div>
          <div className='flex justify-end'>
            <button className='rounded-lg p-2 bg-green-600 text-white' onClick={() => changeInfo()}>Valider les changements</button>
          </div>
        </section>
      </div>
    </main>
    </div>
  );
};

export default Dashboard;