import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import FabGopi4 from "./FabGopi4"
import FabMultiThread from "./FabMultiThread"
import AR6047 from "./AR6047"
import AR6058 from "./AR6058"
import AR6053 from "./AR6053"

//Add Items Here
const itemCode = [FabGopi4,FabMultiThread,AR6047,AR6058,AR6053]

//Do Not Touch the code below
const Blouses = () => {
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

export default Blouses