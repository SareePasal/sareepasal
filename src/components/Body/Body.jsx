import * as React from 'react'; 
import Hero from './Hero'

const Body = () => {
    return(
        <div class="grid lg:grid-cols-4 sm:px-9 lg:gap-15 sm:grid-cols-2 md:gap-24 gap-9 justify-center m-4">
            <Hero/>
        </div>
    )
}

export default Body