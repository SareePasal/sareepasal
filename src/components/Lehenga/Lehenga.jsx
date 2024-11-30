import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import RT1001 from "./RT1001"
import RT1001copy from "./RT1001copy"
import RT1001copy2 from "./RT1001copy2"
import RT1002 from "./RT1002"
import RT1002copy from "./RT1002copy"
import DLC1008 from "./DLC1008"
import Hazel2302 from "./Hazel2302"
import RT106 from "./RT106"
import L3066 from "./L3066"

import L3057 from "./L3057"
import L3074 from "./L3074"


//Add Items Here
const itemCode = [RT1001,RT1001copy,RT1001copy2,RT1002,RT1002copy,Hazel2302,DLC1008,RT106,L3066,L3057,L3074]

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