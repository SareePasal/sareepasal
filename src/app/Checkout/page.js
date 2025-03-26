'use client';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '@/components/Cart/Checkout';  // Adjust the import path

// Load the Stripe.js library
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const totalPrice = 100; // Replace with actual total price from cart
  const taxes = Math.round(totalPrice * 0.07 * 100) / 100; // 7% tax
  const grandTotal = Math.round((totalPrice + taxes) * 100) / 100;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-4">
      <Elements stripe={stripePromise}>
        <Checkout amount={grandTotal} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;