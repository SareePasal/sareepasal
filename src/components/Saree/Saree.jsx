import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Saree = () => {
    return (
        <div>
            {/* Mobile View */}
            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 ">
                <div class="flex flex-grow justify-center font-bold">
                    <div class="flex flex-col text-center mx-5 justify-center item-center">
                        {/* Row = 1 Col =  1 */}
                        <div>
                            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                                <Image
                                    src="/Banarasi Saree.png"
                                    width={300}
                                    height={300}
                                    alt="Banarasi Saree"
                                />
                            </section>
                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Banarasi Saree
                                    </h1>
                                    Item# 123 <br />
                                    Price: $100.00 <br /><br />
                                    <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                        Add To Cart
                                    </button>
                                </div>

                            </div>
                        </div>
                        {/* Row = 1 Col = 2 */}
                        <div>
                            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm ">
                                <Image
                                    src="/Patola Saree.png"
                                    width={300}
                                    height={300}
                                    alt="Patola Saree"
                                />
                            </section>
                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Patola Saree
                                    </h1>
                                    Item# 124 <br />
                                    Price: $50.00 <br /><br />
                                    <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                        Add To Cart
                                    </button>
                                </div>

                            </div>
                        </div>
                        {/* Row = 1 Col = 3 */}
                        <div>
                            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                                <Image
                                    src="/Chiffon Saree.png"
                                    width={300}
                                    height={300}
                                    alt="Chiffon Saree"
                                />
                            </section>
                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Chiffon Saree
                                    </h1>
                                    Item# 125 <br />
                                    Price: $50.00 <br /><br />
                                    <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* Laptop View or Large Screen (Landscape View) */}
            <div class="grid grid-cols-4 gap-4 relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
                {/* Row = 1 Col =  */}
                <div>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                        <Image
                            src="/Banarasi Saree.png"
                            width={300}
                            height={300}
                            alt="Banarasi Saree"
                        />
                    </section>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                        <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                    Banarasi Saree
                                </h1>
                                Item# 123 <br />
                                Price: $100.00 <br /><br />
                                <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                    Add To Cart
                                </button>
                            </div>

                        </div>
                    </section>
                </div>
                {/* Row = 1 Col = 2 */}
                <div>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                        <Image
                            src="/Patola Saree.png"
                            width={300}
                            height={300}
                            alt="Patola Saree"
                        />
                    </section>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                        <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                    Patola Saree
                                </h1>
                                Item# 124 <br />
                                Price: $50.00 <br /><br />
                                <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                    Add To Cart
                                </button>
                            </div>

                        </div>
                    </section>
                </div>
                {/* Row = 1 Col = 3 */}
                <div>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                        <Image
                            src="/Chiffon Saree.png"
                            width={300}
                            height={300}
                            alt="Chiffon Saree"
                        />
                    </section>
                    <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">

                        <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                    Chiffon Saree
                                </h1>
                                Item# 125 <br />
                                Price: $50.00 <br /><br />
                                <button class="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-1 px-2">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default Saree