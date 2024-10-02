import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div>
            {/* Mobile View */}
                <div class="flex flex-col text-center mx-5 justify-center">
                    {/* Row = 1 Col =  1 */}
                    <div>
                        <Link href="/Saree">
                        <div class="sm:hidden container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm ">
                        <Image
                                    src="/Banarasi Saree.png"
                                    width={300}
                                    height={300}
                                    alt="Saree"
                                />
                            
                                <p class="sm:hidden font-extrabold justify-center text-3xl text-blue-900">
                                    Saree
                                </p>
                                </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 2 */}
                    <div>
                        <Link href="/Blouse">
                            <div class="sm:hidden container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm ">
                                <Image
                                    src="/Blouse.png"
                                    width={300}
                                    height={300}
                                    alt="Blouse"
                                />
                            </div>
                            <div>
                                <h1 class="sm:hidden font-extrabold justify-center text-3xl text-blue-900">
                                    Blouse
                                </h1>
                            </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 3 */}
                    <div>
                        <Link href="/Petticoat">
                            <div class="sm:hidden container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                                <Image
                                    src="/Petticoat.png"
                                    width={300}
                                    height={300}
                                    alt="Petticoat"
                                />
                            </div>
                            <div>
                                <h1 class="sm:hidden font-extrabold justify-center text-3xl text-blue-900">
                                    Petticoat
                                </h1>
                            </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 4 */}
                    <div>
                        <Link href="/Accessories">
                            <div class="sm:hidden container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                                <Image
                                    src="/Accessories.png"
                                    width={300}
                                    height={300}
                                    alt="Accessories"
                                />
                            </div>
                            <div>
                                <h1 class="sm:hidden font-extrabold justify-center text-3xl text-blue-900">
                                    Accessories
                                </h1>
                            </div>
                        </Link>
                    </div>
                </div>

            {/* Laptop View or Large Screen (Landscape View) */}
            <section class="hidden sm:flex container sm:h-80 rounded-xl mx-auto  
            my-5 sm:my-10  w-5/6  h-96 shadow-sm">
                <div class="flex justify-between m-2 h-full mx-auto">
                    {/* Row = 1 Col =  1*/}
                    <div>
                        <Link href="/Saree">
                            <div class="article container rounded-xl w-5/6 h-full mx-auto">
                                <Image
                                    src="/Banarasi Saree.png"
                                    width={280}
                                    height={280}
                                    alt="Saree"
                                />
                                <p class="flex justify-center sm:w-5/6 h-full mx-auto">
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold text-center leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Saree
                                        </h1>
                                </p>
                            </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 2 */}
                    <div>
                        <Link href="/Blouse">
                            <div class="article container rounded-xl w-5/6 h-full">
                                <Image
                                    src="/Blouse.png"
                                    width={280}
                                    height={280}
                                    alt="Blouse"
                                />
                                <div class="flex justify-center  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold text-center leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Blouse
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 3 */}
                    <div>
                        <Link href="/Petticoat">
                            <div class="article container rounded-xl w-5/6 h-full">
                                <Image
                                    src="/Petticoat.png"
                                    width={280}
                                    height={280}
                                    alt="Petticoat"
                                />
                                <div class="flex justify-center  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Petticoat
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* Row = 1 Col = 4 */}
                    <div>
                        <Link href="/Accessories">
                            <div class="article container rounded-xl w-5/6 h-full">
                                <Image
                                    src="/Accessories.png"
                                    width={280}
                                    height={280}
                                    alt="Accessories"
                                />
                                <div class="flex justify-center  sm:w-5/6 h-full mx-auto">
                                    <div>
                                        <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-white">
                                            Accessories
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero