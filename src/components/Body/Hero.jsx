import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero =()=>{
   return(
    <div>
        <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('./Designer.jpeg')`}}>
        <div class="relative flex justify-between m-2 rounded-xl  h-full mx-auto backdrop-blur-md bg-white/60 dark:bg-slate-700/60">
            <div class="flex flex-grow justify-center font-bold">
            <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    Vanarasi Saree
                    </h1>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white">
                    Varanasi, this saree is a masterpiece of traditional Indian craftsmanship.<br/>
                    <br/><br/>Features:<br/><br/>
                        Material: Pure silk, known for its luxurious texture and sheen.<br/><br/>
                        Design: Intricate zari work with floral and paisley motifs, showcasing the rich heritage of Banarasi weaving.<br/><br/>
                        Color: A stunning blend of deep maroon and gold, perfect for festive occasions and weddings.<br/><br/>
                        Border: Elaborate gold zari border that adds a touch of opulence.<br/><br/>
                        Pallu: Richly decorated pallu with detailed patterns, making it a statement piece.<br/><br/>
                    </p>

                
            </div>  
        </div>
        </section>
        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  my-5 sm:my-10  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 dark:from-slate-500 dark:to-slate-900">
        <div class="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
            <div class="flex justify-center ">
               <div class="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    Banarasi Saree
                    </h1>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white">
                    Varanasi, this saree is a masterpiece of traditional Indian craftsmanship.<br/>
                    <br/><br/>Features:<br/><br/>
                        Material: Pure silk, known for its luxurious texture and sheen.<br/><br/>
                        Design: Intricate zari work with floral and paisley motifs, showcasing the rich heritage of Banarasi weaving.<br/><br/>
                        Color: A stunning blend of deep maroon and gold, perfect for festive occasions and weddings.<br/><br/>
                        Border: Elaborate gold zari border that adds a touch of opulence.<br/><br/>
                        Pallu: Richly decorated pallu with detailed patterns, making it a statement piece.<br/><br/>
                    </p>
                </div>
            </div>
            <div class=" hidden sm:flex sm:mx-5 justify-center">
                <div class="flex flex-col justify-center">
                    <Image 
                        src="/Banarasi Saree1.png"
                        width={190}
                        height={50}
                        alt="Banarasi Saree logo"
                        />
                </div>
            </div>
        </div>
        </section>
        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  my-5 sm:my-10  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 dark:from-slate-500 dark:to-slate-900">
        <div class="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
            <div class="flex justify-center ">
               <div class="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    Patola Saree
                    </h1>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white">
                    Patola Saree, this saree is a masterpiece of traditional Indian craftsmanship.<br/>
                    <br/><br/>Features:<br/><br/>
                        Double Ikat Weave: Patola sarees are renowned for their intricate double ikat weaving technique, where both the warp and weft threads are dyed before weaving to create complex patterns.
                        <br/><br/>Silk Fabric: These sarees are typically made from high-quality silk, giving them a luxurious feel and a rich sheen.
                        <br/><br/>Intricate Patterns: The designs often feature geometric patterns, floral motifs, and traditional symbols, all meticulously crafted.
                        <br/><br/>Natural Dyes: The threads are dyed using natural colors, which contribute to the vibrant and enduring hues of the saree.
                        <br/><br/>Heritage Craft: The art of making Patola sarees is a closely guarded tradition, often passed down through generations within the Salvi family in Patan12.
                    </p>
                </div>
            </div>
            <div class=" hidden sm:flex sm:mx-5 justify-center">
                <div class="flex flex-col justify-center">
                    <Image 
                        src="/Patola Saree1.png"
                        width={190}
                        height={50}
                        alt="Patola Saree logo"
                        />
                </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default Hero