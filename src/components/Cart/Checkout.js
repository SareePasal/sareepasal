'use client';
import { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StoreContext } from '../provider/Provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ shippingAddress, billingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const searchParams = useSearchParams();
  const grandTotal = parseFloat(searchParams.get('grandTotal')) || 0;
  const taxes = parseFloat(searchParams.get('taxes')) || 0;
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    // Save addresses to localStorage for payment success page
    localStorage.setItem('sareePasalShippingAddress', JSON.stringify(shippingAddress));
    if (billingAddress) {
      localStorage.setItem('sareePasalBillingAddress', JSON.stringify(billingAddress));
    }

    // Create a payment intent on your server
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: grandTotal * 100, // Convert to cents
        shippingAddress,
        billingAddress
      }),
    });

    const { clientSecret } = await response.json();

    // Confirm the payment on the client side
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      setLoading(false);
      // Redirect to success page with total amount
      setTimeout(() => {
        router.push(`/payment-success?total=${grandTotal}`);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-pink-50 dark:bg-slate-700 p-4 rounded-lg border border-pink-200 dark:border-slate-600 shadow-sm">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#4a5568',
                '::placeholder': {
                  color: '#a0aec0',
                },
                iconColor: '#d53f8c',
              },
            },
            hidePostalCode: true
          }}
        />
      </div>
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg flex items-center animate-fade-in">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      {paymentSuccess && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg flex items-center animate-fade-in">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Payment successful! Redirecting...
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.01] ${
          (!stripe || loading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${grandTotal.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const [sameAddress, setSameAddress] = useState(true);
  const { totalPrice, cartItems = [] } = useContext(StoreContext);
  const searchParams = useSearchParams();
  const grandTotal = parseFloat(searchParams.get('grandTotal')) || 0;
  const taxes = parseFloat(searchParams.get('taxes')) || 0;

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const [billingAddress, setBillingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Persist cart data for payment success page
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('sareePasalCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-pink-200 dark:bg-rose-900/30 rounded-full blur-xl opacity-70"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 font-serif mb-3 tracking-tight">
            Saree Pasal
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-slate-300">
            Complete Your Purchase
          </h2>
          <p className="text-pink-600 dark:text-pink-300 mt-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Checkout
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-pink-100 dark:border-slate-700">
          {/* Progress Steps */}
          <div className="relative px-8 py-6 border-b dark:border-slate-700 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800">
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm mt-2 text-pink-600 dark:text-pink-400 font-medium">Cart</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm mt-2 text-pink-600 dark:text-pink-400 font-medium">Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 border-2 border-pink-600 dark:border-pink-400 flex items-center justify-center font-bold shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-sm mt-2 text-gray-600 dark:text-slate-400 font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column - Forms */}
              <div>
                {/* Shipping Address */}
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                      Shipping Address
                    </h2>
                  </div>
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                        required
                        value={shippingAddress.name}
                        onChange={handleShippingChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        placeholder="Street address"
                        className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                        required
                        value={shippingAddress.street}
                        onChange={handleShippingChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="zip"
                          placeholder="ZIP/Postal code"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={shippingAddress.zip}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone number"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Billing Address Toggle */}
                <div className="flex items-center mb-8 p-4 bg-pink-50 dark:bg-slate-700/50 rounded-lg border border-pink-100 dark:border-slate-600">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAddress}
                    onChange={(e) => setSameAddress(e.target.checked)}
                    className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-slate-600 rounded"
                  />
                  <label htmlFor="sameAddress" className="ml-3 block text-sm text-gray-700 dark:text-slate-300">
                    Billing address is the same as shipping address
                  </label>
                </div>

                {!sameAddress && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                        Billing Address
                      </h2>
                    </div>
                    <form className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={billingAddress.name}
                          onChange={handleBillingChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          placeholder="Street address"
                          className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          value={billingAddress.street}
                          onChange={handleBillingChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            required
                            value={billingAddress.city}
                            onChange={handleBillingChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">State</label>
                          <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            required
                            value={billingAddress.state}
                            onChange={handleBillingChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Postal Code</label>
                          <input
                            type="text"
                            name="zip"
                            placeholder="ZIP/Postal code"
                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            required
                            value={billingAddress.zip}
                            onChange={handleBillingChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            required
                            value={billingAddress.phone}
                            onChange={handleBillingChange}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Payment Section */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                      Payment Method
                    </h2>
                  </div>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      shippingAddress={shippingAddress} 
                      billingAddress={sameAddress ? shippingAddress : billingAddress} 
                    />
                  </Elements>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="bg-gradient-to-b from-pink-50 to-rose-50 dark:from-slate-700 dark:to-slate-800 p-8 rounded-2xl shadow-inner border border-pink-100 dark:border-slate-700">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200">
                      Order Summary
                    </h2>
                  </div>
                  
                  {/* Order Items Preview */}
                  <div className="mb-6 max-h-64 overflow-y-auto pr-2">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-slate-300 mb-3">Your Items</h3>
                    {cartItems && cartItems.length > 0 ? (
                      <ul className="space-y-4">
                        {cartItems.map((item, index) => (
                          <li key={index} className="flex items-start">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded mr-3 border border-gray-200"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZSI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjxwYXRoIGQ9Im0yMSAxNS0zLjUtMy41YTIgMiAwIDAgMC0yLjgyOCAwTDUgMjEiLz48L3N2Zz4=';
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded mr-3 border border-gray-200 flex items-center justify-center bg-gray-100 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 dark:text-slate-200 truncate">
                                {item.name}
                                {item.color && (
                                  <span 
                                    className="inline-block w-3 h-3 rounded-full ml-2 border border-gray-300 align-middle"
                                    style={{ backgroundColor: item.color }}
                                  />
                                )}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-slate-400">
                                Size: {item.size || 'N/A'} | Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-slate-400 py-4">Your cart is empty</p>
                    )}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b border-pink-100 dark:border-slate-700">
                      <span className="text-gray-600 dark:text-slate-300">Subtotal</span>
                      <span className="text-gray-800 dark:text-slate-200">${(grandTotal - taxes).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-pink-100 dark:border-slate-700">
                      <span className="text-gray-600 dark:text-slate-300">Taxes</span>
                      <span className="text-gray-800 dark:text-slate-200">${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span className="text-lg font-bold text-gray-800 dark:text-slate-200">Grand Total</span>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-700/50 border border-pink-200 dark:border-slate-600 rounded-xl p-5 mb-8 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-6 h-6 text-pink-500 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-pink-600 dark:text-pink-400 mb-1">Secure Payment</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300">
                          Your payment information is processed securely. We don't store your credit card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="/Cart" className="inline-flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition duration-300 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;