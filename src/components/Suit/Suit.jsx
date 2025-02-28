import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import RT1003Eba from "./RT1003Eba"
import RT1006 from "../Suit/RT1006"
import RT1007 from "../Suit/RT1007"
import Aanaya7700 from "../Suit/Aanaya7700"
import GloriousS52 from "../Suit/GloriousS52"
import AG71901 from "./AG71901"
import AG69583 from "./AG69583"
import AG62914 from "./AG62914"
import EG48594 from "./EG48594"
import AG68685 from "./AG68685"
import AG72483 from "./AG72483"
import AG71970 from "./AG71970"
import AG337 from "./AG337"
import AG72430 from "./AG72430"
import AG68133 from "./AG68133.js"
import AG71820 from "./AG71820"
import AG71236 from "./AG71236"
import AG68177 from "./AG68177"
import AG73031 from "./AG73031"
import AG65068 from "./AG65068"
import AG73369 from "./AG73369"
import AG356 from "./AG356"
import AG68776 from "./AG68776"

//Add Items Here
const itemCode = [RT1003Eba,RT1007, RT1006,Aanaya7700,GloriousS52,AG71901,AG69583,AG62914,EG48594, 
                    AG68685, AG72483, AG71970, AG337, AG72430,
                    AG68133, AG71820, AG68177,
                    AG73031, AG65068, AG73369, AG356,AG68776,AG71236]

//Do Not Touch the code below
const Suits = () => {
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

export default Suits