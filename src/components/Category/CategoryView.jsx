"use client";
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Recommendations from "../Landing/Recommendations";
import ProductCard from "./ProductCard";
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ChevronUp, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryView({ type, title, subtitle }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // DEBUG LOG: This will show us the real data in the browser console
                console.log("All Products from Cloud:", allItems);
                console.log("Looking for Type:", type);

                const filtered = allItems.filter(item => 
                    item.type?.toLowerCase() === type?.toLowerCase()
                );

                setProducts(filtered);
            } catch (err) { 
                console.error("Database Error:", err); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchItems();
        window.scrollTo(0, 0);
    }, [type]);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* Elegant Header for the Category */}
            <div className="bg-pink-50 py-16 px-4 text-center border-b border-pink-100 relative overflow-hidden">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                    <div className="flex justify-center mb-4 text-pink-600"><Sparkles size={32} /></div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-pink-950 tracking-tight italic">{title}</h1>
                    <p className="text-pink-700/60 mt-4 text-lg font-medium tracking-widest uppercase">{subtitle}</p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 text-pink-900">
                        <Loader2 className="animate-spin mb-4" size={48} />
                        <p className="font-serif italic text-xl">Opening the {type} collection...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map(item => <ProductCard key={item.id} product={item} />)
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 p-10">
                                <p className="text-gray-400 font-serif italic text-lg mb-2">No {type}s found in the cloud.</p>
                                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                                    Admin: Go to <strong>Admin &gt; Inventory</strong>, click Edit on a product, and ensure the 
                                    "Category Type" dropdown is set to <strong>{type}</strong>.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* "COMPLETE YOUR LOOK" Section */}
            <section className="bg-gray-50 py-24 border-t border-gray-100 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold text-pink-950 mb-12 italic">More Treasures to Explore</h2>
                    <Recommendations />
                </div>
            </section>

            {/* BACK TO TOP BUTTON */}
            <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-10 right-10 bg-white shadow-2xl p-5 rounded-full text-pink-900 border border-pink-50 hover:bg-pink-900 hover:text-white z-40 transition-all shadow-pink-200"
            >
                <ChevronUp size={24} />
            </button>

            <Footer />
        </main>
    );
}