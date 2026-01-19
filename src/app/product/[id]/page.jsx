"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShoppingCart, Heart, Edit3, Save, X, Trash2, Plus, AlertTriangle, CheckCircle2, Loader2, Info, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../lib/useCart';

export default function ProductDetail({ params }) {
    const { id } = params;
    const [user] = useAuthState(auth);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Customer Selection States
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const addToCart = useCart((state) => state.addToCart);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const docSnap = await getDoc(doc(db, "products", id));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (!data.variants) data.variants = [];
                    setProductData(data);
                }
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        getProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleSaveLive = async () => {
        try {
            await updateDoc(doc(db, "products", id), productData);
            setIsEditing(false);
            alert("Live Inventory Updated! ✨");
        } catch (err) { alert("Save failed: " + err.message); }
    };

    // --- ADMIN HELPERS ---
    const addVariantRow = () => {
        const updatedVariants = [...(productData.variants || []), { color: "", size: "", qty: 1 }];
        setProductData({ ...productData, variants: updatedVariants });
    };
    const removeVariantRow = (index) => {
        const updatedVariants = productData.variants.filter((_, i) => i !== index);
        setProductData({ ...productData, variants: updatedVariants });
    };
    const updateVariantRow = (index, field, value) => {
        const updatedVariants = [...productData.variants];
        updatedVariants[index][field] = value;
        setProductData({ ...productData, variants: updatedVariants });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center animate-pulse text-pink-900 font-serif">Opening Saree Pasal...</div>;
    if (!productData) return <div className="p-20 text-center">Product not found.</div>;

    // --- CUSTOMER LOGIC ---
    const uniqueColors = [...new Set(productData.variants?.map(v => v.color))].filter(c => c !== "");
    const filteredSizes = productData.variants?.filter(v => v.color === selectedColor);
    const activeVariant = productData.variants?.find(v => v.color === selectedColor && v.size === selectedSize);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                {/* ADMIN TOOLBAR */}
                {isAdmin(user) && (
                    <div className="mb-10 p-6 bg-pink-900 rounded-3xl flex justify-between items-center shadow-xl border-4 border-pink-100">
                        <div className="text-white">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Admin Control</p>
                            <h2 className="text-xl font-serif font-bold italic">Store Editor Active</h2>
                        </div>
                        <button onClick={() => setIsEditing(!isEditing)} className="bg-white text-pink-900 px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-all">
                            {isEditing ? <><X size={18}/> Cancel</> : <><Edit3 size={18}/> Edit Details & Stock</>}
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT: IMAGE */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100">
                            <img src={productData.image} className="w-full h-full object-cover object-top" alt="" />
                        </div>
                    </div>

                    {/* RIGHT: CONTENT / EDITOR */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {isEditing ? (
                            /* --- ADMIN TABLE EDITOR --- */
                            <div className="space-y-6 p-8 bg-gray-50 rounded-[3rem] border-2 border-pink-200 border-dashed">
                                <div>
                                    <label className="text-[10px] font-bold text-pink-600 uppercase ml-2 tracking-widest font-mono">1. Title & Pricing</label>
                                    <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 mt-2 text-lg font-bold bg-white" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                    <div className="flex gap-4 mt-3">
                                        <div className="w-1/2">
                                            <label className="text-[9px] text-gray-400 font-bold uppercase ml-2">Sale Price</label>
                                            <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 font-bold text-pink-700 bg-white mt-1" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="text-[9px] text-gray-400 font-bold uppercase ml-2">Original Price (Was)</label>
                                            <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 text-gray-400 line-through bg-white mt-1" value={productData.oldPrice} onChange={e => setProductData({...productData, oldPrice: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-pink-600 uppercase ml-2 tracking-widest font-mono">2. Inventory Table</label>
                                    <div className="space-y-2 mt-2">
                                        {productData.variants?.map((v, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <input placeholder="Color" className="w-1/3 p-3 rounded-xl ring-1 ring-gray-200 text-sm font-bold bg-white" value={v.color} onChange={e => updateVariantRow(index, 'color', e.target.value)} />
                                                <input placeholder="Size" className="w-1/4 p-3 rounded-xl ring-1 ring-gray-200 text-sm font-bold bg-white" value={v.size} onChange={e => updateVariantRow(index, 'size', e.target.value)} />
                                                <input type="number" placeholder="Qty" className="w-1/4 p-3 rounded-xl ring-1 ring-gray-200 text-sm font-bold bg-white" value={v.qty} onChange={e => updateVariantRow(index, 'qty', Number(e.target.value))} />
                                                <button onClick={() => removeVariantRow(index)} className="p-2 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                                            </div>
                                        ))}
                                        <button onClick={addVariantRow} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold text-[10px] uppercase hover:border-pink-300 mt-2">
                                            + Add Variant Row
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-pink-600 uppercase ml-2 tracking-widest font-mono">3. Description</label>
                                    <textarea rows="4" className="w-full p-4 rounded-2xl ring-1 ring-gray-200 text-sm bg-white mt-1" value={productData.details} onChange={e => setProductData({...productData, details: e.target.value})} />
                                </div>

                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-6 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all">
                                    <Save size={20} /> SAVE ALL LIVE CHANGES
                                </button>
                            </div>
                        ) : (
                            /* --- CUSTOMER VIEW --- */
                            <>
                                <div>
                                    <span className="text-pink-600 font-bold text-[10px] tracking-[0.2em] uppercase bg-pink-50 px-4 py-1 rounded-full border border-pink-100">Code: {productData.code}</span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 leading-tight">{productData.title}</h1>
                                    
                                    {/* PRICE BOX WITH SALE LOGIC */}
                                    <div className="mt-8 space-y-3">
                                        {productData.isOnSale && (
                                            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-xl font-bold inline-flex items-center gap-2 shadow-lg text-sm">
                                                🔥 ON SALE! 🚀
                                            </motion.div>
                                        )}
                                        {/* PROFESSIONAL PRICE DISPLAY */}
<div className="mt-8 flex flex-col gap-4">
    {productData.oldPrice && (
        <div className="flex items-center gap-3">
            <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">
                On Sale
            </span>
            <span className="text-gray-400 text-lg line-through font-light">
                ${productData.oldPrice}
            </span>
        </div>
    )}

    <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-gray-500 uppercase tracking-tighter">
            {productData.oldPrice ? "Now" : "Price"}:
        </span>
        <span className="text-5xl font-serif font-bold text-pink-900 leading-none">
            {productData.price}
        </span>
    </div>
</div>
                                    </div>
                                </div>

                                <div className="space-y-10 py-10 border-y border-gray-100">
                                    {/* 1. COLORS */}
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-5 tracking-[0.2em]">1. Select Color</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {uniqueColors.map(c => (
                                                <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} className={`px-8 py-4 rounded-2xl border-2 font-bold transition-all ${selectedColor === c ? 'border-pink-900 bg-pink-900 text-white shadow-xl scale-105' : 'border-gray-100'}`}>{c}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. SIZES */}
                                    {selectedColor && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 mb-5 tracking-[0.2em]">2. Sizes for {selectedColor}</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {filteredSizes.map((v, i) => (
                                                    <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-xl transition-all 
                                                            ${selectedSize === v.size ? 'border-pink-900 bg-pink-50 text-pink-900 shadow-lg scale-110' : 'border-gray-100'} 
                                                            ${v.qty <= 0 ? 'opacity-30 cursor-not-allowed grayscale bg-gray-50' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {v.size}
                                                        {v.qty <= 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[2px] bg-red-500 -rotate-45" /></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. STOCK BADGE */}
                                    {activeVariant && (
                                        <div className="animate-in zoom-in-95">
                                            {activeVariant.qty > 0 ? (
                                                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-flex items-center gap-3 font-bold border border-green-100">
                                                    <CheckCircle2 size={20}/> 🌸 HURRY! Only {activeVariant.qty} items left!
                                                </div>
                                            ) : (
                                                <div className="bg-red-50 text-red-600 p-8 rounded-[2.5rem] flex items-center justify-center gap-4 border-4 border-red-100 animate-bounce">
                                                    <AlertTriangle size={32} />
                                                    <span className="text-4xl font-serif font-bold uppercase tracking-widest">SOLD OUT</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        disabled={!activeVariant || activeVariant.qty <= 0}
                                        onClick={() => {
                                            addToCart({...productData, selectedColor, selectedSize, uniqueKey: `${id}-${selectedColor}-${selectedSize}`});
                                            alert("🌸 Added to your Saree Pasal Bag!");
                                        }}
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-bold text-2xl shadow-xl disabled:bg-gray-300 disabled:shadow-none transition-all active:scale-95 hover:bg-pink-800"
                                    >
                                        <ShoppingCart className="inline mr-2" /> ADD TO BAG
                                    </button>
                                    <button className="flex-1 p-5 border border-gray-200 rounded-[2.5rem] flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-all"><Heart /></button>
                                </div>

                                {/* THE DESCRIPTION (BACK IN VIEW) */}
                                <div className="pt-12 border-t border-gray-100">
                                    <h3 className="text-2xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-3 italic">
                                        <Info size={24} /> Product Details
                                    </h3>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic bg-pink-50/20 p-8 rounded-[2rem] border border-pink-50">
                                        {productData.details || "A breathtaking selection from Saree Pasal, where tradition meets modern grace."}
                                    </div>
                                    <div className="mt-10 p-6 bg-gray-50 rounded-[2rem] flex flex-col gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 shadow-inner">
                                        <p className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-600"/> Hand-Picked Premium Quality</p>
                                        <p className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-600"/> Complementary Shipping on this order</p>
                                        <p className="flex items-center gap-3 text-red-400"><X size={16}/> Final Sale - No Returns or Exchanges</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}