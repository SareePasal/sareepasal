"use client";
import React, { useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from '../../lib/useCart'; 
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginModal from '../../components/Auth/LoginModal';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // <--- 1. Import the Optimizer

export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const [user] = useAuthState(auth);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const subtotal = cart.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.toString().replace('$', ''));
        return acc + (priceNum * (item.quantity || 1));
    }, 0);

    const handleCheckout = () => {
        if (!user) {
            setIsLoginOpen(true);
        } else {
            window.location.href = "/Checkout";
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-pink-600" />
                    Your Shopping Bag
                </h1>

                {cart && cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-[2] space-y-4">
                            {cart.map((item) => (
                                <div key={item.uniqueKey} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6">
                                    {/* 2. Optimized Image instead of <img> */}
                                    <div className="relative w-24 h-32 shrink-0">
                                        <Image 
                                            src={item.img || item.image} 
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded-xl"
                                        />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                            <p className="font-bold text-pink-600">{item.price}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">
                                            Size: {item.selectedSize} | Color: {item.selectedColor}
                                        </p>
                                        <button 
                                            onClick={() => removeFromCart(item.uniqueKey)}
                                            className="mt-6 text-red-400 hover:text-red-600 flex items-center gap-1 text-[10px] font-black uppercase transition-colors"
                                        >
                                            <Trash2 size={14} /> Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1">
                            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-pink-100 sticky top-32">
                                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4 text-gray-600 border-b pb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Estimated Shipping</span>
                                        <span className="text-green-600 font-bold tracking-widest text-xs">FREE</span>
                                    </div>
                                </div>
                                <div className="flex justify-between py-6">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold text-pink-700">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-pink-900/20 active:scale-95"
                                >
                                    PROCEED TO CHECKOUT <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner">
                        <p className="text-xl text-gray-400 mb-6">Your bag is empty.</p>
                        <Link href="/" className="bg-pink-900 text-white px-8 py-3 rounded-full font-bold inline-block">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <Footer />
        </main>
    );
}