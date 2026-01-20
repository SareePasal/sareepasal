"use client";
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Recommendations from "../Landing/Recommendations";
import ProductCard from "./ProductCard";
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ChevronUp, Loader2, ArrowUpDown } from 'lucide-react';

export default function CategoryView({ type, title, subtitle }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("newest");

    // Logic to check if an item is sold out (Aggressive check)
    const isActuallySoldOut = (item) => {
        const priceText = (item.price || "").toString().toUpperCase();
        const titleText = (item.title || "").toString().toUpperCase();
        if (priceText.includes("SOLD OUT") || titleText.includes("SOLD OUT")) return true;
        const hasVariants = item.variants && item.variants.length > 0;
        if (hasVariants) return item.variants.every(v => Number(v.qty) <= 0);
        return Number(item.quantity) === 0;
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // --- THE "SHOP ALL" LOGIC ---
                // If type is "all", we take every item. Otherwise, we filter by category.
                let filtered = type === "all" 
                    ? allItems 
                    : allItems.filter(item => item.type?.toLowerCase() === type?.toLowerCase());

                // Separate available items from sold out items
                const availableItems = filtered.filter(item => !isActuallySoldOut(item));
                const soldOutItems = filtered.filter(item => isActuallySoldOut(item));

                // Combine them: Available ones at the top, Sold Out at the bottom
                setProducts([...availableItems, ...soldOutItems]);
            } catch (err) { 
                console.error("Database Error:", err); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchItems();
        window.scrollTo(0, 0);
    }, [type]);

    // Sorting Logic (Price low/high)
    const getSortedProducts = () => {
        let list = [...products];
        const active = list.filter(item => !isActuallySoldOut(item));
        const soldOut = list.filter(item => isActuallySoldOut(item));

        const sortFn = (a, b) => {
            const priceA = parseFloat(a.price?.toString().replace(/[^0-9.]/g, "")) || 0;
            const priceB = parseFloat(b.price?.toString().replace(/[^0-9.]/g, "")) || 0;
            if (sortOrder === "low") return priceA - priceB;
            if (sortOrder === "high") return priceB - priceA;
            return 0;
        };

        return [...active.sort(sortFn), ...soldOut.sort(sortFn)];
    };

    const finalDisplayList = getSortedProducts();

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="bg-pink-50 py-16 px-4 text-center border-b border-pink-100">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-pink-950 italic">{title}</h1>
                <p className="text-pink-700/60 mt-4 text-sm font-bold uppercase tracking-[0.3em]">{subtitle}</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-end mb-10">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                        <ArrowUpDown size={14} className="text-pink-600" />
                        <select className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer text-gray-600" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="newest">Newest First</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center p-20"><Loader2 className="animate-spin text-pink-600" size={48} /></div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                        {finalDisplayList.map(item => <ProductCard key={item.id} product={item} />)}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}