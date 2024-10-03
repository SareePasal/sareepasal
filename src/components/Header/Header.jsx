import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap xl:flex-row flex-col items-center md:justify-between mx-auto p-4">
                    <div class="hidden sm:flex flex-row justify-between p-4">
                        <Image class="mx-1"
                            src="/SareePasalLogo.png"
                            width={200}
                            height={200}
                            alt="Saree Pasal logo"
                        />
                        <span class="self-center text-4xl font-extrabold text-7xl text-blue-900">
                            Saree Pasal
                            <p class="self-center text-xl font-extrabold text-7xl text-red-600">
                                <br />All Sales Are Final !!!
                                <br />No Return !!!    No Exchange !!!
                                <p class="self-center text-sm text-green-600">
                                    Contact Us For Shipping Cost !!!
                                </p>
                            </p>
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
                            <p class="self-center text-sm text-red-600 whitespace-pre align-text-center  dark:text-white">
                                <br />All Sales Are Final
                                <br />No Return !!!    No Exchange !!!
                            </p>
                            <p class="self-center text-xs text-green-600 whitespace-pre dark:text-white">
                                Contact Us For Shipping Cost !!!
                            </p>

                        </span>
                    </div>
                    {/* Navigation Items */}
                    <div class="md:hidden">
                        <ul class="text-sm sm:font-bold sm:text-lg flex flex-row  mt-1 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse 
                        dark:bg-gray-800  dark:border-gray-700">
                            <li>
                                <Link href="/" class="block p-2 sm:p-4 font-bold block text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Saree" class="block p-2 sm:p-4 font-bold text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white">Saree</Link>
                            </li>
                            <li>
                                <Link href="/Blouse" class="block p-2 sm:p-4 font-bold text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white">Blouse</Link>
                            </li>
                            <li>
                                <Link href="/Petticoat" class="block p-2 sm:p-4 font-bold text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white ">Petticoat</Link>
                            </li>
                            <li>
                                <Link href="/Accessories" class="block p-2 sm:p-4 font-bold text-blue-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white ">Accessories</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="hidden md:block" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8
                         rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Saree" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Saree</Link>
                            </li>
                            <li>
                                <Link href="/Blouse" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Blouse</Link>
                            </li>
                            <li>
                                <Link href="/Petticoat" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                                md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                md:dark:hover:bg-transparent">Petticoat</Link>
                            </li>

                            <li>
                                <Link href="/Accessories" class="block text-blue-900 text-xl font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
                                 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white 
                                 md:dark:hover:bg-transparent">Accessories</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </header>
    );
};
export default Header;





