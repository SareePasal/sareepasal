'use client'
import Phone from '../PhoneIcon/PhoneInfo'
import AddCart from '../AddCart/AddCart'
import React, { useState, useCallback } from 'react';


const colors = {
    Pink: 'bg-pink-400',
    Gold: 'bg-yellow-300',
    Red: "bg-red-700",
    Green: "bg-green-600",
    Blue: "bg-sky-400",
    Black: "bg-slate-800",
    Purple: "bg-indigo-700",
    White: "bg-white",
    Orange: "bg-orange-600",
    Green: "bg-green-700",
    Maroon: "bg-rose-900",
    Yellow: "bg-yellow-400",
    Navy: "bg-sky-400",
    Grey: "bg-stone-700",
    Rani: "bg-pink-600",
    Violet: "bg-purple-600",
    Nude: "bg-yellow-700",
    Beige: "bg-stone-400",
    Champagne: "bg-neutral-500",
    Teal: "bg-teal-900",
    Cream: "bg-lime-50",
    Sky: 'bg-cyan-300',
    Wine: "bg-pink-900",
    Baby: "bg-pink-200",
    Lavender:"bg-indigo-300",
    Mustard: "bg-yellow-600"
  }


const Description = ({description}) => {
    const [color, setColor] = useState("")
    const [alert, setAlert] = useState(false)
    const onRadioChange =e=>{
       setColor(e.target.id)
       setAlert(false)
    }
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
                            <div class="grid grid-cols-2 md:grid-cols-4 pl-4">
                                    {
                                        description.colors.length > 0 &&
                                        description.colors.map((object,i)=>(
                                            <div class="flex flex-row items-center" key={i}>
                                                <div class=" p-1" key={i}>
                                                    <input type="radio" id={object} class="checked:bg-blue-500" key={i} checked={object==color}
                                                        onChange={onRadioChange}
                                                    />
                                                </div>
                                                
                                                <div className={`rounded-full w-5 h-5 md:w-7 md:h-7 shadow-md ${colors[object]}`} key={i}></div>
                                                <span class="p-1 md:p-2 font-light md:font-semibold text-xs md:text-lg" key={i} >{object}</span>
                                            </div>
                                        ))
                                        
                                    }                       
                            </div>
                            <div>
                            { alert && description.colors.length >1 &&
                                <span class="text-red-400 p-3">Please select a colors</span>
                            }
                            </div>
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
                    <AddCart id={description.code} color={color} alert={setAlert}/>
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