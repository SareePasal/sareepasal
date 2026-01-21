"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShoppingCart, Heart, Edit3, Save, X, Trash2, Plus, AlertTriangle, CheckCircle2, Loader2, Info, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../lib/useCart';

// Swiper Components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export default function ProductDetail({ params }) {
    const { id } = params;
    const [user] = useAuthState(auth);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Image Handling States
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);

    // Customer Selection States
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const addToCart = useCart((state) => state.addToCart);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const docSnap = await getDoc(doc(db, "products", id));
                if (docSnap.exists()) {
                    setProductData(docSnap.data());
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
            alert("Changes saved to cloud! ✨");
        } catch (err) { alert(err.message); }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pink-900 font-serif animate-pulse text-xl">Entering Saree Pasal...</div>;
    if (!productData) return <div className="p-20 text-center">Product not found.</div>;

    const allImages = productData.allImages || [productData.image];
    
    // Variant Logic
    const variantMap = {};
    if (productData.variants) {
        productData.variants.forEach(v => {
            if (!variantMap[v.color]) variantMap[v.color] = [];
            variantMap[v.color].push(v);
        });
    }
    const uniqueColors = Object.keys(variantMap);
    const filteredVariants = variantMap[selectedColor] || [];
    const activeVariant = filteredVariants.find(v => v.size === selectedSize);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                {/* ADMIN BAR */}
                {isAdmin(user) && (
                    <div className="mb-10 p-4 bg-pink-900 rounded-3xl flex justify-between items-center shadow-lg border-4 border-pink-50">
                        <span className="text-white text-xs font-black uppercase tracking-widest ml-4">Admin Mode</span>
                        <button onClick={() => setIsEditing(!isEditing)} className="bg-white text-pink-900 px-6 py-2 rounded-2xl font-bold">
                            {isEditing ? "Cancel" : "Edit This Product"}
                        </button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT: IMAGE SLIDER */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="relative rounded-[3.5rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100 group border border-pink-50">
                            <Swiper
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-full w-full"
                            >
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <img 
                                            src={img} 
                                            className="w-full h-full object-cover object-top cursor-zoom-in" 
                                            alt="product view" 
                                            onClick={() => { setZoomIndex(i); setShowFullScreen(true); }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <button onClick={() => setShowFullScreen(true)} className="absolute bottom-8 right-8 bg-white/90 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all text-pink-900 z-10"><Maximize2 size={24} /></button>
                        </div>

                        {/* Thumbnail Ribbon */}
                        {allImages.length > 1 && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={12}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="h-28"
                            >
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i} className="cursor-pointer rounded-2xl overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-pink-600 shadow-md">
                                        <img src={img} className="w-full h-full object-cover" alt="thumb" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    {/* RIGHT: DETAILS */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {isEditing ? (
                            <div className="p-8 bg-gray-50 rounded-[3rem] border-2 border-dashed border-pink-200 space-y-4 text-xs font-bold">
                                <label className="text-pink-600 uppercase ml-2">Product Name</label>
                                <input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold bg-white" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                <div className="flex gap-4">
                                    <div className="w-1/2"><label className="text-gray-400 uppercase ml-2">Sale Price</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold bg-white text-pink-700" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} /></div>
                                    <div className="w-1/2"><label className="text-gray-400 uppercase ml-2">Was Price</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 bg-white line-through text-gray-400" value={productData.oldPrice} onChange={e => setProductData({...productData, oldPrice: e.target.value})} /></div>
                                </div>
                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold shadow-xl shadow-pink-200 uppercase">Save Live Changes</button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <span className="text-pink-600 font-black text-[10px] tracking-widest uppercase bg-pink-50 px-4 py-1 rounded-full italic border border-pink-100">Code: {productData.code}</span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 leading-tight">{productData.title}</h1>
                                    <div className="mt-8 flex items-center gap-6">
                                        {productData.oldPrice && <span className="text-2xl text-red-500 line-through font-bold opacity-60">Was {productData.oldPrice}</span>}
                                        <div className={`px-10 py-5 rounded-[2.5rem] shadow-2xl border-4 ${productData.oldPrice ? 'bg-gray-900 border-green-500 text-green-400 animate-pulse' : 'bg-white border-pink-100 text-pink-700'}`}>
                                            <span className="text-3xl font-black italic">💰 {productData.oldPrice ? `Now ${productData.price}` : productData.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10 py-10 border-y border-gray-100">
                                    {/* COLOR */}
                                    <div>
                                        <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">1. Select Color</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {uniqueColors.map(c => (
                                                <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} className={`px-8 py-4 rounded-2xl border-2 font-black transition-all ${selectedColor === c ? 'border-pink-900 bg-pink-900 text-white shadow-xl scale-105' : 'border-gray-100'}`}>{c}</button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* SIZE */}
                                    {selectedColor && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">2. Available Sizes</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {filteredVariants.map((v, i) => (
                                                    <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center font-black text-xl transition-all ${selectedSize === v.size ? 'border-pink-900 bg-pink-50 text-pink-900 shadow-lg scale-110' : 'border-gray-100'} ${v.qty <= 0 ? 'opacity-20 cursor-not-allowed grayscale' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {v.size}
                                                        {v.qty <= 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[2px] bg-red-500 -rotate-45" /></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {/* STOCK ALERT */}
                                    {activeVariant && (
                                        <div className="animate-in zoom-in-95">
                                            {activeVariant.qty > 0 ? (
                                                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-flex items-center gap-3 font-bold border border-green-100 italic shadow-sm">
                                                    <CheckCircle2 size={20}/> 🌸 Only {activeVariant.qty} items left!
                                                </div>
                                            ) : (
                                                <div className="bg-red-50 text-red-600 p-8 rounded-[2.5rem] flex items-center justify-center gap-4 border-4 border-red-100 animate-bounce shadow-2xl">
                                                    <AlertTriangle size={32} />
                                                    <span className="text-4xl font-serif font-black uppercase tracking-widest italic text-center">SOLD OUT IN THIS SIZE</span>
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
                                            alert("Added to your shopping bag! 🌸");
                                        }}
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-xl disabled:bg-gray-200 transition-all active:scale-95"
                                    >
                                        <ShoppingCart className="inline mr-2" /> ADD TO BAG
                                    </button>
                                    <button className="flex-1 p-5 border border-gray-200 rounded-[2.5rem] flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-all shadow-sm"><Heart /></button>
                                </div>

                                <div className="pt-12 border-t border-gray-100">
                                    <h3 className="text-2xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-3 italic"><Info size={24} /> Product Details</h3>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic bg-pink-50/20 p-8 rounded-[3rem] border border-pink-100">{productData.details || "A breathtaking selection from Saree Pasal."}</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* FULL SCREEN LIGHTBOX */}
            <AnimatePresence>
                {showFullScreen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center p-4">
                        <button onClick={() => setShowFullScreen(false)} className="absolute top-10 right-10 text-white hover:text-pink-500 z-[510]"><X size={60}/></button>
                        <div className="w-full h-full max-w-5xl">
                            <Swiper loop={true} initialSlide={zoomIndex} navigation={true} pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="h-full w-full">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i} className="flex items-center justify-center"><img src={img} className="max-h-full max-w-full object-contain mx-auto shadow-2xl" alt="zoom" /></SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}