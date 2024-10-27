import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({src, text, link}) =>{
    return(
        <div class="rounded-lg w-52 h-80 pt-5 mb-10">
                <Link href={link}>
                        <Image
                            src={src}
                            width={300}
                            height={400}
                            alt={link}
                            class="rounded-lg object-fill dark:shadow-2xl shadow-md shadow-neutral-500 drop-shadow-xl dark:shadow-zinc-400 top-10"
                        />
                        <div class=" flex justify-center p-2 ">
                            <div>
                                <h1 class="text-lg md:text-xl font-semibold font-sans justify-center  text-black  dark:text-blue-900">
                                    {text}
                                </h1>
                            </div>
                        </div>
                </Link>
            </div>
    )
}

export default Card