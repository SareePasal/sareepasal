import Image from 'next/image';

const Slider = ({imageList}) => {

    return (
        <div className="flex pt-5">
            <div class="relative rounded-md overflow-auto h-auto">
                <div class="relative w-full flex md:gap-0 gap-3 snap-x overflow-x-auto md:pb-14 ">
                    <div class=" snap-center shrink-0 mx-7 md:flex hidden">
                        <div class="shrink-0 w-48 h-56"></div>
                    </div>
                    { imageList && imageList.map((object,i) => 
                        <div class="snap-normal snap-center shrink-0  rounded-2xl mx-2 mb-10 " key={i}>
                            <Image  class="rounded-md shadow-md shadow-neutral-500 drop-shadow-md dark:shadow-zinc-400" src={object.src} alt="1" width={object.width} height={object.height} key={i}/>
                        </div>
                    )}   
                    <div class=" snap-center shrink-0 md:mx-7 md:flex hidden ">
                        <div class="shrink-0 w-96"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider