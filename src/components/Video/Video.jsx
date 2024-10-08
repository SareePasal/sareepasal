import { Suspense } from 'react'

const VideoComponent = ({src}) => {   
    return <iframe class="aspect-video rounded-lg shadow-lg" src={src} width="740" height="415" frameborder="0" allowfullscreen />
}

const MobileVideoComponent = ({src}) => {   
    return <iframe class="aspect-video rounded-lg shadow-lg" src={src} width="280" height="275" frameborder="0" allowfullscreen />
}

const  Video = ({src}) =>{
return (
    <section class="mb-10">
        <Suspense fallback={<p>Loading video...</p>}>
            <div class="hidden md:flex">
                <VideoComponent class="hidden md:flex" src={src}/>
            </div>
            <div class="flex md:hidden">
                <MobileVideoComponent  src={src}/>
            </div>
        </Suspense>
    </section>
)
}

export default Video