import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import IC2411 from "./IC2411"
import AG71422 from "./AG71422"
import AG69762 from "./AG69762"
import AG67333 from "./AG67333"
import AG68734 from "./AG68734"
import AG64101 from "./AG64101"
import AG72579 from "./AG72579"


//Add Items Here
const itemCode = [IC2411,AG71422, AG69762,AG67333,AG68734,AG64101,AG72579]

//Do Not Touch the code below
const MensWears = () => {
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

export default MensWears