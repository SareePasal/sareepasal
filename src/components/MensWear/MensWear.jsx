import * as React from "react";
import Slider from "../Slider/Slider";
import Description from "../Description/Description";
import IC2411 from "./IC2411";
import AG71422 from "./AG71422";
import AG69762 from "./AG69762";
import AG67333 from "./AG67333";
import AG68734 from "./AG68734";
import AG64101 from "./AG64101";
import AG72579 from "./AG72579";

const MensWears = ({ products = [IC2411, AG71422, AG69762, AG67333, AG68734, AG64101, AG72579] }) => {
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

export default MensWears;
