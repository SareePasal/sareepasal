import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero =()=>{
   return(
    <div>
        <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('./Designer.jpeg')`}}>
        <div class="relative flex justify-between m-2 rounded-xl  h-full mx-auto backdrop-blur-md bg-white/60 dark:bg-slate-700/60">
            <div class="flex flex-grow justify-center font-bold">
                <div class="flex flex-col text-center mx-5 justify-center item-center">
                    <h1 class="sm:max-w-2xl mb-2 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                    Long Island Nepalese Society
                    </h1>
                    <p class="mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white"> New York</p>
                    <p class=" mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                    लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                    </p>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    From Planning To Progress
                    </p>
                    <div class="flex  flex-wrap text-sm font-light item-center justify-center">
                        <Link href="/FinancialReport" >
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                Financial Report
                            </button>
                        </Link>
                        <Link href="/About">
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  
                            dark:shadow-slate-950 shadow-lg rounded-lg p-2 dark:text-white text-white m-2 
                            drop-shadow-2xl">Membership Form</button>
                        </Link>
                        <Link href="/News">
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
        </section>
        <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  my-5 sm:my-10  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 dark:from-slate-500 dark:to-slate-900">
        <div class="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
            <div class="flex justify-center ">
                <div class="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    Long Island Nepalese Society, New York
                    </h1>
                    <p class="sm:max-w-2xl mb-4 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                    </p>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white xl:text-xl font-bold">
                    From Planning To Progress
                    </p>
                    <div class="flex flex-wrap item-center justify-center max-[800px]:text-sm ">
                        <Link href="/FinancialReport">
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Financial Report</button>
                        </Link>
                        <Link href="/MembershipForm">
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Membership Form</button>
                        </Link>
                        <Link href="/News">
                            <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div class=" hidden sm:flex sm:mx-5 justify-center">
                <div class="flex flex-col justify-center">
                    <Image 
                        src="/LINS.png"
                        width={200}
                        height={200}
                        alt="Lins logo"
                        />
                </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default Hero