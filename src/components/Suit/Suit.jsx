import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import RT1003Eba from "./RT1003Eba"
import RT1006 from "../Suit/RT1006"
import RT1007 from "../Suit/RT1007"
import Aanaya7700 from "../Suit/Aanaya7700"
import GloriousS52 from "../Suit/GloriousS52"
import AG71901 from "./AG71901"
import AG69583 from "./AG69583"
import AG62914 from "./AG62914"
import EG48594 from "./EG48594"
import AG68685 from "./AG68685"
import AG72483 from "./AG72483"
import AG71970 from "./AG71970"
import AG337 from "./AG337"
import AG72430 from "./AG72430"
import AG68133 from "./AG68133.js"
import AG71820 from "./AG71820"
import AG71236 from "./AG71236"
import AG68177 from "./AG68177"
import AG73031 from "./AG73031"
import AG65068 from "./AG65068"
import AG73369 from "./AG73369"
import AG356 from "./AG356"
import AG68776 from "./AG68776"

//Add Items Here

const Suits = ({ products = [RT1003Eba, RT1007, RT1006, Aanaya7700, GloriousS52, AG71901, AG69583, AG62914, EG48594,
    AG68685, AG72483, AG71970, AG337, AG72430,
    AG68133, AG71820, AG71236, AG68177,
    AG73031, AG65068, AG73369, AG356, AG68776] }) => {
    return (
        <div className="mx-10">
            {products.map((object, i) => {
                const isOnSale = object?.description?.newPrice?.includes("Now"); // Check for each product

                return (
                    <div className="flex-row" key={i}>
                        <Slider imageList={object.images} />
                        <div className="flex flex-col items-center my-10 border-b-4 border-gray-300 pb-10 w-full">

                            {/* Display ON SALE Banner Only If This Product Is On Sale */}
                            {isOnSale && (
                                <div className="animate-bounce text-white text-3xl font-extrabold bg-gradient-to-r from-red-600 to-yellow-400 p-2 rounded-lg shadow-2xl border-4 border-yellow-500">
                                    🔥 <span className="drop-shadow-lg">ON SALE!</span> 🚀
                                </div>
                            )}

                            {/* Sale Price Section - Only for this specific product */}
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
                        <Description description={object.description} />
                    </div>
                );
            })}
        </div>
    );
};

export default Suits