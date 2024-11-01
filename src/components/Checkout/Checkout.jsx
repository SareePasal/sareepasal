'use client'
import React,{useEffect,useState} from 'react'; 
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js'
import convertToCents from '@/utils/convertToCents';

const Checkout = (amount) => {
    const paymentElementOptions = {
        type: 'accordion',
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: false
      };
    console.log(amount.amount)
    const stripe = useStripe();
    const elements = useElements;
    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        fetch("/api/payment",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({amount: convertToCents(amount.amount)})
        })
        .then((res)=> res.json())
        .then((data)=> setClientSecret(data.clientSecret))
    },[amount.amount])
    return(
        <form>
            <input
          id="email"
          type="text"
          class="border p-3"
          placeholder="Enter email address"
        />
            {clientSecret && <PaymentElement class="dark:text-white" options={paymentElementOptions}/>}
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 my-2 px-5 rounded-lg">Pay {amount.amount}</button>
        </form>
    )
}

export default Checkout