'use client'
import { useState, useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';
import {StoreContext} from "../provider/Provider";
import { observer } from "mobx-react";


const Header = observer(() => {
    const { currentCart,carts } = useContext(StoreContext)
    const[cart,setCart] = useState(currentCart)
    return (
        <header>
            <nav class="bg-pink-100 border-gray-200 dark:bg-pink-950">
                <div class="max-w-screen-xl flex flex-wrap xl:flex-row 
                        flex-col items-center md:justify-between mx-auto p-4">
                    <div class="hidden sm:flex flex-row justify-between p-4">
                        <Image class="mx-1"
                            src="/SareePasalLogo.png"
                            width={200}
                            height={200}
                            alt="Saree Pasal logo"
                        />
                        <span class="self-center text-4xl font-extrabold text-7xl text-blue-900">
                            Saree Pasal
                            <div class="self-center text-xl font-extrabold text-7xl text-red-600">
                                <br />All Sales Are Final !!!
                                <br />No Return !!!    No Exchange !!!
                                <p class="self-center text-sm text-green-600">
                                    Contact Us For Shipping Cost !!!
                                </p>
                            </div>
                        </span>
                    </div>
                    <div class="sm:hidden flex p-1">
                        <Image class="mx-1"
                            src="/SareePasalLogo.png"
                            width={150}
                            height={150}
                            alt="Saree Pasal logo"
                        />
                        <span class="self-center text-3xl font-extrabold text-blue-900  dark:text-white">
                            Saree Pasal
                            <div class="self-center text-sm text-red-600 whitespace-pre align-text-center  dark:text-red">
                                All Sales Are Final
                                <br />No Return !!!    No Exchange !!!
                                <p class="self-center text-xs text-green-600 whitespace-pre dark:text-blue-300">
                                    Contact Us For Shipping Cost !!!
                                </p>
                            </div>
                        </span>
                    </div>
                    {/* Navigation Items -- Mobile */}
                    <div class="md:hidden">
                        <ul class="text-sm sm:font-bold sm:text-lg flex flex-row  mt-1">
                            <li>
                                <Link href="/" class="block p-2 sm:p-4 font-bold block text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Saree_All" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700 ">Saree</Link>
                            </li>
                            <li>
                                <Link href="/Lehenga" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Lehenga</Link>
                            </li>
                            <li>
                                <Link href="/Gown" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Gown</Link>
                            </li>
                            <li>
                                <Link href="/MensWear" class="block p-2 sm:p-4 font-bold text-blue-900 rounded  md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Men</Link>
                            </li>
                            <li>
                                <Link href="/About" class=" relative block p-2 sm:p-4 font-bold text-blue-900 rounded  md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700 fa-solid fa-cart-shopping">
                                    { cart.length > 0 &&
                                        <div class="bg-slate-700 rounded-full h-4 w-4 absolute z-10 top-0 left-1">
                                            <span class='font-bold text-xs absolute z-20 right-1 text-white'> {cart.length} </span>
                                        </div>
                                    }
                                </Link>
                            </li>

                        </ul>
                    </div>
                    {/* Navigation Items -- Big Screen */}
                    <div class="hidden md:block" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                            <li>
                                <Link href="/" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Saree_All" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Saree</Link>
                            </li>
                            <li>
                                <Link href="/Lehenga" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Lehenga</Link>
                            </li>
                            <li>
                                <Link href="/Gown" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Gown</Link>
                            </li>

                            <li>
                                <Link href="/MensWear" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                                 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                 md:dark:hover:bg-transparent">Men</Link>
                            </li>
                            <li>
                                <Link href="/cart" class=" relative block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                                 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                 md:dark:hover:bg-transparent fa-solid fa-cart-shopping">
                                    { cart.length > 0 &&
                                        <div class="bg-slate-700 rounded-full h-4 w-4 absolute z-10 -top-3 left-1">
                                            <span class='font-bold text-xs absolute z-10 right-1 text-white' > {cart.length} </span>
                                        </div>
                                    }
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

            </nav>
            <div class="flex h-18  items-center justify-center bg-black">
                <span class="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r 
                            blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-2xl 
                            box-content font-extrabold text-transparent text-center select-none">
                                Happy Dashain and Diwali
                </span>
                <h1
                    class="relative top-0 w-fit h-auto py-4 justify-center flex 
                            bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 
                            bg-clip-text text-2xl font-extrabold text-transparent text-center select-auto">
                                Happy Dashain and Diwali
                </h1>
            </div>
            <div class="flex items-center justify-center text-2xl text-red font-bold italic 
                            text-green-600 underline decoration-red-900 decoration-4" >
                <br />Pre-Order Available Now !!!!
                <br /><br />
            </div>
        </header>
    );
});
export default Header;





