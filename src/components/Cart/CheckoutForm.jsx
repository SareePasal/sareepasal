'use client';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStore } from '../provider/Provider'; // Adjust the import path
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { totalPrice, clearCart } = useStore(); // Destructure clearCart from the context
  const router = useRouter();

  const taxes = Math.round(totalPrice * 0.07 * 100) / 100; // 7% tax
  const grandTotal = Math.round((totalPrice + taxes) * 100) / 100;

  useEffect(() => {
    console.log('Payment success state updated:', paymentSuccess);
  }, [paymentSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create a PaymentIntent
      console.log('Creating PaymentIntent...');
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: grandTotal * 100 }), // Convert to cents
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to create PaymentIntent:', errorData);
        throw new Error('Failed to create PaymentIntent');
      }

      const { clientSecret } = await response.json();
      console.log('PaymentIntent created with clientSecret:', clientSecret);

      if (!clientSecret) {
        throw new Error('Client secret is missing');
      }

      // Step 2: Confirm the payment
      console.log('Confirming payment...');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error('Payment confirmation failed:', error);
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        setPaymentSuccess(true);
        clearCart(); // Clear the cart

        // Show thank you pop-up
        toast.success(
          `🎉 Thank you for your purchase! 🎉\n\nYour payment of $${grandTotal.toFixed(
            2
          )} was successful.\n\nYou will be redirected to the home page shortly.`
        );

        // Redirect to home page after 5 seconds
        setTimeout(() => {
          console.log('Redirecting to home page...');
          router.push('/');
        }, 5000); // Redirect after 5 seconds
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      setError('An error occurred during payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

      {/* Display error message */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      {/* Pay Now Button */}
      <button
        type="submit"
        disabled={!stripe || loading || paymentSuccess} // Disable after payment success
        className={`w-full ${
          paymentSuccess ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 rounded-md shadow-md flex items-center justify-center`}
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : paymentSuccess ? (
          'Payment Successful!'
        ) : (
          'Pay Now'
        )}
      </button>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-center" autoClose={5000} />
    </form>
  );
};