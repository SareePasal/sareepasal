import * as React from 'react';
import Image from 'next/image'

const BanarasiSaree = () => {
    return (
        <div class="grid lg:grid-cols-3 lg:gap-36 sm:grid-cols-2 gap-20 ">
            < BanarasiSarees key="1" />
        </div>

    )
}


const BanarasiSarees = () => {
    return (
        <React.Fragment>
            {/* Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree */}
            <div className="flex-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
            <div class = "flex justify-center items-center">
                <div className="flex flex-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90"> 
                        <div className="full h-48 overflow-auto touch-pan-y"> 
                            <img src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 1.png" alt="1" width={300} height={300}/> 
                            <img src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 2.png" alt="2" width={300} height={300}/> 
                            <img src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 3.png" alt="3" width={300} height={300}/> 
                            <img src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 4.png" alt="4" width={300} height={300}/> 
                        </div> 
                        </div>
                        </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto ">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 1
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN123_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                123
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $100.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Banarasi Saree Item-124 Wine Zariwork Banarasi Silk Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <div class="flex justify-center">
                    <Image
                        src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 2.png"
                        width={300}
                        height={300}
                        alt="Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 2"
                    />
                </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 2
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN124_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                124
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $150.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Banarasi Saree Item-125 Wine Zariwork Banarasi Silk Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <div class="flex justify-center">
                    <Image
                        src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 3.png"
                        width={300}
                        height={300}
                        alt="Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 3"
                    />
                </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 3
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN125_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                125
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $50.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Banarasi Saree Item-126 Wine Zariwork Banarasi Silk Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <div class="flex justify-center">
                    <Image
                        src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 4.png"
                        width={300}
                        height={300}
                        alt="Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 4"
                    />
                </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 4
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN126_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                126
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $125.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Banarasi Saree Item-127 Wine Zariwork Banarasi Silk Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <div class="flex justify-center">
                    <Image
                        src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 5.png"
                        width={300}
                        height={300}
                        alt="Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 5"
                    />
                </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 5
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN125_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                127
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $250.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Banarasi Saree Item-128 Wine Zariwork Banarasi Silk Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <div class="flex justify-center">
                    <Image
                        src="/Saree/Banarasi/Item-123/Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 6.png"
                        width={300}
                        height={300}
                        alt="Banarasi Saree Item-123 Wine Zariwork Banarasi Silk Saree Image 6"
                    />
                </div>
                {/* Available Colors */}
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full"></a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span
                                class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-pink-500 rounded-full"></a>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                    <div>
                        <h1 class=" mb-2 text-2xl md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xldark:text-blue-950">
                            Wine Zariwork Banarasi Silk Saree Item 6
                        </h1>
                        <p class="text-black text-smdark:text-blue-950 text-left">
                            Product Details:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                - Wine Saree in Banarasi Silk fabric
                                <br />- The Saree is elevated with Zariwork embroidery
                                <br />- It comes with an Unstitched blouse
                                <br />- Comes with the Koskii promise of premium quality
                            </p>

                            <br />Size & Fit:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Saree: 5.5 Mtrs
                                <br />Blouse: 0.80 Mtrs
                            </p>

                            <br />Material & Care:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Banarasi Silk
                                <br />Dry Wash Only
                            </p>

                            <br />Product Code:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                SAREEBAN125_WINE
                            </p>

                            <br />Note:
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>

                            <br />Item#
                            <p class="text-black text-smdark:text-blue-950 text-left font-light">
                                126
                            </p>

                            <br />Price:
                            <p class="text-green-700">
                                $220.00
                            </p>
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>


        </React.Fragment>
    )
}

export default BanarasiSarees