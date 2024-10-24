import Image from 'next/image';

const Display = ({item}) =>{
    const { src,alt,height,width } = item.image[0]
    return (
        <tr class="text-xs ">
            <td class="w-6/12 md:w-3/12 p-3">
                <Image
                    src={src}
                    width={width}
                    height={height}
                    alt={alt}
                    class="rounded-lg"
                />
                <span class="text-xs md:text-md md:pr-10 text-wrap font-semibold text-clip flex justify-center mt-2">{item.name}</span>

            </td>
            <td>
                <span class="p-1 font-semibold flex justify-center">{item.price}</span>
            </td>
            <td>
                <span class="p-1 font-semibold flex justify-center">{item.quantity}</span>
            </td>
            <td>
                <span class="p-1 font-semibold flex justify-center" >{item.total}</span>
            </td>
        </tr>
    )
}

export default Display