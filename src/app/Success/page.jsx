'use client'
import Header from "../../components/Header/Header";
import PaymentSuccess from "../../components/Success/Success"
import Footer from "../../components/Footer/Footer"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function Success() {
    const searchParams = useSearchParams()
    const amount = searchParams.get('amount')
  return (
      <main class="flex flex-col h-dvh ">
      <Header/>
        <Suspense>
            <PaymentSuccess amount={amount}/>
        </Suspense>
      <Footer/>
    </main>
  );
}