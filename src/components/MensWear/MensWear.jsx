import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import IC2411 from "./IC2411"

//Add Items Here
const itemCode = [IC2411]

//Do Not Touch the code below
const MensWears = () => {
        return (
            <div class="mx-10">
                {itemCode && itemCode.map((object, i) =>
                    <div class="flex-row">
                        <Slider imageList={object.images} key={i}/>
                        <Description description ={object.description} key={i}/>
                    </div>)
    
                }            
          
            </div>
        )
}

export default MensWears