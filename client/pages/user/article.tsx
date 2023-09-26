// Article.js
import '../../app/globals.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '@/src/components/footer';


//Importer les styles CSS de Font Awesome
import { faXmark, faBagShopping, faCartArrowDown, faCircle, faHome, faShippingFast, faStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Article = () => {
    
    const router = useRouter();

    const [detail, setDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("xs");
    const [sizeInfo, setSizeInfo] = useState([]);
    const [outStock, setOutStock] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([])
    
    useEffect(() => {

        fetch("http://localhost:4242/" + router.query.id, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: router.query.id
            })
        })
        .then(response => response.json())
        .then(data => {
            if((Number(data[0].stocks.xs.stock) + Number(data[0].stocks.s.stock) + Number(data[0].stocks.m.stock) + Number(data[0].stocks.l.stock) + Number(data[0].stocks.xl.stock)) === 0)
            {
                setOutStock(true)
            }
            setComments(data[0].comments)
            setDetail(data);
        })
        .catch(error => {
            console.error("Error fetching article details:", error);
        });

        fetch("http://localhost:4242/find/size", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: router.query.id,
                size: size
            })
        })
        .then(response => response.json())
        .then(data => {
            setSizeInfo(data)
        })

    }, [router, size]);

    const addToCart = (id: number) => {

        const userId = localStorage.getItem("_id");
        
        if (userId !== null) {

            fetch("http://localhost:4242/shopping/add", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userId,
                    productId: id,
                    quantity: quantity,
                    sizeInfo: sizeInfo,
                    size: size
                })
            })
            .then(response => response.json())
            .then(data => toast.success(data.success, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored",}))
            .catch(error => {
                console.error("Error adding item to cart:", error);
            });
        }
        else
        {
            fetch("http://localhost:4242/createGuest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity,
                    sizeInfo: sizeInfo,
                    size: size
                }),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("_id", data.info._id)
                localStorage.setItem("type", "guest")
            })
        }
    }

    const postComment = () => {
        const type = localStorage.getItem("type");
        const userId = localStorage.getItem("_id");
        if(!type && userId)
        {
            if(comment === "" || comment === " ")
            {
                toast.error("Merci d'entrer un message.", { theme: "colored"})
            }
            else
            {
                fetch("http://localhost:4242/comment/create", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: router.query.id,
                        userId: userId,
                        comment: comment
                    })
                })
                .then(response => response.json())
                .then(data => {
                    toast.success(data.message, {theme: "colored"})
                })
            }
        }
        else
        {
            toast.error("Vous devez vous connecter pour laisser un commentaire.", { theme: "colored"})
        }
    }

  return (
    <div className="w-auto h-screen">
        <ToastContainer/>
      {detail.map((item) => (
        <div className="flex py-28 items-center justify-evenly">
          <div className="flex justify-center items-center">
            <img
              className="h-auto w-auto"
              alt="Photo de produit"
              src={item.picture}
            />
          </div>

          <div className="border-2 box-shadow bg-white shadow-gray-200 shadow-md p-6 rounded-md">
            <div className="items-start flex flex-col">
              <h2 className="text-3xl font-semibold mb-2">{item.name}</h2>
              {item.status === "Promo" ? (
                <div className="flex flex-col">
                  <p className="text-gray-400 line-through">{sizeInfo.price} €</p>
                  <p className="text-black">
                    {(Number(sizeInfo.price) * (1-item.promo / 100))} €
                  </p>
                </div>
              ) : (
                <p className="text-black">{sizeInfo.price} €</p>
              )}
              <p className="text-gray-600 text-2xl">Marque : {item.brand}</p>
              <div className="flex flex-col">
                <p className="text-gray-800 text-md w-fit">
                  Description : {item.description}
                </p>
              </div>

            <div className='w-full flex justify-between items-center py-6 gap-4'>
                <select className='p-3 rounded-md bg-black text-white' name="taille" id="tailles" value={size} onChange={(event) => setSize(event.target.value)}>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                </select>

                <div className="flex items-center gap-1 p-2">
                  <label htmlFor="quantity">Quantité :</label>
                  <input
                    type="number"
                    className="p-1 rounded-md border-2 border-black outline-none"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    max={item.stock}
                    min="1"
                  />
                </div>
                {
                    outStock ? (
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} fade style={{color: 'red'}} size="md"/><p>Victime de son succès</p>
                    </div>
                        ) : (
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} fade style={{color: 'green'}} size="md"/><p>En stock :</p>
                        <p className="text-gray-800 w-fit">{sizeInfo.stock}</p>
                    </div>
                    )
                }
                </div>    

                </div>
                {/* <div className='py-4 hover:opacity-80'>
                    <button className='text-xl bg-gradient-to-r from-green-300 to-teal-700 p-2 rounded-md 
                    text-white w-full'>Acheter</button>
                </div> */}
                <div className='flex flex-col items-center gap-3 w-full'>
                    {
                        outStock ? (
                            <button disabled className='flex gap-4 items-center justify-center text-xl bg-red-600 hover:bg-red-500 p-2 rounded-md text-white w-full'> 
                                <FontAwesomeIcon icon={faXmark} style={{color: '#00000'}} size="md"/>
                                Rupture de stock
                                <FontAwesomeIcon icon={faXmark} style={{color: '#00000'}} size="md"/>
                            </button>
                        ) : (
                            <button className='flex gap-4 items-center justify-center text-xl bg-green-600 hover:bg-green-500 p-2 rounded-md text-white w-full' onClick={() => addToCart(item._id)}> 
                                <FontAwesomeIcon icon={faBagShopping} style={{color: '#00000'}} size="md"/>
                                Ajouter au panier 
                            </button>
                        )
                    }
                    <div className='flex flex-col gap-2'>
                        <p className='text-slate-600 flex gap-2 items-center'>* Frais de ports : 4,95€ | Gratuit avec
                        <a className='' href="/user/abonnement/">KnockOff Premier</a> </p>
                        <p className='text-slate-600 flex gap-2 items-center'><FontAwesomeIcon icon={faShippingFast} style={{color: 'black'}} size="md"/>
                            Temps de livraison estimé : 4 à 5 j (jours ouvrés)</p>
                        <p className='text-slate-600 flex gap-2 items-center'><FontAwesomeIcon icon={faStar} style={{color: 'black'}} size="md"/>
                            Livraison en 24h avec <a className='font-bold' href="/user/abonnement/">KnockOff Premier</a></p>
                    </div>
                </div>
            </div>
        </div>
            ))
        }
        <div className=' bg-gray-100 '>
            <div className='flex justify-center py-4'>
                <h1 className='text-3xl'>Votre avis compte !</h1>
            </div>

            <div className='flex justify-center'>
                <div className=''>
                    <div className='m-4 flex flex-col items-center'>
                        <textarea className='border border-black rounded-md p-2' placeholder='Laissez nous votre avis...' rows={4} cols={50} value={comment} onChange={(event) => setComment(event.target.value)} />
                        <div className='py-2'>
                            <button className='border border-purple p-2 rounded-md bg-[#536ADB] text-white' onClick={postComment}>Poster</button>
                        </div>
                    </div>

                        <hr className=''/>

                </div>
            </div>
                    <div className='py-4 m-4'>
                        {
                            comments.map((item) => (
                                <div className='flex gap-1 py-2'>
                                    <p className='text-xl text-[#536ADB]'> Le {item.date} |</p>
                                    <p className='text-[#536ADB] font-semibold text-xl'>{item.from} : </p>
                                    <p className='text-xl'> {item.message} </p>

                                </div>
                            ))
                        }
                    </div>
        </div>
        </div>
    );
    <Footer/>
}

export default Article;
