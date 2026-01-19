"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCart } from '../../lib/useCart';
import { motion } from 'framer-motion'; // <--- THIS WAS MISSING AND CAUSED THE ERROR
import SearchBar from './SearchBar'; 

const Header = () => {
    const [user] = useAuthState(auth);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const cart = useCart((state) => state.cart);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* --- THE SCROLLING URGENCY BANNER --- */}
            <Link href="/Sale" className="block group">
                <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white text-center py-3 text-sm font-black uppercase tracking-[0.3em] hover:from-black hover:to-black transition-all cursor-pointer shadow-lg overflow-hidden relative">
                    <motion.div 
    animate={{ x: ["0%", "-100%"] }} // Changed direction for a smoother "infinite" feel
    transition={{ 
        repeat: Infinity, 
        duration: 30, // Increase this number to slow it down further
        ease: "linear" 
    }}
    className="whitespace-nowrap flex gap-20"
>
                        <span>🔥 NEW Customer 5% Discount at checkout!!! 🔥</span>
                        <span>✨ FREE SHIPPING ON ALL ORDERS ✨</span>
                        <span>🔥 FESTIVE COLLECTION On SALE 🔥</span>
                    </motion.div>
                </div>
            </Link>

            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 shrink-0">
                        <Image src="/SareePasalLogo.png" width={45} height={45} alt="Logo" />
                        <span className="text-xl font-serif font-bold text-pink-900 hidden sm:block">
                            Saree Pasal
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex space-x-6 text-xs font-bold uppercase tracking-widest text-gray-600">
                        <Link href="/Saree_All" className="hover:text-pink-600 transition-colors">Saree</Link>
                        <Link href="/Gown" className="hover:text-pink-600 transition-colors">Gown</Link>
                        <Link href="/Suit" className="hover:text-pink-600 transition-colors">Suit</Link>
                        <Link href="/Lehenga" className="hover:text-pink-600 transition-colors">Lehenga</Link>
                        <Link href="/MensWear" className="hover:text-pink-600 transition-colors">Men</Link>
                    </div>

                    {/* THE SEARCH BAR */}
                    <div className="flex-1 max-w-xs mx-4">
                        <SearchBar />
                    </div>

                    {/* User Icons & Actions */}
                    <div className="flex items-center space-x-4">
                        <Link href="/ShoppingCart" className="relative text-gray-700 hover:text-pink-600 transition-all">
                            <ShoppingCart className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                {user.email === "sareepasalusa@gmail.com" && (
                                    <Link href="/Admin" className="bg-gray-900 text-white px-3 py-1 rounded-md text-[9px] font-black tracking-tighter hover:bg-pink-600 transition-all">
                                        ADMIN PANEL
                                    </Link>
                                )}
                                <img src={user.photoURL} className="w-8 h-8 rounded-full border border-pink-100" alt="user" />
                                <button onClick={() => signOut(auth)} className="text-gray-400 hover:text-red-500">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="flex items-center space-x-1 bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-xs font-bold border border-pink-100 hover:bg-pink-100 transition-all">
                                <User size={16} />
                                <span>LOGIN</span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;