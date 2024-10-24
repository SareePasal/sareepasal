import Phone from '../PhoneIcon/PhoneInfo'
import Cart from '../Cart/Cart'
import * as React from 'react';

const Description = ({description}) => {

    return (
        <div class="flex justify-between sm:w-5/6 h-full mx-auto ">
            <div class="">
                <h1 class=" mb-2 text-xl font-bold md:text-2xl md:font-extrabold tracking-tight leading-none  text-blue-900 dark:text-blue-950">
                    {description.title}
                </h1>
                    <div class="mx-6">
                        <div class="text-black text-sm  dark:text-blue-950">
                            <h2 class="font-bold text-lg">Product Details:</h2>
                            <ul class="list-disc mx-5 my-2">
                            {description.detail && 
                                description.detail.map((object,i) => 
                                    <li key={i}>{object}</li>
                                )}
                            </ul>
                        <div class="">
                            <h2 class="font-bold">Available Colors: </h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1">
                                    {description.colors}                       
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Size & Fit:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1">
                                {description.size}                          
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Product Code:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1">
                                {description.code}
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Note:</h2>
                            <p class="text-black text-sm dark:text-blue-950 text-left mx-5 my-1">
                                Product color may slightly vary due to photographic lighting sources or your monitor settings.
                            </p>
                        </div>
                        <div>
                            <h2 class="font-bold">Price:</h2>
                            <p class="text-green-900 text-xl text-left mx-5 my-1 font-bold">
                                {description.price}
                            </p>
                        </div>
                    </div>
                    <Phone/>
                    <Cart id={description.code}/>
                    {/* {src && <div class="rounded-lg shadow-xl">
                        <Video src={src}/>
                    </div>} */}
                <br/>
            </div>
        </div>
    </div>
    )
}
export default Description