import React, { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../app/globals.css";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Button} from "@nextui-org/react";


//Importer les styles CSS de Font Awesome
import { faAngleDown, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const ArticleUser = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState(null);
  const [categorie, setCategorie] = useState([]);
  const [catSelected, setCatSelected] = useState(null);

  useEffect(() => {
      fetch("http://localhost:4242/display", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              name: search,
              categorie: catSelected
          })
      })
      .then(response => response.json())
      .then(data => {
          setArticles(data);
      })
  }, [search, articles, catSelected]);

  useEffect(() => {
    fetch("http://localhost:4242/displayCategorie")
      .then(response => response.json())
      .then(data => setCategorie(data))
  }, [])

  return (
    <>
      <main>
        <div className="w-full h-full">
          <div className="mx-auto flex items-center justify-center">
            <h1 className="text-4xl">Catalogue</h1>
          </div>

          <div className="">
            <div className="flex justify-between mx-6 py-12 items-center">
              <div className="block">
                <h1 className="text-2xl font-bold">Une liste de tous vos articles préférés</h1>
                <p className="">Recherchez simplement votre article ou amusez vous avec les filtres
                  pour trouver celui qui vous convient.
                </p>
              </div>

              <form className="mr-18">
                <FontAwesomeIcon icon={faSearch} style={{ color: '#00000' }} size="lg" /> <input className="border-b p-2 outline-none border-black" value={search} onChange={event => setSearch(event.target.value)} type="text" placeholder="Recherchez un article" />
              </form>
            </div>

            <div className="flex gap-6 justify-start mx-12 py-4">
              <Dropdown className="bg-black opacity-75 rounded-md p-2 w-28 text-white flex flex-col gap-2">
                <DropdownTrigger className="flex items-center gap-1">
                  <Button variant="bordered">
                    Genre{" "}
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ color: "#00000" }}
                      size="lg"
                    />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    className="hover:cursor-pointer hover:bg-red-600 rounded-sm"
                    key="homme"
                  >
                    Homme
                  </DropdownItem>
                  <DropdownItem
                    className="hover:cursor-pointer hover:bg-red-600 rounded-sm"
                    key="femme"
                  >
                    Femme
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown className="bg-black opacity-75 rounded-md p-2 w-36 text-white flex flex-col gap-2">
                <DropdownTrigger className="flex items-center gap-1">
                  <Button variant="bordered">
                    Type de produit{" "}
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ color: "#00000" }}
                      size="lg"
                    />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions" onAction={(key) => setCatSelected(key)}>
                  {categorie.map((item) => (
                    <DropdownItem className="hover:cursor-pointer hover:bg-red-600 rounded-sm" key={item.name}>{item.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

            </div>
          </div>

              <div className=""> 
                <div className="grid grid-cols-4 gap-6">
                {articles.map(item => (
              <Link
                href={{
                  pathname: "/user/article",
                  query: { id: item._id },
                }}
                key={item._id}
              >
                <div className={`p-2 rounded-md bg-black border-2 w-96 flex justify-center mx-auto flex-col items-center text-center ${item.status === 'Recommandé' ? 'border-green-500' : (item.status === 'Epuisé' ? 'border-red-500' : '')}`}>
                  <img
                    src={item.picture}
                    alt="Vêtements du catalogue"
                    className={`h-96 w-96 hover:opacity-75 ${item.status === 'Epuisé' ? 'grayscale' : ''}`}
                  />
                  <div className={`text-center text-white p-2 ${item.status === 'Recommandé' ? 'text-green-500' : (item.status === 'Epuisé' ? 'text-red-500' : 'text-white')}`}>
                    <h2 className="text-xl">{item.name}</h2>
                    {item.status === "Promo" ? (
                        <div className="flex flex-col">
                        <p className="text-red-600">
                          Promotion de {item.promo} %
                        </p>
                          <p className="text-gray-400 line-through">
                            {item.stocks.xs.price} €
                          </p>
                          <p className="text-white">
                            {item.stocks.xs.price * (1-item.promo / 100)} €
                          </p>
                        </div>
                      ) : (
                        <p className="text-white text-sm">{item.stocks.xs.price} €</p>
                      )}
                      {item.status === "Nouveauté" ? (
                        <p className="text-yellow-400">Nouveauté</p>
                      ) : (
                        null
                      )}
                      {item.stock === 0 || item.status === "Epuisé" ? (
                        <p className="text-red-600">Epuisé</p>
                      ) : (
                        <p className="text-green-600">En stock</p>
                      )}
                  </div>
                </div>
              </Link>
            ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-10">
            <h2 className="text-2xl font-semibold mb-4">Articles Recommandés</h2>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
            >
              {articles
                .filter(item => item.status === 'Recommandé')
                .map(item => (
                  <Link
                    href={{
                      pathname: "/user/article",
                      query: { id: item._id },
                    }}
                    key={item._id}
                  >
                    <div className={`p-2 rounded-md bg-black border-2 w-72 border-green-500`}>
                      <img
                        src={item.picture}
                        alt="Vêtements du catalogue"
                        className={`h-96 w-96 hover:opacity-75`}
                      />
                      <div className={`text-center text-white p-2 text-green-500`}>
                        <h2 className="text-xl">{item.name}</h2>
                        <h2 className={`text-xl text-green-500`}>{item.status}</h2>
                        <p className="text-white text-sm">{item.stocks.xs.price}€</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </Carousel>
            </div>
          </div>
        </main>
        <Footer/>
      </>
    )
}
export default ArticleUser;
