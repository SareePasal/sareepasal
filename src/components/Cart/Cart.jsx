'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../provider/Provider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { observer } from 'mobx-react';
import Display from './Display';
import convertToCents from '../../utils/convertToCents';
import CheckoutElement from './Checkout';
import Link from 'next/link';

if (!process.env.NEXT_PUBLIC_P_S_KEY) {
  throw new Error('Next public key not defined');
}

const Card = observer(() => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [stateTaxRate, setStateTaxRate] = useState(0);

  const stateTaxRates = {
    '': 0,
    'Alabama': 0.04,
    'Alaska': 0,
    'Arizona': 0.056,
    'Arkansas': 0.065,
    'California': 0.0725,
    'Colorado': 0.029,
    'Connecticut': 0.0635,
    'Delaware': 0,
    'Florida': 0.06,
    'Georgia': 0.04,
    'Hawaii': 0.04,
    'Idaho': 0.06,
    'Illinois': 0.0625,
    'Indiana': 0.07,
    'Iowa': 0.06,
    'Kansas': 0.065,
    'Kentucky': 0.06,
    'Louisiana': 0.0445,
    'Maine': 0.055,
    'Maryland': 0.06,
    'Massachusetts': 0.0625,
    'Michigan': 0.06,
    'Minnesota': 0.06875,
    'Mississippi': 0.07,
    'Missouri': 0.04225,
    'Montana': 0,
    'Nebraska': 0.055,
    'Nevada': 0.0685,
    'New Hampshire': 0,
    'New Jersey': 0.06625,
    'New Mexico': 0.05125,
    'New York': 0.04,
    'North Carolina': 0.0475,
    'North Dakota': 0.05,
    'Ohio': 0.0575,
    'Oklahoma': 0.045,
    'Oregon': 0,
    'Pennsylvania': 0.06,
    'Rhode Island': 0.07,
    'South Carolina': 0.06,
    'South Dakota': 0.045,
    'Tennessee': 0.07,
    'Texas': 0.0625,
    'Utah': 0.0485,
    'Vermont': 0.06,
    'Virginia': 0.043,
    'Washington': 0.065,
    'West Virginia': 0.06,
    'Wisconsin': 0.05,
    'Wyoming': 0.04
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    handleDarkModeChange(mediaQuery); // Initial check
    mediaQuery.addEventListener('change', handleDarkModeChange);
    return () => mediaQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_P_S_KEY));
  const { currentCart, increaseQuantityInCart, decreaseQuantityInCart, totalPrice, clearCart } =
    useContext(StoreContext);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setStateTaxRate(stateTaxRates[state] || 0);
  };

  const taxes = Math.round(totalPrice * stateTaxRate * 100) / 100;
  const grandTotal = Math.round((totalPrice + taxes) * 100) / 100;

  const elementOptions = {
    mode: 'payment',
    amount: convertToCents(grandTotal),
    currency: 'usd',
    appearance: {
      theme: isDarkMode ? 'night' : 'stripe',
    },
  };

  // Persist cart items in localStorage
  useEffect(() => {
    if (currentCart.length > 0) {
      localStorage.setItem('sareePasalCart', JSON.stringify(currentCart));
    }
  }, [currentCart]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sareePasalCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length > 0) {
        // Update the cart state in the store
        // Assuming your store has a method to set the cart
        // Example: setCart(parsedCart);
      }
    }
  }, []);

  // Clear cart only after successful payment
  const handlePaymentSuccess = () => {
    clearCart(); // Clear the cart
    localStorage.removeItem('sareePasalCart'); // Remove cart from localStorage
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 font-serif mb-2">
            Saree Pasal
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-slate-300">
            Your Shopping Cart
          </h2>
        </div>

        {/* Warning Note */}
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-400 text-yellow-700 dark:text-yellow-100 p-4 mb-6 rounded-md shadow-md">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">Do not refresh this page unless you complete your transaction or you will lose your cart items.</p>
          </div>
        </div>

        {/* Cart Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Table with Horizontal Scrolling for Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-100 dark:bg-slate-700">
                <tr className="text-sm md:text-base border-b dark:border-slate-600 border-slate-300 font-medium p-4 text-slate-700 dark:text-slate-200">
                  <th className="p-3 md:p-4 text-left">Product</th>
                  <th className="p-3 md:p-4 text-center">Price</th>
                  <th className="p-3 md:p-4 text-center">Quantity</th>
                  <th className="p-3 md:p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentCart.length > 0 ? (
                  currentCart.map((object, i) => (
                    <Display
                      key={i}
                      item={object}
                      increase={increaseQuantityInCart}
                      decrease={decreaseQuantityInCart}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 dark:text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg font-medium">Your cart is empty</p>
                        <Link href="/" className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition duration-300">
                          Continue Shopping
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          {currentCart.length > 0 && (
            <div className="p-6 border-t dark:border-slate-700">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-6 md:mb-0">
                  <Link href="/products" className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition duration-300">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg shadow-inner w-full md:w-96">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-4 border-b pb-2 dark:border-slate-600">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-slate-300">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="state" className="text-sm text-gray-600 dark:text-slate-300 mb-1">Shipping State</label>
                      <select
                        id="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        className="border border-gray-300 dark:border-slate-600 rounded-md px-3 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">Select your state</option>
                        {Object.keys(stateTaxRates).filter(state => state !== '').map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    {selectedState && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-slate-300">
                          Tax ({selectedState} - {(stateTaxRate * 100).toFixed(2)}%)
                        </span>
                        <span className="font-medium">${taxes.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t dark:border-slate-600 pt-3 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-800 dark:text-slate-200">Grand Total</span>
                        <span className="text-pink-600 dark:text-pink-400">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    {selectedState ? (
                      <Link
                      href={{
                        pathname: "/Checkout",
                        query: { 
                          taxes: taxes.toFixed(2),
                          grandTotal: grandTotal.toFixed(2) 
                        }
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md shadow-md transition duration-300 flex items-center justify-center"
                    >
                      Proceed to Checkout
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    ) : (
                      <button
                        className="w-full bg-gray-400 cursor-not-allowed text-white font-bold py-3 px-4 rounded-md shadow-md flex items-center justify-center"
                        disabled
                      >
                        Proceed to Checkout
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                    {!selectedState && currentCart.length > 0 && (
                      <p className="text-red-500 text-sm mt-2 text-center">
                        Please select your state to proceed to checkout
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Card;