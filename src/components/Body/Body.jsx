import * as React from 'react'; 
import Hero from './Hero'

const Body = () => {
    return(
        <div class="grid lg:grid-cols-4 lg:gap-15 sm:grid-cols-2 md:gap-24 gap-20 
        border shadow-2xl shadow-gray-900/90 justify-center">
            <Hero/>
        </div>
    )
}

export default Body