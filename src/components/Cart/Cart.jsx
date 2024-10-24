'use client'
import {useContext } from "react";
import {StoreContext} from "../provider/Provider";
import { observer } from "mobx-react";
import Display from "./Display"

const Card = observer(() =>{
  const { currentCart, totalPrice} = useContext(StoreContext)
  return(
    <div class="flex flex-col border border-gray-100 shadow-xl rounded-lg m-4 ">
    <h1 class="text-2xl item-center justify-center flex text-blue-500 font-bold font-mono p-2">Cart</h1>
    <table class="table-auto">
      <thead >
          <tr class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
          <th >Items</th>
          <th >Price</th>
          <th >Quantity</th>
          <th >Total</th>
          </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
      { currentCart.length > 0 ?
        currentCart.map((object,i)=>{
          return(         
                <Display key={i} item={object}/>
          )
        }
      ):
      <span class="flex justify-end text-slate-400 font-semibold">Cart is empty</span>
      }
        </tbody>
      </table>
      <div class="flex flex-row justify-end mr-10 md:mr-56">
        <table>
        <thead >
            <tr>
              <th/>
              <th/>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800">
            <tr class="text-xs ">
                <td class="pt-2">
                    <span class="font-bold ">Sub Total: </span>
                </td>
                <td class="pt-2">
                  <span class="pl-10">{totalPrice}</span>
                </td>
            </tr>
            <tr class="text-xs ">
                <td class="pt-2">
                <span class="font-bold ">Taxes: </span>
                </td>
                <td class="pt-2">
                <span class="pl-10">{Math.round((totalPrice * 0.07) * 100)/100}</span>
                </td>
            </tr>
            <tr class="text-xs ">
                <td class="pt-2">
                  <span class="font-bold ">Grand Total: </span>
                </td>
                <td class="pt-2">
                  <span class="pl-10">{Math.round((totalPrice + (Math.round((totalPrice * 0.07) * 100)/100))*100)/100}</span>
                </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
  )
})

export default Card