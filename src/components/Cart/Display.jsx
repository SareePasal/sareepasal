'use client';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';

const Display = observer(({ item, increase, decrease }) => {
  // Safely handle missing values
  const price = Number(item?.price) || 0;
  const quantity = Number(item?.quantity) || 0;
  const total = (price * quantity).toFixed(2);
  const { src,alt,height,width } = item.image[0]

  return (
    <tr className="border-b dark:border-slate-600 border-slate-300">
      {/* Item with thumbnail */}
      <td className="p-4 text-left">
        <div className="flex items-center">
          <Image 
            src={src} 
            alt={item.name}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded mr-4"
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-slate-200">
              {item.name}
            </p>
            {item.color && (
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Color: {item.color}
              </p>
            )}
            {item.size && (
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Size: {item.size}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-4 text-center">${price.toFixed(2)}</td>

      {/* Quantity Controls */}
      <td className="p-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => decrease(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => increase(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="p-4 text-right">${total}</td>
    </tr>
  );
});

export default Display;