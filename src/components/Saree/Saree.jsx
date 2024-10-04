import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Saree = () => {
    return (
        <div class="grid lg:grid-cols-3 lg:gap-36 sm:grid-cols-2 gap-20">
            < Sarees key="1" />
        </div>

    )
}


const Sarees = () => {
    return (
        <React.Fragment>
            {/* Banarasi Saree */}
            <div className="felx felx-row mx-auto p-4 article rounded-lg border shadow-2xl shadow-gray-300">
                <Link href="/BanarasiSarees">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 ">
                        <Image
                            src="/Banarasi Saree.png"
                            width={300}
                            height={300}
                            alt="Banarasi Saree"
                            class="rounded-lg"
                        />

                        <div class="flex text-xl font-bold justify-center relative top-4">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                        text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Banarasi Saree
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            {/* Patola Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <Link href="/PatolaSarees">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Patola Saree.png"
                            width={300}
                            height={300}
                            alt="Patola Saree"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                     text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Patola Saree
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
            {/* Chiffon Saree */}
            <div className="felx felx-row mx-auto p-4 article border shadow-2xl shadow-gray-900/90">
                <Link href="/ChiffonSarees">
                    <section class="relative container rounded-xl mx-auto  my-5  w-5/6  h-50 shadow-sm">
                        <Image
                            src="/Chiffon Saree.png"
                            width={300}
                            height={300}
                            alt="Chiffon Saree"
                        />
                        <div class="flex text-xl font-bold justify-center">
                            <div>
                                <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none 
                                     text-blue-900 xl:text-2xl dark:text-blue-900">
                                    Chiffon Saree
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Saree