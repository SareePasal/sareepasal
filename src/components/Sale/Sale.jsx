import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import AG72430 from "./AG72430"
import AG72483 from "./AG72483"
import AG68734 from "./AG68734"


//Add Items Here
const Sale = ({ products = [AG72430, AG72483, AG68734] }) => {
    const isOnSale = products.some(product => product?.description?.newPrice?.includes("Now"));

    //Do Not Change Below Code
  
    return (
        <div class="mx-10">
            {products && products.map((object, i) =>
                <div class="flex-row" key={i}>
                    <Slider imageList={object.images} key={i} />                    
                    <div className="flex flex-col items-center my-10 border-b-4 border-gray-300 pb-10 w-full" key={i}>
                        {/* Sale banner appears for EACH product */}
                        {isOnSale && (
                            <div className="animate-bounce text-white text-3xl font-extrabold bg-gradient-to-r from-red-600 to-yellow-400 p-2 rounded-lg shadow-2xl border-4 border-yellow-500">
                                🔥 <span className="drop-shadow-lg">ON SALE!</span> 🚀
                            </div>
                        )}
                        {/* Sale Price Section - Each product gets its own */}
                        {isOnSale && (
                            <div className="flex flex-col items-center mt-6">
                                <span className="text-red-600 text-3xl font-bold line-through">
                                    {object.description.oldPrice || "$XX.XX"}
                                </span>
                                <span className="text-4xl font-extrabold text-green-400 animate-pulse 
                 bg-gradient-to-r from-black via-green-900 to-black 
                 px-6 py-3 rounded-2xl shadow-2xl border-4 border-green-500 
                 ring-2 ring-green-300 drop-shadow-glow 
                 transition-transform transform hover:scale-110">
    💰 {object.description.newPrice}
</span>

                            </div>
                        )}

                        </div>
                    <Description description={object.description} key={i} />      
                </div>)

            }

        </div>
    )
}

export default Sale