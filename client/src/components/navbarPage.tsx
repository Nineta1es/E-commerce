import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, animateScroll as scroll } from 'react-scroll';

// Importer les styles CSS de Font Awesome
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';


import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem, Button} from "@nextui-org/react";

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

const NavbarPage = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [navbar, setNavbar] = useState(false);
  const [cart, setCart] = useState([])
  const [role, setRole] = useState(false)
  

  const scrollToTop = () => {
    scroll.scrollToTop();
    setNavbar(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if(userId !== null)
    {
      fetch("http://localhost:4242/shopping/display", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId
        })
      })
      .then(response => response.json())
      .then(data => {setCart(data.cart)})
    }
  })

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
  });

  return (
    <header className={`w-full mx-auto fixed top-0 text-white z-50 px-4`}>
      <div className="justify-between md:items-center md:flex">

        <div className="flex items-center justify-between py-3">
          <div className="md:py-5 md:block w-fit">
            <h2 className="text-xl sm:text-2xl font-bold"><a href="/">Knock</a></h2>
            <h2 className="text-xl sm:text-2xl font-bold text-center bg-red-600 text-white"><a href="/">Off</a></h2>

          </div>
          <div className="md:hidden">
            <button onClick={() => setNavbar(!navbar)}>
              {navbar ? <IoMdClose size={30}/> : <IoMdMenu size={30}/>}
            </button>
          </div>
        </div>
        <div>
          <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}>
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 hover:cursor-pointer text-sm sm:text-lg">

              <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300"><a href="/user/">Catalogue</a></h2>
              <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300"><a href="/connexion">Compte</a></h2>
              {role === true ? <h2 className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300"><a href="/admin">Admin</a></h2> : null}
              <Dropdown className="bg-black opacity-75 rounded-md p-2 w-52 text-white flex flex-col">
                <DropdownTrigger className="text-xl hover:text-slate-600 duration-0 transition hover:duration-300 flex items-center gap-2">
                    <Button 
                    variant="bordered">Panier <a href="/panier"><FontAwesomeIcon icon={faBagShopping} style={{color: '#00000'}}  size="lg"/></a></Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Static Actions">
                  {
                    cart.map((item) => (
                      <DropdownItem className="hover:cursor-pointer hover:bg-red-600 rounded-sm" key={item.article.name}>
                        <Link ref={{pathname: "/user/article", query: {id: item.article._id}}}>
                        <div className="flex flex-col w-fit py-2">
                          <div className="w-fit flex flex-row gap-2 items-center text-sm">
                            <p>{item.article.name}</p>
                            <img className="rounded-xl w-24" src={item.article.picture} />
                          </div>
                          <div>
                            <p>Prix : {item.article.price}€</p>
                            <p className=""> Quantité : X {item.quantity}</p>
                          </div>
                        </div>
                      </Link>
                      </DropdownItem> 
                    ))
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

export default NavbarPage;