import Link from "next/link";
import "../../app/globals.css";
import React, { useEffect, useState } from "react";

import { faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

const DisplayArticle = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(null);
  const [catSelected, setCatSelected] = useState(null);
  const [size, setSize] = useState(null);
  const [totalStock, settotalStock] = useState(0);
  const [doArticle, setDoArticle] = useState(false)

  const handleTelecharger = async () => {
    fetch("http://localhost:4242/excel", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "excel.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  useEffect(() => {
    fetch("http://localhost:4242/display", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: search,
        categorie: catSelected,
        taille: size,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.length !== 0)
        {
          settotalStock(
            Number(data[0].stocks.xs.stock) + Number(data[0].stocks.s.stock) + Number(data[0].stocks.m.stock) + Number(data[0].stocks.l.stock) + Number(data[0].stocks.xl.stock)
          )
          setArticles(data);
          setDoArticle(true);
        }

      });
  }, [search, catSelected, size]);

  useEffect(() => {
    fetch("http://localhost:4242/displayCategorie")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, [categories]);

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    fetch('http://localhost:4242/userid', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userId
      })
    })
    .then(response => response.json())
    .then(data => {
    const type = localStorage.getItem("type");
    if((userId == null && type == null) || (userId !== null && type == "guest")) {
        window.location.href = "/connexion";
    } else if(data[0].admin == false) {
        window.location.href = "/";
    }
    })
  }
  , [])

  return (
    <div className=" mx-auto h-screen py-38">
      <div className="mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl">Articles | Page Admin</h1>
        <p className="font-bold">Personnalisez / modifier les articles.</p>
      </div>

      <div className="flex flex-col justify-start items-start mt-24 mx-12">
        <div className="flex justify-between items-center w-full">
          <div className="gap-2 flex justify-between items-center">
            <Link
              className="text-xl rounded-md p-2 bg-gradient-to-tl from-orange-600 to-amber-500 text-white
            hover:bg-gradient-to-tl hover:from-orange-600 hover:via-amber-400 hover:to-amber-300"
              href="/admin/create_categorie"
            >
              Créer une catégorie
            </Link>

            <Link
              className="text-xl rounded-md p-2 bg-gradient-to-tl from-orange-600 to-amber-500
           text-white hover:bg-gradient-to-tl hover:from-orange-600 hover:via-amber-400 hover:to-amber-300"
              href="/admin/create_article"
            >
              Créer un article
            </Link>

            <Link
              className="text-xl rounded-md p-2 bg-gradient-to-tl from-orange-600 to-amber-500
           text-white hover:bg-gradient-to-tl hover:from-orange-600 hover:via-amber-400 hover:to-amber-300"
              href="/admin/promotion"
            >
              Gérer les promotions
            </Link>

          </div>
          <div className="gap-2 flex justify-between items-center">
            <button
              onClick={handleTelecharger}
              className="text-xl rounded-md p-2 bg-gradient-to-tl from-green-600 to-green-500 text-white hover:bg-gradient-to-tl hover:from-green-600 hover:via-green-400 hover:to-green-300"
            >
              Télécharger Excel
            </button>
            <Link
              className="text-xl rounded-md p-2 bg-gradient-to-tl from-black to-gray-800 text-white hover:bg-gradient-to-tl hover:from-black hover:via-gray-700 hover:to-gray-600"
              href="/admin/liste_users"
            >
              Liste des utilisateurs →
            </Link>
          </div>
        </div>

        <div className="py-8 flex gap-2 ">
          {categories.map((item) => (
            <div
              className="flex gap-1 justify-between items-center w-auto"
              key={item._id}
            >
              <h2 className="text-xl flex items-center">{item.name}</h2>
              <div>
                <Link
                  href={{
                    pathname: "/admin/update_categorie",
                    query: { id: item._id },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faGear}
                    className="text-black"
                    size="lg"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <br />

        <div></div>
      </div>
        <div className="pb-12">
          <div className="grid grid-cols-4">

      {
        doArticle ? (
              <>
                {
                  articles.map(item => (
                  <div className="" key={item._id}>
                    <div
                      className="p-2 bg-black text-white border-2 w-96 flex justify-center
                        mx-auto flex-col items-center text-center"
                    >
                      <img
                        src={item.picture}
                        alt="Vêtement"
                        width=""
                        className={item.status === "Epuisé" ? "grayscale" : ""}
                      />
      
                      <div className="text-center text-white p-2">
                        <h2 className="text-xl text-white font-semibold mb-2">{item.name}</h2>
                        <p className="text-white text-sm mb-2">Prix : {item.stocks.m.price}€</p>
                        {item.status === "Epuisé" ? (
                          <p className="text-red-600">Victime de son succès</p>
                        ) : (
                          <p className="text-sm mb-2">
                            Description : {item.description}
                          </p>
                        )}
      
                        <p className=" text-sm mb-2">Catégorie : {item.categorie}</p>
                        {item.status !== "Epuisé" && (
                          <p className=" text-sm mb-2">Stock : {totalStock}</p>
                        )}
                        {item.status === "Recommandé" && (
                          <p className="text-green-600 text-sm mb-2">Recommandé</p>
                        )}
                        <p className=" text-sm mb-2">Status : {item.status}</p>
                        <div className="text-red-600">
                          <Link
                            className=""
                            href={{
                              pathname: "/admin/update_article",
                              query: { id: item._id },
                            }}
                          >
                            Modifier
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-red-500 font-bold text-center text-6xl">Vous n'avez pas d'article</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DisplayArticle;
