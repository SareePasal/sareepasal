'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from '/src/components/provider/Provider';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const total = searchParams.get('total');
  const store = useStore();
  const [cartItems, setCartItems] = useState([]);
  const [specialRequest, setSpecialRequest] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  useEffect(() => {
    // Get cart items and shipping address from localStorage
    const savedCart = localStorage.getItem('sareePasalCart');
    const savedAddress = localStorage.getItem('sareePasalShippingAddress');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    }
    
    // Clear localStorage
    localStorage.removeItem('sareePasalCart');
    localStorage.removeItem('sareePasalShippingAddress');
  }, [store]);

  const sendConfirmationEmail = () => {
    let emailBody = `Dear Saree Pasal Team,\n\n`;
    emailBody += `I would like to confirm my recent purchase with the following details:\n\n`;
    
    // Shipping Address
    emailBody += `SHIPPING ADDRESS:\n`;
    emailBody += `${shippingAddress.name}\n`;
    emailBody += `${shippingAddress.street}\n`;
    emailBody += `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}\n`;
    emailBody += `Phone: ${shippingAddress.phone}\n\n`;
    
    // Order Items
    emailBody += `ORDER ITEMS:\n`;
    cartItems.forEach(item => {
      emailBody += `- ${item.name || 'Item'}`;
      if (item.color) emailBody += ` (Color: ${item.color})`;
      emailBody += `\n  Size: ${item.size || 'N/A'} | `;
      emailBody += `Qty: ${item.quantity || 1} | `;
      emailBody += `Price: $${(item.price * item.quantity).toFixed(2) || '0.00'}\n\n`;
    });

    emailBody += `ORDER TOTAL: $${total || '0.00'}\n\n`;
    emailBody += `SPECIAL REQUESTS: ${specialRequest || 'None'}\n\n`;
    emailBody += `Looking forward to receiving my order!\n\n`;
    emailBody += `Best regards,\n[Your Name]`;

    const subject = 'Sareepasal Purchase from Website';
    const mailtoLink = `mailto:sareepasalusa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 py-4 px-6 w-full">
        <h2 className="text-2xl font-bold text-white text-center font-serif">Saree Pasal</h2>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Success animation */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4 text-center">
              Payment Successful!
            </h1>
            
            <p className="text-gray-600 dark:text-slate-300 mb-6 text-center">
              Thank you for your purchase at Saree Pasal. Your order is being prepared with care.
            </p>

            {total && (
              <div className="space-y-6">
                {/* Shipping Address Section */}
                <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4 border border-blue-100 dark:border-slate-600">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Shipping Address
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-slate-300">{shippingAddress.name}</p>
                    <p className="text-gray-700 dark:text-slate-300">{shippingAddress.street}</p>
                    <p className="text-gray-700 dark:text-slate-300">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                    </p>
                    <p className="text-gray-700 dark:text-slate-300">Phone: {shippingAddress.phone}</p>
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="bg-pink-50 dark:bg-slate-700 rounded-lg p-4 sm:p-6 border border-pink-100 dark:border-slate-600">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700 dark:text-slate-300 font-medium">Order Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-pink-600 dark:text-pink-400">${total}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-pink-100 dark:border-slate-600">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200 mb-2">
                      Order Details
                    </h3>
                    
                    <div className="mb-4 max-h-48 overflow-y-auto pr-2">
                      {cartItems.length > 0 ? (
                        <ul className="space-y-3">
                          {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between items-start">
                              <div className="flex items-start flex-1 min-w-0">
                                {item.image ? (
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded mr-2 sm:mr-3 border border-gray-200 flex-shrink-0"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1pbWFnZSI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIvPjxwYXRoIGQ9Im0yMSAxNS0zLjUtMy41YTIgMiAwIDAgMC0yLjgyOCAwTDUgMjEiLz48L3N2Zz4=';
                                    }}
                                  />
                                ) : (
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded mr-2 sm:mr-3 border border-gray-200 flex items-center justify-center bg-gray-100 text-gray-400 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="font-medium truncate">
                                    {item.name}
                                    {item.color && (
                                      <span 
                                        className="inline-block w-3 h-3 rounded-full ml-2 border border-gray-300 align-middle"
                                        style={{ backgroundColor: item.color }}
                                      />
                                    )}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-slate-400">
                                    Size: {item.size || 'N/A'} | Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-medium ml-2 whitespace-nowrap">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 dark:text-slate-400 text-center py-4">No items found in your order</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="specialRequest" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Any special requests?
                      </label>
                      <textarea
                        id="specialRequest"
                        rows="3"
                        className="w-full p-2 sm:p-3 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="E.g., packaging preferences, delivery instructions, etc."
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={sendConfirmationEmail}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Confirmation Email
                    </button>
                    
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 text-center">
                      This will open your email client with your order details pre-filled
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/"
                    className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    Continue Shopping
                  </Link>
                  
                  <Link
                    href="/orders"
                    className="block w-full border border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-slate-700 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 text-center"
                  >
                    View Your Orders
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-700 py-4 px-6 text-center w-full">
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Need help? <Link href="/contact" className="text-pink-600 dark:text-pink-400 hover:underline">Contact us</Link>
        </p>
      </footer>
    </div>
  );
}