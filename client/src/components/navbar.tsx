import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, animateScroll as scroll } from "react-scroll";

// Importer les styles CSS de Font Awesome
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  user,
} from "@nextui-org/react";
import { set } from "mongoose";

interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "Catalogue",
  //   page: "all products",
  // },
  // {
  //   label: "Recherche",
  //   page: "search",
  // },
  // {
  //   label: "Compte",
  //   page: "account",
  // },
  // {
  //   label: "Panier",
  //   page: "cart",
  // },
];

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [localStorageType, setLocalStorageType] = useState("guest");
  const [localStorageId, setLocalStorageId] = useState(null);

  const Disconnect = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("type");
  }

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    const type = localStorage.getItem("type");
    if(userId !== null && type == null) {
      setLocalStorageType("user");
    }
    if (userId !== null) {
      fetch("http://localhost:4242/shopping/display", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.cart.length == 0)
          {
            setEmpty(true)
          }
          else
          {
            setEmpty(false);
            setCart(data.cart);
          }
        });
    }
  }, [cart]);

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if (userId !== null) {
      fetch("http://localhost:4242/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRole(data[0].admin);
        });
    }
  }, []);



  return (
    <header className={`w-full mx-auto px-4`}>
      <div className="justify-between md:items-center md:flex">
        <div className="flex items-center justify-between py-3">
          <div className="md:py-5 md:block">
            <h2 className="text-2xl font-bold">
              <a href="/">Knock</a>
            </h2>
            <h2 className="text-2xl font-bold text-center bg-red-600 text-white">
              <a href="/">Off</a>
            </h2>
          </div>
          <div className="md:hidden">
            <button onClick={() => setNavbar(!navbar)}>
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 hover:cursor-pointer text-sm sm:text-lg">
              <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                <a href="/user/">Catalogue</a>
              </h2>

              {localStorageType === "user" ? (
              <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                <a href="/dashboard">Compte</a>
              </h2>
              ) : null}
              {localStorageType === "user" ? (
                <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                  <button onClick={Disconnect}>Déconnexion</button>
                </h2> 
              ) : null}         
              {role === true ? (
                <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                  <a href="/admin">Admin</a>
                </h2>
              ) : null}

              {localStorageType === "guest" ? (
                <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                  <a href="/connexion">Connexion</a>
                </h2>
              ) : null}
              {localStorageType === "guest" ? (
                <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300">
                  <a href="/inscription">Inscription</a>
                </h2>
              ) : null}
              <Dropdown className="bg-black opacity-75 rounded-md p-2 w-52 text-white flex flex-col">
                <DropdownTrigger className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300 flex items-center gap-2">
                  <Button variant="bordered">
                  Panier{" "}
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      style={{ color: "#00000" }}
                      size="lg"
                    />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions">
                  {
                    empty ? (
                      <DropdownItem>Votre panier est vide, allez voir nos articles pas cher.</DropdownItem>
                    ) : (
                      <DropdownSection>
                        {cart.map((item) => (
                          <DropdownItem
                            className="hover:cursor-pointer hover:bg-red-600 rounded-sm"
                            key={item.article.name}
                          >
                            <a href={"/user/article?id=" + item.article._id}>
                              <div className="flex flex-col w-fit py-2">
                                <div className="w-fit flex flex-row gap-2 items-center text-sm">
                                  <p>{item.article.name}</p>
                                  <img
                                    className="rounded-xl w-24"
                                    src={item.article.picture}
                                  />
                                </div>
                                <div>
                                  {item.article.status === "Promo" ? (
                                    <p className="text-red-600">
                                      Prix :{" "}
                                      {Number(item.article.stocks[item.size].price) * (1-item.article.promo / 100)}
                                      €
                                    </p>
                                  ) : (
                                    <p>Prix : {item.article.stocks[item.size].price}€</p>
                                  )}
                                  
                                  <p className=""> Quantité : X {item.quantity}</p>
                                </div>
                              </div>
                            </a>
                          </DropdownItem>
                        ))}
                        <DropdownItem className="hover:cursor-pointer hover:bg-red-600 rounded-sm text-right">
                          <a href="/panier">Accéder au panier</a>
                        </DropdownItem>
                      </DropdownSection>
                    )
                  }
                </DropdownMenu>
              </Dropdown>

              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  to={item.page}
                  smooth={true}
                  duration={500}
                  className="block lg:inline-block hover:text-neutral-500"
                  onClick={() => setNavbar(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
