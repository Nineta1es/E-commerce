import React, { useEffect, useState } from "react";
import Link from "next/link";

import "../../app/globals.css";

import { faArrowAltCircleRight, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';


const CreateArticle = () => {
  const [xsStock, setXsStock] = useState("");
  const [xsPrice, setXsPrice] = useState("");
  const [sStock, setSStock] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [mStock, setMStock] = useState("");
  const [mPrice, setMPrice] = useState("");
  const [lStock, setLStock] = useState("");
  const [lPrice, setLPrice] = useState("");
  const [xlStock, setXlStock] = useState("");
  const [xlPrice, setXlPrice] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("https://www.rdeeipe.net/wp-content/uploads/2010/12/aucune-photo.jpg");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("En stock");

  const [showPopup, setShowPopup] = useState(false);
  const [promo, setPromo] = useState(0);

  const handleCreate = (event) => {
    event.preventDefault();
    fetch("http://localhost:4242/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: description,
        picture: picture,
        price: price,
        categorie: selectedCategory,
        brand: brand,
        // size: size,
        // stock: stock,
        status: status,
        stocks: {
          "xs": {stock: xsStock, price: xsPrice},
          "s": {stock: sStock, price: sPrice},
          "m": {stock: mStock, price: mPrice},
          "l": {stock: lStock, price: lPrice},
          "xl": {stock: xlStock, price: xlPrice},
        },
        promo: promo,
      }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    window.location.href = "/admin";
  };

  useEffect(() => {
    fetch("http://localhost:4242/displayCategorie")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        });
  }, []);

  return (
      <div className="gap-8 mx-auto h-screen flex flex-col items-center justify-center text-center">
        <FontAwesomeIcon icon={faTags} style={{ color: '#00000' }} size="2xl" />
      <h1 className="text-4xl">Créer un article</h1>
      <div className="w-1/4">
        <form onSubmit={handleCreate}>
          <div className="flex flex-col gap-4">
            <input className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
              placeholder="nom"
              required
            />
            
            <input className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              placeholder="description"
              required
            />
            <input className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={picture}
              onChange={(event) => setPicture(event.target.value)}
              name="picture"
              placeholder="image"
              required
            />
            
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              name="categorie"
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              name="brand"
              placeholder="marque"
              required
            />

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              name="status"
              required
            >
              <option value="En stock">En stock</option>
              <option value="Epuisé">Epuisé</option>
              <option value="Promo">Promo</option>
              <option value="Limité">Limité</option>
              <option value="Recommandé">Recommandé</option>
            </select>

              <button type="button" onClick={() => setShowPopup(true)}>Gérer les stocks</button>

            {status === "Promo" && (
              <input className="border-b-2 p-2 border-black outline-none"
                type="number"
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
                name="promo"
                placeholder="promo"
                min="0"
                max="100"
                required
              />
            )}

            <button className="p-2 bg-black text-white hover:opacity-90" type="submit">
              Créer
            </button>
            
          </div>
        </form>
      </div>

        {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <div>
              <h1 className="text-center text-2xl font-bold">Gérer les stocks.</h1>
            </div>
            <div className="flex justify-center m-2">
              <p className="font-bold m-2">Taille : </p><input className="w-10 rounded-lg text-center border border-black" type="text" value="xs" disabled /><p className="flex items-center text-lg m-2">Prix : </p><input type="number" placeholder="Entrez votre prix" value={xsPrice} onChange={(event) => setXsPrice(event.target.value)}/><p className="flex items-center text-lg m-2">Stock : </p><input type="number" placeholder="Entrez votre stock" value={xsStock} onChange={(event) => setXsStock(event.target.value)}/>
            </div>
            <hr/>
            <div className="flex justify-center m-2">
              <p className="font-bold m-2">Taille : </p><input className="w-10 rounded-lg text-center border border-black" type="text" value="s" disabled /><p className="flex items-center text-lg m-2">Prix : </p><input type="number" placeholder="Entrez votre prix" value={sPrice} onChange={(event) => setSPrice(event.target.value)}/><p className="flex items-center text-lg m-2">Stock : </p><input type="number" placeholder="Entrez votre stock" value={sStock} onChange={(event) => setSStock(event.target.value)}/>
            </div>
            <hr/>
            <div className="flex justify-center m-2">
              <p className="font-bold m-2">Taille : </p><input className="w-10 rounded-lg text-center border border-black" type="text" value="m" disabled /><p className="flex items-center text-lg m-2">Prix : </p><input type="number" placeholder="Entrez votre prix" value={mPrice} onChange={(event) => setMPrice(event.target.value)}/><p className="flex items-center text-lg m-2">Stock : </p><input type="number" placeholder="Entrez votre stock" value={mStock} onChange={(event) => setMStock(event.target.value)}/>
            </div>
            <hr/>
            <div className="flex justify-center m-2">
              <p className="font-bold m-2">Taille : </p><input className="w-10 rounded-lg text-center border border-black" type="text" value="l" disabled /><p className="flex items-center text-lg m-2">Prix : </p><input type="number" placeholder="Entrez votre prix" value={lPrice} onChange={(event) => setLPrice(event.target.value)}/><p className="flex items-center text-lg m-2">Stock : </p><input type="number" placeholder="Entrez votre stock" value={lStock} onChange={(event) => setLStock(event.target.value)}/>
            </div>
            <hr/>
            <div className="flex justify-center m-2">
              <p className="font-bold m-2">Taille : </p><input className="w-10 rounded-lg text-center border border-black" type="text" value="xl" disabled /><p className="flex items-center text-lg m-2">Prix : </p><input type="number" placeholder="Entrez votre prix" value={xlPrice} onChange={(event) => setXlPrice(event.target.value)}/><p className="flex items-center text-lg m-2">Stock : </p><input type="number" placeholder="Entrez votre stock" value={xlStock} onChange={(event) => setXlStock(event.target.value)}/>
            </div>
            <hr/>
            <div className="flex justify-between p-4">
              <button className="text-white bg-black p-2 rounded-lg" onClick={() => setShowPopup(false)}>Valider les valeurs</button>
            </div>
          </div>
        </div>
      )}

        <Link className="" href="/admin">
          <div className="flex gap-6">
            <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ color: '#00000' }} size="xl" />
            Accéder à la page admin
          </div>
        </Link>
      </div>
  );
};

export default CreateArticle;