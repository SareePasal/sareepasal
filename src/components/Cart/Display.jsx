import Image from 'next/image';

const Display = ({item}) =>{
    const { src,alt,height,width } = item.image[0]
    return (
        <div class="flex items-center p-10">
            <Image
                src={src}
                width={height}
                height={width}
                alt={alt}
                class="rounded-lg w-1/4"
                />
            <span class="text-sm md:text-lg">{item.name}</span>
            <span class="p-1 font-semibold">quantity:{item.quantity}</span>
            <span>totalPrice:{item.total}</span>
        </div>
    )
}

export default Display