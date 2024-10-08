import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import L3074 from "./L3074"
import L3057 from "./L3057"
import L3066 from "./L3066"

//Add Items Here
const itemCode = [L3074,L3057,L3066]

//Do Not Touch the code below
const Lehengas = () => {
    return (
        <div class="mx-10">
            {itemCode && itemCode.map((object, i) =>
                <div class="flex-row">
                    <li key={i}>{object}</li>
                    <Slider imageList={object.images} key={i}/>
                    <Description description ={object.description} key={i}/>
                </div>)

            }            
      
        </div>
    )
}

export default Lehengas