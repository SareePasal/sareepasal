"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCart } from '../../lib/useCart';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar'; 

const Header = () => {
    const [user] = useAuthState(auth);
    const cart = useCart((state) => state.cart);

    const navLinks = [
        { name: 'Saree', href: '/Saree_All' },
        { name: 'Gown', href: '/Gown' },
        { name: 'Suit', href: '/Suit' },
        { name: 'Lehenga', href: '/Lehenga' },
        { name: 'Men', href: '/MensWear' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Moving Banner */}
            <div className="bg-pink-900 text-white py-2 overflow-hidden relative">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }} 
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="whitespace-nowrap flex gap-10 text-[10px] md:text-sm font-bold uppercase tracking-widest"
                >
                     <span>🔥 NEW Customer 5% Discount at checkout!!! 🔥</span>
                        <span>✨ FREE SHIPPING ON ALL ORDERS ✨</span>
                        <span>🔥 FESTIVE COLLECTION On SALE 🔥</span>
                        {/* We repeat the text here to make the loop seamless */}
            <span>🔥 NEW YEAR SALE IS LIVE - SHOP NOW 🔥</span>
            <span>✨ FREE SHIPPING ON ALL ORDERS ✨</span>
            <span>🔥 FESTIVE COLLECTION UP TO 50% OFF 🔥</span>
                </motion.div>
            </div>

            <nav className="max-w-7xl mx-auto px-4">
                {/* Main Row: Logo | Search (Desktop) | Icons */}
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                            <Image src="/SareePasalLogo.png" fill className="object-contain" alt="Logo" />
                        </div>
                        <span className="text-xl md:text-2xl font-serif font-bold text-pink-900 tracking-tighter">
                            Saree Pasal
                        </span>
                    </Link>

                    {/* Search Bar (Hidden on Mobile main row) */}
                    <div className="hidden lg:block flex-1 max-w-md mx-8">
                        <SearchBar />
                    </div>

                    {/* User Icons */}
                    <div className="flex items-center gap-3">
                        <Link href="/ShoppingCart" className="relative p-2 text-gray-700 hover:text-pink-600">
                            <ShoppingCart size={24} />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-2 border-l pl-3 border-gray-100">
                                {user.email === "sareepasalusa@gmail.com" && (
                                    <Link href="/Admin" className="hidden sm:block bg-gray-900 text-white px-2 py-1 rounded text-[8px] font-bold">ADMIN</Link>
                                )}
                                <img src={user.photoURL || ""} className="w-8 h-8 rounded-full border border-pink-200" alt="profile" />
                                <button onClick={() => signOut(auth)} className="text-gray-400 hover:text-red-500">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => signInWithPopup(auth, googleProvider)} className="bg-pink-50 text-pink-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-pink-900 hover:text-white transition-all">
                                LOGIN
                            </button>
                        )}
                    </div>
                </div>

                {/* --- MOBILE/TABLET LINKS BAR --- */}
                <div className="border-t border-gray-50 py-3 overflow-x-auto no-scrollbar">
                    <div className="flex justify-between lg:justify-center gap-6 min-w-max px-2">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-600 transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Search Bar (Only shows on phones) */}
                <div className="lg:hidden pb-4">
                    <SearchBar />
                </div>
            </nav>
        </header>
    );
};
export default Header;