import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "../../app/globals.css";
import Footer from "@/src/components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Importer les styles CSS de Font Awesome
import { faCreditCard, faDolly, faDollyBox, faLocationDot, faPercent, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [method, setMethod] = useState("First");
  const [transport, setTransport] = useState(0);
  const [status, setStatus] = useState(false);
  const [rememberPaymentInfo, setRememberPaymentInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [shipAdress, setShipAdress] = useState("");
  const [details, setDetails] = useState([]);

  const [popupConnect, setPopupConnect] = useState(false);
  const [mailConnect, setMailConnect] = useState("");
  const [passwordConnect, setPasswordConnect] = useState("");
  
  const [total, setTotal] = useState(0);
  const [totalWithPromo, setTotalWithPromo] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [cvv, setCVV] = useState("");
  const [totalPromo, setTotalPromo] = useState(0)
  const [isPromo, setIsPromo] = useState(false)
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [shipAddress, setShipAddress] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [expiration, setExpiration] = useState("");
  const [shipName, setShipName] = useState("")

  useEffect(() => {

    const current = new Date();
    const month = `${current.getFullYear()}-0${current.getMonth()+1}`;
    setExpiration(month)

    const userId = localStorage.getItem("_id");
    if (userId) {
      fetch("http://localhost:4242/abonnement/display", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStatus(data.status)
      })

      fetch("http://localhost:4242/shopping/display", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.cart.length === 0)
          {
            setIsEmpty(true)
          }
          setQuantity(data.quantity_shopcart);
          setDetails(data.cart);
          setTotal(data.total);
      });

      fetch("http://localhost:4242/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCart(data[0].cart);
          setCardNumber(data[0].creditalcard.cardnumber);
        });
    }
  }, []);

  useEffect(() => {

    fetch("http://localhost:4242/displayPromotion", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
      if(data.result.startDate != null)
      {
        setIsPromo(true);
        setTotalPromo(data.result.percent);
        setTotalWithPromo(total * (1 - totalPromo / 100))
      }
      else
      {
        setTotalWithPromo(total)
      }
      shipment(status, totalWithPromo)
    })
  }, [method, total, status, totalWithPromo, finalPrice]);

  const shipment = (status: boolean, price: Number) => {
    if (status === false) 
    {
      fetch("http://localhost:4242/shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: quantity,
          method: method,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTransport(data.shipment.rate);
          setFinalPrice(Number(price) + Number(data.shipment.rate));
        });
    } 
    else 
    {
      setFinalPrice(Number(totalWithPromo));
    }
  }

  const handleDelete = (id: number) => {
    fetch("http://localhost:4242/shopping/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productid: id,
        userid: localStorage.getItem("_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
        setTotal(data.total);
        window.location.reload();
      });
  };

  const handleRemoveOne = (id: number) => {
    fetch("http://localhost:4242/shopping/removeOne", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productid: id,
        userid: localStorage.getItem("_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
        setTotal(data.total);
        window.location.reload();
      });
  };  

  const handleCheckout = () => {
    const type = localStorage.getItem("type");
    const userId = localStorage.getItem("_id");
  
    if (userId && type && total > 100) {
      toast.error("Vous devez être connecté pour effectuer un achat supérieur à 100 €", { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
      return;
    }
  
    if (type) 
    {
      setShowPopup(true);
    } 
    else 
    {
      savePaymentInfo();
      toast.success("Vous avez payé", {position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
  
      fetch("http://localhost:4242/addHistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: localStorage.getItem("_id"),
          cart: details,
          quantity: quantity,
          totalPrice: finalPrice,
          totalPromo: totalPromo
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    }
  };

  const handleLogin = () => {
    setPopupConnect(true);
  };

  const connect = () => {
    fetch("http://localhost:4242/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: mailConnect,
          password: passwordConnect
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success == true)
          {
            var iduser = data.userId;
            fetch("http://localhost:4242/transfert", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                iduser: iduser,
                cart: cart
              }),
            })
            .then(res => res.json())
            .then(info => {
              localStorage.removeItem("type");
              localStorage.removeItem("_id");
              localStorage.setItem("_id", iduser);
              toast.success(info.message, {theme: "colored"})
              window.location.reload();
            })
          }
          else
          {
            toast.error(data.message, {theme: "colored"})
          }
        });
  }

  const handleRegister = () => {
    router.push("/inscription");
  };

  const savePaymentInfo = () => {
    const userId = localStorage.getItem("_id");
    if (userId) {
      const paymentInfo = {
        userId,
        cardNumber,
        address,
        remember: rememberPaymentInfo,
        cardOwner: cardOwner,
        cvv: cvv,
        expiration: expiration,
        shipAdress: shipAdress,
        shipName: shipName,
      };
    
      fetch("http://localhost:4242/save_payment_info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          paymentInfo
        ),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment info saved:", data);
        })
        .catch((error) => {
          console.error("Error saving payment info:", error);
        });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if(userId)
    {
      fetch("http://localhost:4242/getAdresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          shipAddress: shipAddress
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setShipName(data.data.name);
          setShipAdress(data.data.adress);
          setAddress(data.data.zipcode);
        })
    }
  }, [shipAddress])

  const guestPay = () => {
    setShowPopup(false);
    toast.success("Vous avez payé", {position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
  
    fetch("http://localhost:4242/addHistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: localStorage.getItem("_id"),
        cart: details,
        quantity: quantity,
        totalPrice: finalPrice,
        totalPromo: totalPromo
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if (userId) {
      fetch("http://localhost:4242/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        setCardNumber(data[0].creditalcard.cardNumber);
        setCardOwner(data[0].creditalcard.owner);
        setCVV(data[0].creditalcard.cvv);
        setExpiration(data[0].creditalcard.expiration);
        setSavedAddresses(data[0].adress)

      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);   
    
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Mon Panier</h1>

        {/* Display Cart Items */}
        <div className="flex border-b pb-2 mb-2">
          <div className="w-2/5">Articles</div>
          <div className="w-1/5 text-center">Prix</div>
          <div className="w-1/5 text-center">Quantité</div>
        </div>
        {
          isEmpty ? (
            <p className="font-semibold text-center text-red-500">Panier vide !</p>
          ) : (
            <div>
              {details.map((item, index) => (
                <div className="flex items-center border-b py-2" key={index}>
                  <div className="w-2/5 flex items-center">
                    <Link href={"/user/article?id=" + item.article._id}>
                      <img
                        src={item.article.picture}
                        alt="article picture"
                        className="w-16 h-auto border mr-4"
                      />
                    </Link>
                    <div>
                      <h2 className="font-semibold mb-1">{item.article.name}</h2>
                      <p className="text-gray-600">{item.article.brand}</p>
                      <p className="text-gray-600">id produit : {item.article._id}</p>
                      <p className="text-gray-600">Taille du produit : {item.size}</p>
                    </div>
                  </div>
                  {item.article.status === "Promo" ? (
                    <div className="w-1/5 text-center">
                      <p className="text-gray-600 line-through">
                        {item.article.stocks[item.size].price} €
                      </p>
                      <p className="text-red-600">{item.article.stocks[item.size].price * (1-item.article.promo / 100)} €</p>
                    </div>
                  ) : (
                    <p className="w-1/5 text-center">{item.article.stocks[item.size].price} €</p>
                  )}
                  <p className="w-1/5 text-center">{item.quantity}</p>
                  <div className="w-1/5 text-center">
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleDelete(item.article._id)}
                    >
                      Retirer
                    </button>
                    <br />
                    <button
                      className="text-red-600 underline"
                      onClick={() => handleRemoveOne(item.article._id)}
                    >
                      Retirer 1
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        {/* Cart Summary */}
        <div className="mt-4">
          <div className="flex justify-between border-t py-2">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">{quantity}</div>
            <div className="font-semibold">{total} €</div>
          </div>
          
          {isPromo ? (
            <>
              <div className="flex justify-between border-t py-2">
                <div className="font-semibold">Promotion - <span className="text-red-400">{totalPromo}%</span></div>
                <div className="font-semibold text-gray-600 line-through">{total} €</div>
              </div>
              <div className="flex justify-end py-2">
                <div className="font-semibold">{totalWithPromo} €</div>
              </div>
            </>
          ) : (
            <>
            </>
          )}

          {
            status ? (
              <>
                <div className="flex justify-between border-t py-2">
                  <div className="text-green-500 font-semibold">Abonnement activé</div>
                </div>
                <div className="flex justify-between py-4">
                  <div className="font-semibold">Frais de port</div>
                  <div className="font-semibold text-red-500">0 €</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between border-t py-2">
                  <div className="text-red-500 font-semibold">Aucun abonnement</div>
                </div>
                <div className="flex justify-between py-4">
                  <div className="font-semibold">Frais de port</div>
                  <div className="font-semibold text-red-500">+ {transport} €</div>
                </div>
              </>
            )
          }


          <div className="flex justify-between border-t py-4">
            <div className="font-semibold">Total après frais de port</div>
            <div className="font-semibold">{finalPrice} €</div>
          </div>
          

          <div className="mt-4">
            <div className="flex items-center gap-2 pb-4">
              <FontAwesomeIcon icon={faTruck} style={{color: '#00000'}} size="md"/>
              <p>Méthode d'envoi :</p>
            </div>

            <select
              className="border p-1 w-full"
              onChange={(event) => setMethod(event.target.value)}
              >
              <option value="First">First</option>
              <option value="ParcelSelect">Parcel Select</option>
              <option value="GroundAdvantage">Ground Advantage</option>
              <option value="Priority">Priority</option>
              <option value="Express">Express</option>
            </select>
          </div>

          {/* Shipment Address */}
          <div className="mt-4">
            <select
              className="border p-1 rounded w-full"
              value={shipAddress}
              onChange={(event) => setShipAddress(event.target.value)}
            >
              <option value="">Sélectionner une adresse</option>
              {savedAddresses.map((index) => (
                <option value={index.name}>
                  {index.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shipment name */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nom de l'adresse"
              className="border p-2 rounded w-full"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
            />
          </div>

          {/* Shipment Address */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Adresse de livraison"
              className="border p-2 rounded w-full"
              value={shipAdress}
              onChange={(e) => setShipAdress(e.target.value)}
            />
          </div>

          {/* Postal Address */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Code postal"
              className="border p-2 rounded w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Card Info */}

          <div className="border-b mt-4">
          </div>

          <p className="py-2">Données bancaires</p>

          {/* Credit Card Number */}
          <div className="mt-4 flex items-center relative">
            <input
              type="text"
              placeholder="Numéro de carte"
              className="border p-2 rounded w-full"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          {/* Credit Card Expiration */}
          <div className="mt-4">
            <input
              type="month"
              placeholder="Date d'expiration"
              className="border p-2 rounded w-full"
              min="2023-09"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>

          {/* Credit Card Owner */}
          <div className="mt-4 relative flex items-center">
            <input
              type="text"
              placeholder="Propietaire de la carte"
              className="border p-2 rounded w-full"
              min="2023-09"
              value={cardOwner}
              onChange={(e) => setCardOwner(e.target.value)}
            />
          </div>

          {/* Shipment Address */}
          <div className="mt-4 flex items-center relative">
            <input
              type="text"
              placeholder="Code de sécurité (CVV)"
              className="border p-2 rounded w-full"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
            />
          </div>

          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberPaymentInfo}
              onChange={() => setRememberPaymentInfo(!rememberPaymentInfo)}
            />
            <label>Enregistrer le code de sécurité (CVV)</label>
          </div>

          <div className="mt-4">
            {
              isEmpty ? (
                <button className="bg-red-600 text-white py-2 px-4 rounded w-full" onClick={() => toast("Ajoutez des articles d'abord")} >
                  Passer à la caisse
                </button>
              ) : (
                <button className="bg-red-600 text-white py-2 px-4 rounded w-full" onClick={handleCheckout} >
                  Passer à la caisse
                </button>
              )
            }
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-lg mb-4">
              Connectez-vous ou inscrivez-vous pour continuer avec le paiement.
            </p>
            <div className="mb-4"></div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin}
              >
                Se connecter
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRegister}
              >
                S'inscrire
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={guestPay}
              >
                Payer
              </button>
            </div>
          </div>
        </div>
      )}

      {popupConnect && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <div className="p-2">
              <label htmlFor="mail">Entrez votre adresse mail.</label>
              <input className="border border-black rounded-lg" type="text" name="mail" value={mailConnect} onChange={(event) => setMailConnect(event.target.value)}/>
            </div>
            <div className="p-2">
              <label htmlFor="mail">Entrez votre mot de passe.</label>
              <input className="border border-black rounded-lg" type="password" name="mail" value={passwordConnect} onChange={(event) => setPasswordConnect(event.target.value)}/>
            </div>
            <div className="flex justify-end">
              <button className="text-white bg-green-600 hover:bg-green-500 p-2 rounded-lg" onClick={connect}>Valider</button>  
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
