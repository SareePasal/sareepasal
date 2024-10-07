import Image from 'next/image';

const Slider = ({imageList}) => {

    return (
        <div className="flex md:item-center md:justify-center md:w-11/12 ">
            <div class="relative rounded-xl overflow-auto w-11/12">
                <div class="relative w-full flex md:gap-6 gap-3 snap-x overflow-x-auto pb-14 ">
                    <div class=" snap-center shrink-0 mx-7 md:flex hidden">
                        <div class="shrink-0 w-48"></div>
                    </div>
                    { imageList && imageList.map((object,i) => 
                        <div class="snap-normal snap-center shrink-0 shadow-2xl rounded-2xl  md:mx-7 bg-white" key={i}>
                            <Image  class="rounded-2xl " src={object.src} alt="1" width={object.width} height={object.height} key={i}/>
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