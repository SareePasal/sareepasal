"use client";
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductCard from "./ProductCard";
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Tag, Percent, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SaleView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaleItems = async () => {
            try {
                // 1. Get ALL products from the cloud
                const querySnapshot = await getDocs(collection(db, "products"));
                const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // 2. SMART FILTER: An item is on sale if:
                // - You clicked the 'Sale' badge in Admin OR
                // - It has an 'oldPrice' (Was price) set in the database
                const filtered = allItems.filter(item => {
                    const hasSaleBadge = item.isOnSale === true;
                    const hasOldPrice = item.oldPrice && item.oldPrice.length > 0;
                    return hasSaleBadge || hasOldPrice;
                });

                // 3. Separate Sold Out items to the bottom
                const available = filtered.filter(item => {
                    const isSoldOut = (item.variants?.length > 0) ? item.variants.every(v => Number(v.qty) <= 0) : (Number(item.quantity) === 0);
                    return !isSoldOut;
                });
                const soldOut = filtered.filter(item => {
                    const isSoldOut = (item.variants?.length > 0) ? item.variants.every(v => Number(v.qty) <= 0) : (Number(item.quantity) === 0);
                    return isSoldOut;
                });

                setProducts([...available, ...soldOut]);
            } catch (err) { 
                console.error("Sale Page Error:", err); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchSaleItems();
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />
            
            {/* HIGH-ENERGY SALE HEADER */}
            <div className="bg-gradient-to-br from-red-600 via-pink-700 to-pink-900 py-24 px-4 text-center text-white relative overflow-hidden">
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute -top-20 -right-20 opacity-10"
                >
                    <Percent size={300} />
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-center mb-4 text-yellow-400">
                        <Sparkles size={40} className="animate-pulse" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter italic drop-shadow-2xl">
                        Boutique Outlet
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl uppercase tracking-[0.4em] font-black text-yellow-300">
                        Flash Sale: Limited Stock Remaining
                    </p>
                    <div className="mt-8 inline-block bg-white text-red-600 px-10 py-3 rounded-full font-black text-sm shadow-2xl">
                        UP TO 50% OFF
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20">
                        <Loader2 className="animate-spin text-red-600 mb-4" size={48} />
                        <p className="font-serif italic text-xl text-gray-400">Finding the best deals for you...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map(item => <ProductCard key={item.id} product={item} />)
                        ) : (
                            <div className="col-span-full py-40 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <Tag className="mx-auto text-gray-300 mb-4" size={48} />
                                <p className="text-gray-400 font-serif italic text-2xl">No items on sale right now.</p>
                                <p className="text-gray-500 mt-2 italic text-sm">
                                    Admin: Set a "Was Price" (Original Price) in the Inventory tab to show items here!
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}