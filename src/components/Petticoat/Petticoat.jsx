import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import Pet123 from "./Pet123"


//Add Items Here
const itemCode = [Pet123]

//Do Not Touch the code below
const Petticoats = () => {
    return (
        <div class="mx-10">
            {itemCode && itemCode.map((object, i) =>
                <div class="flex-row">
                    key={i}
                    <Slider imageList={object.images} key={i}/>
                    <Description description ={object.description} key={i}/>
                </div>)

            }            
      
        </div>
    )
}


export default Petticoats