"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function LoginModal({ isOpen, onClose }) {
    const handleGoogleLogin = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        onClose();
    } catch (error) {
        console.error("Login Error:", error);
        // This will now show the REAL error code like 'auth/invalid-api-key'
        alert("Login failed: " + error.code); 
    }
};

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Dark Background Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-pink-900/40 backdrop-blur-sm"
                    />

                    {/* The Modal Box */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden"
                    >
                        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-pink-600">
                            <X size={24} />
                        </button>

                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LogIn className="text-pink-600" size={32} />
                            </div>
                            
                            <h2 className="text-3xl font-serif font-bold text-pink-900 mb-2">Welcome</h2>
                            <p className="text-gray-500 mb-8 text-sm px-6">
                                Log in to save your cart, track orders, and experience the best of Saree Pasal.
                            </p>

                            {/* Gmail Login Button */}
                            <button 
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-100 py-4 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-pink-200 transition-all shadow-sm"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" />
                                <span>Continue with Google</span>
                            </button>

                            <p className="mt-8 text-xs text-gray-400">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}