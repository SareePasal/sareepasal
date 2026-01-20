"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShoppingCart, Heart, Edit3, Save, X, Trash2, Plus, AlertTriangle, CheckCircle2, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../../lib/useCart';

export default function ProductDetail({ params }) {
    const { id } = params;
    const [user] = useAuthState(auth);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
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

    // ADMIN TABLE HELPERS
    const addVariantRow = () => {
        const updated = [...(productData.variants || []), { color: "", size: "", qty: 1 }];
        setProductData({ ...productData, variants: updated });
    };
    const updateVariantRow = (index, field, value) => {
        const updated = [...productData.variants];
        updated[index][field] = value;
        setProductData({ ...productData, variants: updated });
    };
    const removeRow = (index) => {
        setProductData({ ...productData, variants: productData.variants.filter((_, i) => i !== index) });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pink-900 font-serif animate-pulse">Opening Saree Pasal...</div>;
    if (!productData) return <div className="p-20 text-center">Garment not found.</div>;

    // CUSTOMER LOGIC
    const uniqueColors = [...new Set(productData.variants?.map(v => v.color))].filter(c => c !== "");
    const filteredSizes = productData.variants?.filter(v => v.color === selectedColor);
    const activeVariant = productData.variants?.find(v => v.color === selectedColor && v.size === selectedSize);
    
    // Check if item is on Sale
    const isOnSale = productData.oldPrice && productData.oldPrice !== productData.price;

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                {/* ADMIN TOOLBAR */}
                {isAdmin(user) && (
                    <div className="mb-10 p-6 bg-pink-900 rounded-[2rem] flex justify-between items-center shadow-xl">
                        <div className="text-white"><h2 className="text-xl font-serif font-bold italic">Store Editor Active</h2></div>
                        <button onClick={() => setIsEditing(!isEditing)} className="bg-white text-pink-900 px-6 py-3 rounded-2xl font-bold shadow-lg">
                            {isEditing ? "Exit Editor" : "Edit Price & Stock"}
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT IMAGE */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100">
                            <img src={productData.image} className="w-full h-full object-cover object-top" alt="" />
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {isEditing ? (
                            /* --- ADMIN EDITOR VIEW --- */
                            <div className="space-y-6 p-8 bg-gray-50 rounded-[3rem] border-2 border-pink-200 border-dashed">
                                <input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                <div className="flex gap-4">
                                    <div className="w-1/2"><label className="text-[10px] font-bold text-pink-600">NOW PRICE</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold text-pink-700" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} /></div>
                                    <div className="w-1/2"><label className="text-[10px] font-bold text-gray-400">WAS PRICE</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 text-gray-400 line-through" value={productData.oldPrice} onChange={e => setProductData({...productData, oldPrice: e.target.value})} /></div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-pink-600 uppercase">Inventory (Color | Size | Qty)</label>
                                    {productData.variants?.map((v, i) => (
                                        <div key={i} className="flex gap-2"><input placeholder="Color" className="w-1/3 p-3 rounded-xl ring-1 ring-gray-200" value={v.color} onChange={e => updateVariantRow(i, 'color', e.target.value)} /><input placeholder="Size" className="w-1/4 p-3 rounded-xl ring-1 ring-gray-200" value={v.size} onChange={e => updateVariantRow(i, 'size', e.target.value)} /><input type="number" className="w-1/4 p-3 rounded-xl ring-1 ring-gray-200" value={v.qty} onChange={e => updateVariantRow(i, 'qty', Number(e.target.value))} /><button onClick={() => removeRow(i)} className="text-red-300"><Trash2/></button></div>
                                    ))}
                                    <button onClick={addVariantRow} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-400">+ Add Row</button>
                                </div>
                                <textarea placeholder="Product Description..." className="w-full p-4 rounded-2xl ring-1 ring-gray-200 h-32" value={productData.details} onChange={e => setProductData({...productData, details: e.target.value})} />
                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold shadow-xl"><Save className="inline mr-2"/> SAVE ALL CHANGES</button>
                            </div>
                        ) : (
                            /* --- CUSTOMER VIEW --- */
                            <>
                                <div>
                                    <span className="text-pink-600 font-bold text-[10px] tracking-widest uppercase bg-pink-50 px-4 py-1 rounded-full">Code: {productData.code}</span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4">{productData.title}</h1>
                                    
                                    <div className="mt-8 flex flex-col items-start gap-2">
                                        {isOnSale && (
                                            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-5 py-2 rounded-xl font-black flex items-center gap-2 shadow-lg text-sm">
                                                🔥 ON SALE! 🚀
                                            </motion.div>
                                        )}
                                        <div className="flex items-center gap-5">
                                            {isOnSale && <span className="text-2xl text-red-500 line-through font-bold opacity-60">Was {productData.oldPrice}</span>}
                                            <div className={`px-10 py-5 rounded-[2rem] shadow-2xl border-4 ${isOnSale ? 'bg-gray-900 border-green-500 text-green-400 animate-pulse' : 'bg-white border-pink-100 text-pink-700'}`}>
                                                <span className="text-3xl font-black italic">💰 {isOnSale ? `Now ${productData.price}` : productData.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10 py-10 border-y border-gray-100">
                                    {/* COLOR SELECTION */}
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-gray-400 mb-5 tracking-widest">1. Select Color</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {uniqueColors.map(c => (
                                                <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} className={`px-8 py-4 rounded-2xl border-2 font-bold transition-all ${selectedColor === c ? 'border-pink-900 bg-pink-900 text-white shadow-xl' : 'border-gray-100 hover:border-pink-200'}`}>{c}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SIZE SELECTION */}
                                    {selectedColor && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4">
                                            <h3 className="text-xs font-bold uppercase text-gray-400 mb-5 tracking-widest">2. Sizes for {selectedColor}</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {filteredSizes.map((v, i) => (
                                                    <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center font-bold text-xl transition-all ${selectedSize === v.size ? 'border-pink-900 bg-pink-50 text-pink-900 shadow-lg scale-110' : 'border-gray-100'} ${v.qty <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {v.size}
                                                        {v.qty <= 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[2px] bg-red-500 -rotate-45" /></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* STOCK BADGE */}
                                    {activeVariant && (
                                        <div className="animate-in zoom-in-95">
                                            {activeVariant.qty > 0 ? (
                                                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-flex items-center gap-3 font-bold border border-green-100 italic">
                                                    <CheckCircle2 size={20}/> HURRY! Only {activeVariant.qty} pieces left!
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
                                            addToCart({...productData, selectedColor, selectedSize, img: productData.image, uniqueKey: `${id}-${selectedColor}-${selectedSize}`});
                                            alert("🌸 Added to Bag!");
                                        }}
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-bold text-2xl shadow-xl disabled:bg-gray-300 transition-all active:scale-95"
                                    >
                                        <ShoppingCart className="inline mr-2" /> ADD TO BAG
                                    </button>
                                    <button className="flex-1 p-5 border border-gray-200 rounded-[2.5rem] flex items-center justify-center text-pink-600 hover:bg-pink-50"><Heart /></button>
                                </div>

                                <div className="pt-12 border-t border-gray-100">
                                    <h3 className="text-2xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-3 italic"><Info size={24} /> Product Details</h3>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic bg-pink-50/20 p-8 rounded-[2rem] border border-pink-50">{productData.details || "A breathtaking selection from Saree Pasal."}</div>
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