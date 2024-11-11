import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import AntiqueEarringsCollection2 from "./AntiqueEarringsCollection2"
import AB94 from "./AB94"
import AB222 from "./AB222"
import AD0199 from "./AD0199"
import AN146 from "./AN146"


//Add Items Here
const itemCode = [AntiqueEarringsCollection2,AB94,AB222,AD0199,AN146]

//Do Not Touch the code below
const Accessories = () => {
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

export default Accessories