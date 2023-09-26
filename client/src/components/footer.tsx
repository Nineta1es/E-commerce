//Importer les styles CSS de Font Awesome
import { faCircleUser, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
import Visa from '@/src/assets/visa.png';
import Carte from '@/src/assets/carte.png';
import Paypal from '@/src/assets/pay-pal.png';




export default function Footer() {
    return(
        <main className='w-full h-full mt-12'>
            <footer className='p-4 bg-black opacity-90 flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center mx-auto flex-col'>
                    <div className='p-2'>
                        <h1 className="text-white text-2xl font-bold mx-4">KnockOff</h1>
                    </div>

                    <div className="flex justify-center text-gray-200 text-lg gap-3 py-4 text-center mx-auto">
                        <a href="" className="text-sm sm:text-xl w-auto sm:w-auto hover:text-slate-500 duration-0 transition hover:duration-300">A propos</a> <p>|</p>
                        <a href="" className="text-sm sm:text-xl  w-auto sm:w-auto hover:text-slate-500 duration-0 transition hover:duration-300">Contact</a> <p>|</p>
                        <a href="" className="text-sm sm:text-xl  w-auto sm:w-auto hover:text-slate-500 duration-0 transition hover:duration-300">FAQ</a> <p>|</p>
                        <a href="" className="text-sm sm:text-xl  w-auto sm:w-auto hover:text-slate-500 duration-0 transition hover:duration-300">Mentions légales</a>
                    </div>

                    <div className='flex gap-6 items-center'>
                        <Image alt='visa paiement'  className='w-7 h-7 sm:w-auto sm:h-8'  width ="64" height="96" src={Visa}></Image>
                        <Image alt='MasterCard paiement' className='w-auto h-6 sm:w-auto sm:h-8' src={Carte}></Image>
                        <Image alt='MasterCard paiement' className=' w-7 h-7 sm:w-auto sm:h-8' src={Paypal}></Image>
                    </div>

                    <div className="text-gray-200 text-lg flex justify-center py-4">
                        <p className="text-gray-300 text-sm sm:text-lg">©2023 | KnockOff shop , Inc.</p>
                    </div>
                </div>
            </footer>

        </main>
    )
}