import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import RT1004 from "./RT1004"
import RT10074 from "./RT10074"
import RT1003 from "./RT1003"
import H2276 from "./H2276"
import LR1005 from "./LR1005"

//Add Items Here
const itemCode = [RT10074,RT1004,RT1003,H2276,LR1005]

//Do Not Touch the code below
const Gowns = () => {
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


export default Gowns