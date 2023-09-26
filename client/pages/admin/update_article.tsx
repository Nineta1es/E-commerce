import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../app/globals.css";
import Footer from '@/src/components/footer';


import { faSquarePen, faArrowAltCircleRight, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';


const UpdateArticle = () => {
  const router = useRouter();
  const articleId = router.query.id;

  const [showPopup, setShowPopup] = useState(false);

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
  const [picture, setPicture] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("En stock");
  const [promo, setPromo] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4242/" + articleId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: articleId
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setName(data[0].name);
      setDescription(data[0].description);
      setPicture(data[0].picture);
      setSelectedCategory(data[0].categorie);
      setBrand(data[0].brand);
      setStatus(data[0].status);
      setPromo(data[0].promo);
      setComments(data[0].comments)

      setXsStock(data[0].stocks.xs.stock);
      setXsPrice(data[0].stocks.xs.price);
      setSStock(data[0].stocks.s.stock);
      setSPrice(data[0].stocks.s.price);
      setMStock(data[0].stocks.m.stock);
      setMPrice(data[0].stocks.m.price);
      setLStock(data[0].stocks.l.stock);
      setLPrice(data[0].stocks.l.price);
      setXlStock(data[0].stocks.xl.stock);
      setXlPrice(data[0].stocks.xl.price);
    });
  }, [articleId]);

  const handleEdit = () => {
    fetch(`http://localhost:4242/update/${articleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: description,
        picture: picture,
        categorie: selectedCategory,
        brand: brand,
        status: status,
        promo: promo,
        stocks: {
          "xs": {stock: xsStock, price: xsPrice},
          "s": {stock: sStock, price: sPrice},
          "m": {stock: mStock, price: mPrice},
          "l": {stock: lStock, price: lPrice},
          "xl": {stock: xlStock, price: xlPrice},
        },
        comments: comments
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    window.location.href = "/admin";
  };

  const Delete = () => {
    fetch(`http://localhost:4242/delete/${articleId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
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
    <>
    <main className="h-screen w-full">

      <div className="title flex items-center justify-center gap-3 pb-4">
        <h1 className="text-4xl">Modification de l'article</h1>
        <FontAwesomeIcon icon={faSquarePen} style={{ color: '#00000' }} size="2xl" />
      </div>

      <div className="flex flex-col items-center justify-center mx-auto">
        <div className="containerForm">
          <form className="flex flex-col gap-5 bg-black rounded-md p-8">
            <div className="flex gap-2 items-center">
              <label className="text-white" htmlFor="name">Nom :</label>
              <input
                className="rounded-xl p-2"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                name="name"
                placeholder="nom"
                required
              />
            </div>

            <div className="flex gap-2 items-center ">
              <label className="text-white" htmlFor="description">Description :</label>
              <input
                className="rounded-xl p-2"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                name="description"
                placeholder="description"
                required
              />
            </div>

            <div className="flex gap-2 items-center ">
              <label className="text-white" htmlFor="picture">Image :</label>
              <input
                className="rounded-xl p-2"
                type="text"
                value={picture}
                onChange={(event) => setPicture(event.target.value)}
                name="picture"
                placeholder="photo"
                required
              />
            </div>
            
            <div className="flex gap-2 items-center ">
              <label className="text-white" htmlFor="brand">Marques :</label>
              <input
                className="rounded-xl p-2"
                type="text"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                name="brand"
                placeholder="marque"
                required
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              name="categorie"
              required
              className="rounded-md p-2 w-auto"
            >
              <option value="categorie">Choisir une catégorie</option>
              {categories.map((item) => (
                <option 
                  key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              name="status"
              className="rounded-md p-2"
              required

            >
              <option value="En stock">En stock</option>
              <option value="Epuisé">Epuisé</option>
              <option value="Promo">Promo</option>
              <option value="Limité">Limité</option>
              <option value="Recommandé">Recommandé</option>
              <option value="Nouveauté">Nouveauté</option>

            </select>
            {status === "Promo" && (
              <div className="flex gap-2 items-center ">
              <label className="text-white" htmlFor="promo">Promo :</label>
              <input
                className="rounded-xl p-2"
                type="number"
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
                name="promo"
                placeholder="promo"
                min="0"
                max="100"
                required
              />
            </div>
            )}

            <button className="text-white" type="button" onClick={() => setShowPopup(true)}>Gérer les stocks</button>

              <button className="text-white" type="button" onClick={handleEdit}> Modifier </button>
              <button className="text-white" onClick={Delete}>Supprimer</button>
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
          <div className="flex gap-1 py-4 text-xl items-center">
              <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ color: '#00000' }} size="md" />
                Accéder à la page admin
          </div>
        </Link>
      </div>
    </main>
    <Footer />
    </>

  );
  
};

export default UpdateArticle;