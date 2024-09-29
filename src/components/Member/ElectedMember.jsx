import * as React from 'react';
import Image from 'next/image';

const ElectedMember = ({name,nepaliName,position,nepaliPostion,imageLocation}) => {
    return(
        <div class="relative flex flex-col w-96 md:w-5/6 md:mx-auto">
            <div class="relative mx-auto m-2 p-2">
                <Image 
                    src={imageLocation}
                    width={100}
                    height={100}
                    alt={name}
                    /> 
            </div>
            <div class="text-center font-bold">
                <h4 class=" text-rose-900 whitespace-pre">{position} </h4> 
                <h6 class=" text-rose-900 whitespace-pre"> ({nepaliPostion})</h6>
                <p class="text-sky-700">{name} </p>
                <p class="text-sky-700">{nepaliName}</p> 
            </div>

    </div>
    )
}

export default ElectedMember