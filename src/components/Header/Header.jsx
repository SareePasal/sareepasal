import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap xl:flex-row flex-col items-center md:justify-between mx-auto p-4">
            <div class= "hidden sm:flex flex-row justify-between p-4">
                <Image class="mx-1"
                src="/SareePasalLogo.png"
                width={200}
                height={200}
                alt="Saree Pasal logo"
                />
                <span class="self-center text-lg font-extrabold whitespace-nowrap text-7xl text-blue-900 dark:text-white">
                    Saree Pasal
                </span>
            </div>
            <div class= "sm:hidden flex p-1">
                <Image class="mx-1"
                src="/SareePasalLogo.png"
                width={70}
                height={70}
                alt="Saree Pasal logo"
                />
                <span class="self-center text-xs  font-bold whitespace-nowrap dark:text-white text-blue-900">
                    Saree Pasal
                </span>
            </div>
        </div>
        </nav>
    </header>
    );
};
export default Header;





