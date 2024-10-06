import { Suspense } from 'react'

const VideoComponent = ({src}) => {   
    return <iframe src={src} frameborder="0" allowfullscreen />
}

   
const  Video = ({src}) =>{
return (
    <section>
        <Suspense fallback={<p>Loading video...</p>}>
            <VideoComponent src={src}/>
        </Suspense>
    </section>
)
}

export default Video