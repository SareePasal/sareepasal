'use client'
import { useContext,useState } from "react";
import { StoreContext } from "../provider/Provider";
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { observer } from "mobx-react";
import Display from "./Display"
import Link from 'next/link';
import convertToCents from '../../utils/convertToCents'
import CheckoutElement from "./CheckoutPage";

if (process.env.NEXT_PUBLIC_P_S_KEY == undefined){
  throw new Error("Next pub not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_P_S_KEY)

const Card = observer(() =>{
  const { currentCart,increaseQuantityInCart,decreaseQuantityInCart, totalPrice} = useContext(StoreContext)
  const [amount,setAmount] = useState(totalPrice)
  return(
    <div class="flex flex-col border border-gray-100 shadow-xl rounded-lg m-4 bg-white dark:bg-slate-800 ">
    <h1 class="text-2xl item-center justify-center flex text-blue-500 dark:text-slate-200 font-bold font-mono p-2">Cart</h1>
    <table class="table-auto">
      <thead >
          <tr class="text-xs md:text-lg border-b dark:border-slate-600 border-slate-300 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
          <th >Items</th>
          <th >Price</th>
          <th >Quantity</th>
          <th >Total</th>
          </tr>
      </thead>
      <tbody class="">
      { currentCart.length > 0 ?
        currentCart.map((object,i)=>{
          return(         
                <Display key={i} item={object} increase={increaseQuantityInCart} decrease={decreaseQuantityInCart}/>
          )
        }
      ):
      <span class="flex justify-end text-slate-400 font-semibold dark:text-slate-200">Cart is empty</span>
      }
        </tbody>
      </table>
      { currentCart.length > 0 &&
      <div class="flex flex-row justify-end mr-10 md:mr-56">
        <table>
          <thead >
              <tr>
                <th/>
                <th/>
              </tr>
          </thead>
          <tbody class="">
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
                <span class="pl-10">{totalPrice}</span>
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
    }
      { totalPrice && totalPrice > 0 &&
        <div class="flex justify-center flux-row mt-10 md:mb-10 mb-2 ">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToCents(totalPrice),
            currency: "usd"
          }}>
            <CheckoutElement amount={totalPrice}/>
        </Elements>
      </div>
      }
  </div>
  )
})

export default Card