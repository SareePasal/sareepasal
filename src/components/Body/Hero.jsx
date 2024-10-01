import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div>
            {/* Mobile View */}
            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 ">
                <div class="flex flex-grow justify-center font-bold">
                    <div class="flex flex-col text-center mx-5 justify-center item-center">
                        {/* Row = 1 Col =  1 */}
                        <div>
                            <Link href="/Saree">
                                <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                                    <Image
                                        src="/Banarasi Saree.png"
                                        width={300}
                                        height={300}
                                        alt="Saree"
                                    />
                                </section>
                                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Saree
                                        </h1>
                                    </div>

                                </div>
                            </Link>
                        </div>
                        {/* Row = 1 Col = 2 */}
                        <div>
                            <Link href="/Blouse">
                                <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm ">
                                    <Image
                                        src="/Blouse.png"
                                        width={300}
                                        height={300}
                                        alt="Blouse"
                                    />
                                </section>
                                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Blouse
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Row = 1 Col = 3 */}
                        <div>
                            <Link href="/Petticoat">
                                <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                                    <Image
                                        src="/Petticoat.png"
                                        width={300}
                                        height={300}
                                        alt="Petticoat"
                                    />
                                </section>
                                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Petticoat
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Row = 1 Col = 4 */}
                        <div>
                            <Link href="/Accessories">
                                <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                                    <Image
                                        src="/Accessories.png"
                                        width={300}
                                        height={300}
                                        alt="Accessories"
                                    />
                                </section>
                                <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Accessories
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Laptop View or Large Screen (Landscape View) */}
            <div class="grid grid-cols-4 gap-4 relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
                {/* Row = 1 Col =  */}
                <div>
                    <Link href="/Saree">
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <Image
                                src="/Banarasi Saree.png"
                                width={300}
                                height={300}
                                alt="Saree"
                            />
                        </section>
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold text-center leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Saree
                                    </h1>
                                </div>
                            </div>
                        </section>
                    </Link>
                </div>
                {/* Row = 1 Col = 2 */}
                <div>
                    <Link href="/Blouse">
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <Image
                                src="/Blouse.png"
                                width={300}
                                height={300}
                                alt="Blouse"
                            />
                        </section>
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold text-center leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Blouse
                                    </h1>
                                </div>
                            </div>
                        </section>
                    </Link>
                </div>
                {/* Row = 1 Col = 3 */}
                <div>
                    <Link href="/Petticoat">
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <Image
                                src="/Petticoat.png"
                                width={300}
                                height={300}
                                alt="Petticoat"
                            />
                        </section>
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">

                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Petticoat
                                    </h1>
                                </div>
                            </div>
                        </section>
                    </Link>
                </div>
                {/* Row = 1 Col = 4 */}
                <div>
                    <Link href="/Accessories">
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">
                            <Image
                                src="/Accessories.png"
                                width={300}
                                height={300}
                                alt="Accessories"
                            />
                        </section>
                        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  
                            my-5 sm:my-10  w-5/6 h-96 shadow-sm dark:bg-gray-900 ">

                            <div class="grid grid-cols-1 gap-4 relative flex justify-between  sm:w-5/6 h-full mx-auto">
                                <div>
                                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                        Accessories
                                    </h1>
                                </div>
                            </div>
                        </section>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Hero