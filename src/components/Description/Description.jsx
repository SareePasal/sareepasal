import Phone from '../Phone/Phone'
import Video from '../Video/Video'
import * as React from 'react';

const Description = ({title,detail,colors,size,code,note,price,src}) => {
    return (
        <div class="flex justify-between sm:w-5/6 h-full mx-auto ">
            <div class="">
                <h1 class=" mb-2 text-xl font-bold md:text-2xl md:font-extrabold tracking-tight leading-none  text-blue-900 dark:text-blue-950">
                    {title}
                </h1>
                    <div class="mx-6">
                        <div class="text-black text-sm  dark:text-blue-950">
                            <h2 class="font-bold text-lg">Product Details:</h2>
                            <ul class="list-disc mx-5 my-2 font-semibold">
                            {detail && 
                                detail.map((object,i) => 
                                    <li key={i}>{object}</li>
                                )}
                            </ul>
                        <div class="">
                            <h2 class="font-bold">Available Colors: </h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1 font-semibold">
                                    {colors}                       
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Size & Fit:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1 font-semibold">
                                {size}                          
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Product Code:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1 font-semibold">
                                {code}
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Note:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1 font-semibold">
                                {note}
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Price:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1 font-semibold">
                                {price}
                            </p>
                        </div>
                    </div>
                    <Phone/>
                    {src && <div class="rounded-lg shadow-xl">
                        <Video src={src}/>
                    </div>}
            </div>
        </div>
    </div>
    )
}

export default Description