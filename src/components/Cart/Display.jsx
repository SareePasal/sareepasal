import Image from 'next/image';


const Display = ({item,increase,decrease}) =>{
    const { src,alt,height,width } = item.image[0]
    return (
        <tr class="text-xs border-b dark:border-slate-600 border-2">
            <td class="w-6/12 md:w-3/12 p-3">
                <Image
                    src={src}
                    width={width}
                    height={height}
                    alt={alt}
                    class="rounded-lg"
                />
                <span class="text-xs md:text-md md:pr-10 text-wrap font-semibold text-clip flex justify-center mt-2">{item.name}</span>
                <span class="text-xs md:text-md md:pr-10 text-wrap font-semibold text-clip flex justify-center mt-1">Color: {item.color}</span>
                <span class="text-xs md:text-md md:pr-10 text-wrap font-semibold text-clip flex justify-center mt-1">Size: {item.size}</span>
            </td>
            <td>
                <span class="p-1 font-semibold flex justify-center">{item.price}</span>
            </td>
            <td class="w-10">
                <div class="grid grid-cols-3 col-start-2 divide-x-4 border ">
                    <button class="fa-solid fa-plus" onClick={e=>increase(item.id)}></button>
                    <span class="font-semibold flex justify-center">{item.quantity}</span>
                    <button class="fa-solid fa-minus"  onClick={e=>decrease(item.id)}></button>
                </div>
            </td>
            <td>
                <span class="p-1 font-semibold flex justify-center" >{item.total}</span>
            </td>
        </tr>
    )
}

export default Display