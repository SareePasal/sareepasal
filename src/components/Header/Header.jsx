import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
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
                                    For Limited Time Offer FREE SHIPPING !!! FREE SHIPPING !!!
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
                                    For Limited Time Offer FREE SHIPPING !!!
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
                                <Link href="/Gown" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Gown</Link>
                            </li>
                            <li>
                                <Link href="/Suit" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Suit</Link>
                            </li>
                            <li>
                                <Link href="/Lehenga" class="block p-2 sm:p-4 font-bold text-blue-900 rounded md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Lehenga</Link>
                            </li>
                            <li>
                                <Link href="/MensWear" class="block p-2 sm:p-4 font-bold text-blue-900 rounded  md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-green-600 hover:text-blue-700">Men</Link>
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
                                <Link href="/Gown" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Gown</Link>
                            </li>
                            <li>
                                <Link href="/Suit" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Suit</Link>
                            </li>
                            <li>
                                <Link href="/Lehenga" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Lehenga</Link>
                            </li>
                            <li>
                                <Link href="/MensWear" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                                 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                 md:dark:hover:bg-transparent">Men</Link>
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
                    <br />FREE SHIPPING !!! FREE SHIPPING !!!
                </span>
                <h1
                    class="relative top-0 w-fit h-auto py-4 justify-center flex 
                            bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 
                            bg-clip-text text-2xl font-extrabold text-transparent text-center select-auto">
                    Happy Dashain and Diwali
                    <br />FREE SHIPPING !!! FREE SHIPPING !!!
                </h1>
            </div>
            
            {/* Search Box */}
{/*             <form class="w-80 max-w-md mx-auto">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-600 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-1 ps-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ......" required />
                    <button type="submit" class="text-white absolute end-0.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-0.5 py-0.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
                <br />
            </form> */}
            {/*  <div class="flex items-center justify-center text-2xl text-red font-bold italic 
                            text-green-600 underline decoration-red-900 decoration-4" >
                <br />Pre-Order Available Now !!!!
                <br /><br />
            </div> */}
        </header>
    );
};
export default Header;





