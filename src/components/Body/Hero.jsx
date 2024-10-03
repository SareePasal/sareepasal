import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'


const Hero = () => {
    return (
        <div class="grid lg:grid-cols-4 lg:gap-36 sm:grid-cols-2 md:gap-24 gap-28">
            < HomePage key="1" />
        </div>

    )
}

const HomePage = () => {
    return (
        <React.Fragment>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Saree">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Banarasi Saree.png"
                            width={300}
                            height={300}
                            alt="Saree"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl justify-center sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Saree
                                </h1>
                            </div>
                        </div>
                    </section>

                </Link>
            </div>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Blouse">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Blouse.png"
                            width={300}
                            height={300}
                            alt="Blouse"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Blouse
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Petticoat">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Petticoat.png"
                            width={300}
                            height={300}
                            alt="Petticoat"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Petticoat
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Accessories">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Accessories.png"
                            width={300}
                            height={300}
                            alt="Accessories"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Accessories
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Menswear">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Menswear.png"
                            width={300}
                            height={300}
                            alt="Menswear"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Men's Wear
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            <div className="article container rounded-lg  w-56 border shadow-2xl shadow-gray-900/90">
                <Link href="/Sale">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/sale.png"
                            width={300}
                            height={300}
                            alt="Sale"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                                text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Sale
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default HomePage