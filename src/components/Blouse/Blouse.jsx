import * as React from 'react';
import Slider from '../Slider/Slider'
import Description from "../Description/Description"
import AR6047 from "./AR6047"
import AR6058 from "./AR6058"

//Add Items Here
const itemCode = [AR6047,AR6058]

//Do Not Touch the code below
const Blouses = () => {
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

export default Blouses