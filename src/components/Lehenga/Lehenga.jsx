import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import L3066 from "./L3066"
import L3057 from "./L3057"
import L3074 from "./L3074"


//Add Items Here
const itemCode = [L3066,,L3057,L3074]

//Do Not Touch the code below
const Lehengas = () => {
    return (
        <div class="mx-10">
            {itemCode && itemCode.map((object, i) =>
                <div class="flex-row" key={i}>                    
                    <Slider imageList={object.images} key={i}/>
                    <Description description ={object.description} key={i}/>
                </div>)

            }            
      
        </div>
    )
}

export default Lehengas