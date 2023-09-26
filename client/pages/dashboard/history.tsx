import React, { useEffect, useState } from 'react';
import "app/globals.css";
import Navbar from "@/src/components/navbar";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const Dashboard: React.FC = () => {

  const [history, setHistory] = useState([]);

  const styles = StyleSheet.create({
    page: {
      padding: 5,
      fontSize: 10
    },
    title: {
      padding: 30,
      fontSize: 30,
      fontWeight: "bold"
    },
    border: {
      borderTop: '2px solid red'
    },
    tableTitle: {
      display: "flex",
      justifyContent: "center",
      color: "blue"
    },
    promo: {
      textDecoration: "line-through",
      color: "grey"
    }
  });

  const PDF = (item: Object) => {
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>Knock Off</Text>
            <Text>Facture pour la commande n°{item._id}</Text>
            <Text>Date de facturation : le {item.date} à {item.hour}</Text>
          </View>
          <View>
            <View style={styles.tableTitle}>
              <Text>Nom de l'article</Text>
              <Text>Taille</Text>
              <Text>Catégorie</Text>
              <Text>Quantité</Text>
              <Text>Prix</Text>
            </View>
            {item.cart.map((value) => (
              <View style={styles.tableTitle}>
                <Text>{value.article.name}</Text>
                <Text>{value.size}</Text>
                <Text>{value.article.categorie}</Text>
                <Text>{value.quantity}</Text>
                {
                  value.article.status == "Promo" ? (
                    <View>
                      <Text style={styles.promo}> {value.article.stocks[value.size].price} €</Text>
                      <Text> {value.article.stocks[value.size].price * (1 - value.article.promo / 100)} €</Text>
                    </View>
                  ) : (
                    <Text>{value.article.stocks[value.size].price} €</Text>
                  )
                }
              </View>
            ))}
          </View>
          <View>
            <View>
              <Text>Total : </Text>
              <Text> {item.totalPrice} €</Text>
            </View>
            <View>
              <Text>Quantité : </Text>
              <Text> {item.totalQuantity} </Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  }

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
    .then(data => {
      setHistory(data)
      fetch("http://localhost:4242/" + data.pro, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: userId,
        })
      })
    })
  }, [])

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
          <h1 className="text-2xl font-semibold mb-6">Historique de commandes</h1>
        <ul>
          {
            history.map(item => (
              <li className="border-t py-4 hover:bg-gray-100 transition duration-300">
                <p className="text-gray-600 text-lg">Commande #{item._id}</p>
                <p className="text-gray-400 text-lg">Date : {item.date}</p>
                <p className="text-gray-400 text-lg">Total : {item.totalPrice}€</p>
                <p className="text-gray-400 text-lg">Status de la commande : {item.status}</p>
                <div className='flex justify-between'>
                {
                  item.cart.map((value: string | undefined) => (
                    <div className='w-1/3'>
                      <img src={value.article.picture} alt="Article 1" className="max-w-xs my-2" />
                      <p className='text-center font-bold'>{value.article.name}</p>
                      <p className='text-center'><span className='underline'>Quantité :</span> x{value.quantity}</p>
                      <p className='text-center'><span className='underline'>Taille :</span> {value.size}</p>
                      {/* {value.article.status === "Promo" ? (
                        <div className="w-1/5 text-center">
                          <p className="text-gray-600 line-through">
                            {value.article.stocks[value.size].price} €
                          </p>
                          <p className="text-red-600">{value.article.stocks[value.size].price * (1-value.article.promo / 100)} €</p>
                        </div>
                      ) : (
                        <p className="w-1/5 text-center">{value.article.stocks[value.size].price} €</p>
                      )} */}
                    </div>
                    ))
                  }
                </div>
                <div className='flex justify-end'>
                  <PDFDownloadLink document={PDF(item)} fileName={"facture_"+ item._id +".pdf"} className='bg-black text-white p-2 rounded-lg'>
                    Télécharger ma facture
                  </PDFDownloadLink>
                </div>
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



