"use client";
import React, { useState } from 'react';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useCart } from '@/lib/useCart'; // Grabs the cart memory
import { auth } from '@/lib/firebase'; // Grabs the login brain
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginModal from '@/components/Auth/LoginModal';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    // 1. Listen to the Cart and Login status
    const { cart, removeFromCart } = useCart();
    const [user] = useAuthState(auth);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const router = useRouter();

    // 2. Math to get the total
    const subtotal = cart.reduce((acc, item) => {
        // Remove '$' and convert to number
        const priceNum = parseFloat(item.price.toString().replace('$', ''));
        return acc + (priceNum * item.quantity);
    }, 0);

    // 3. Logic for the checkout button
    const handleCheckout = () => {
    if (!user) {
        setIsLoginOpen(true);
    } else {
        router.push('/Checkout'); // <--- THIS TAKES THEM TO THE NEW PAGE
    }
};

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-pink-600" />
                    Your Shopping Cart
                </h1>

                {cart && cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT SIDE: ITEMS */}
                        <div className="flex-[2] space-y-4">
                            {cart.map((item) => (
                                <div key={item.uniqueKey} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6">
                                    {/* This line looks for 'img', and if it's empty, it looks for 'image' */}
<img 
    src={item.img || item.image} 
    className="w-24 h-32 object-cover rounded-xl" 
    alt={item.title} 
/>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="font-bold text-pink-600">{item.price}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                                        <button 
                                            onClick={() => removeFromCart(item.uniqueKey)}
                                            className="mt-4 text-red-400 hover:text-red-600 flex items-center gap-1 text-xs font-bold"
                                        >
                                            <Trash2 size={14} /> REMOVE
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT SIDE: SUMMARY */}
                        <div className="flex-1">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 sticky top-32">
                                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4 text-gray-600 border-b pb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Estimated Shipping</span>
                                        <span className="text-green-600 font-bold tracking-widest">FREE</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-6">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold text-pink-700">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-pink-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-pink-800 transition-all shadow-xl shadow-pink-900/20"
                                >
                                    PROCEED TO CHECKOUT <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner">
                        <p className="text-xl text-gray-400 mb-6">Your cart is currently empty.</p>
                        <Link href="/" className="bg-pink-900 text-white px-8 py-3 rounded-full font-bold inline-block">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            {/* Hidden Pop-up that only shows when handleCheckout triggers it */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <Footer />
        </main>
    );
}