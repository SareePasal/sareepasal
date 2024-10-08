import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import FBL228 from "./FBL228"
import NA4001 from "./NA4001"
import DB4090 from "./DB4090"
import VC4052 from "./VC4052"


//Add Items Here
const itemCode = [FBL228,NA4001,DB4090,VC4052]

//Do Not Touch the code below
const Sarees = () => {
    return (
        <div class="mx-10">
            {/* Vendor: Leranath Fashion Item: FB-L228*/}
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

export default Sarees