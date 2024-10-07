import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({src, text, link}) =>{
    return(
        <div className="article container rounded-lg  w-56 border shadow-lg shadow-gray-400">
                <Link href={link}>
                    <section class="relative container rounded-lg mx-auto  my-5  w-5/6 ">
                        <Image
                            src={src}
                            width={300}
                            height={300}
                            alt={link}
                            class="rounded-lg"
                        />
                        <div class="relative flex justify-center top-3">
                            <div>
                                <h1 class="text-sm md:text-lg font-bold justify-center tracking-tight leading-none  text-blue-900  dark:text-blue-900">
                                    {text}
                                </h1>
                            </div>
                        </div>
                    </section>
                </Link>
            </div>
    )
}

export default Card