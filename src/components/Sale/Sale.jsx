import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import AG72430 from "./AG72430"
import AG72483 from "./AG72483"


//Add Items Here
const itemCode = [AG72430,AG72483]

//Do Not Touch the code below
const Sale = () => {
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

export default Sale