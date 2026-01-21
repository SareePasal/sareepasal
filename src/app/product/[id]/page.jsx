"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ShoppingCart, Heart, Edit3, Save, X, Trash2, Plus, AlertTriangle, CheckCircle2, Loader2, Info, Maximize2, Play, PackageX } from 'lucide-react';
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
    
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);

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

    // --- ADMIN VARIANT HELPERS ---
    const addVariant = () => {
        const newVariants = [...(productData.variants || []), { color: "", size: "", qty: 1 }];
        setProductData({ ...productData, variants: newVariants });
    };
    const updateVariant = (index, field, value) => {
        const newVariants = [...productData.variants];
        newVariants[index][field] = value;
        setProductData({ ...productData, variants: newVariants });
    };
    const removeVariant = (index) => {
        const newVariants = productData.variants.filter((_, i) => i !== index);
        setProductData({ ...productData, variants: newVariants });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pink-900 font-serif animate-pulse text-xl">Entering Saree Pasal...</div>;
    if (!productData) return <div className="p-20 text-center">Product not found.</div>;

    const allImages = productData.allImages || [productData.image];
    
    // --- SOLD OUT LOGIC ---
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

    // Global Check: Is there ANY stock left at all?
    const isTotallySoldOut = !productData.variants || 
                             productData.variants.length === 0 || 
                             productData.variants.every(v => Number(v.qty) <= 0);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
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
                        <div className={`relative rounded-[3.5rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100 group border border-pink-50 ${isTotallySoldOut ? 'grayscale-[0.5]' : ''}`}>
                            <Swiper navigation={true} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} modules={[FreeMode, Navigation, Thumbs]} className="h-full w-full">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={img} className="w-full h-full object-cover object-top cursor-zoom-in" alt="product view" onClick={() => { setZoomIndex(i); setShowFullScreen(true); }} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            
                            {/* OVERLAY IF SOLD OUT */}
                            {isTotallySoldOut && !isEditing && (
                                <div className="absolute inset-0 z-20 bg-black/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/90 px-8 py-4 rounded-full shadow-2xl border-4 border-red-50 text-red-600 font-serif font-black text-3xl uppercase tracking-tighter italic">Sold Out</div>
                                </div>
                            )}

                            <button onClick={() => setShowFullScreen(true)} className="absolute bottom-8 right-8 bg-white/90 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all text-pink-900 z-10"><Maximize2 size={24} /></button>
                        </div>
                        {allImages.length > 1 && (
                            <Swiper onSwiper={setThumbsSwiper} spaceBetween={12} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="h-28">
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
                            /* --- ADMIN EDITOR --- */
                            <div className="p-8 bg-gray-50 rounded-[3rem] border-2 border-dashed border-pink-200 space-y-6">
                                <h3 className="text-pink-900 font-serif font-bold text-xl italic border-b pb-2">Quick Editor</h3>
                                <div className="space-y-1">
                                    <label className="text-pink-600 uppercase font-black text-[10px] ml-2">Product Name</label>
                                    <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 font-bold bg-white" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2 space-y-1">
                                        <label className="text-gray-400 uppercase font-black text-[10px] ml-2">Sale Price</label>
                                        <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 font-bold bg-white text-pink-700" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                                    </div>
                                    <div className="w-1/2 space-y-1">
                                        <label className="text-gray-400 uppercase font-black text-[10px] ml-2">Original Price</label>
                                        <input className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 bg-white text-gray-400" value={productData.oldPrice || ""} onChange={e => setProductData({...productData, oldPrice: e.target.value})} />
                                    </div>
                                </div>
                                {/* Variant Editor Table */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-2">
                                        <label className="text-gray-400 uppercase font-black text-[10px]">Manage Inventory</label>
                                        <button onClick={addVariant} className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-bold flex items-center gap-1"><Plus size={12}/> Add New Row</button>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                        <table className="w-full text-left text-[11px]">
                                            <thead className="bg-gray-100 font-black text-gray-500 uppercase"><tr><th className="p-3">Color</th><th className="p-3">Size</th><th className="p-3">Qty</th><th className="p-3 text-right">Del</th></tr></thead>
                                            <tbody className="divide-y">
                                                {productData.variants?.map((v, i) => (
                                                    <tr key={i}>
                                                        <td className="p-2"><input className="w-full p-1 border rounded" value={v.color} onChange={(e) => updateVariant(i, 'color', e.target.value)} placeholder="e.g. Maroon" /></td>
                                                        <td className="p-2"><input className="w-full p-1 border rounded" value={v.size} onChange={(e) => updateVariant(i, 'size', e.target.value)} placeholder="e.g. M" /></td>
                                                        <td className="p-2"><input className="w-full p-1 border rounded" type="number" value={v.qty} onChange={(e) => updateVariant(i, 'qty', e.target.value)} /></td>
                                                        <td className="p-2 text-right"><button onClick={() => removeVariant(i)} className="text-red-400"><Trash2 size={14}/></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-[9px] text-gray-400 px-2 italic">* If all quantities are 0, product marks as Sold Out automaticallly.</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-gray-400 uppercase font-black text-[10px] ml-2">Description</label>
                                    <textarea rows={5} className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 bg-white text-sm" value={productData.details || ""} onChange={e => setProductData({...productData, details: e.target.value})} />
                                </div>
                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold shadow-xl uppercase text-sm tracking-widest hover:bg-black">Save Changes ✨</button>
                            </div>
                        ) : (
                            /* --- CUSTOMER DISPLAY --- */
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
                                    {isTotallySoldOut ? (
                                        /* --- BIG GLOBAL SOLD OUT MESSAGE --- */
                                        <div className="bg-red-50 p-10 rounded-[3rem] border-4 border-red-100 flex flex-col items-center gap-4 text-center animate-in zoom-in-95">
                                            <PackageX size={48} className="text-red-600" />
                                            <div>
                                                <h3 className="text-2xl font-serif font-black text-red-600 uppercase tracking-tighter italic">Currently Out of Stock</h3>
                                                <p className="text-red-400 text-sm italic font-medium">We're working on a restock. Check back soon!</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* COLOR SELECTOR */}
                                            <div>
                                                <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">1. Select Color</h3>
                                                <div className="flex flex-wrap gap-4">
                                                    {uniqueColors.map(c => (
                                                        <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} 
                                                            className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all duration-300 shadow-sm ${selectedColor === c ? 'border-pink-900 bg-pink-50 scale-105 shadow-pink-100 shadow-lg' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                                        >
                                                            <div className="w-5 h-5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: c.toLowerCase().replace(" ", "") }} />
                                                            <span className="font-bold text-sm text-gray-800">{c}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* SIZE SELECTOR */}
                                            {selectedColor && (
                                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">2. Available Sizes</h3>
                                                    <div className="flex flex-wrap gap-4">
                                                        {filteredVariants.map((v, i) => (
                                                            <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                                className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center font-black transition-all ${selectedSize === v.size ? 'border-pink-900 bg-pink-900 text-white shadow-xl scale-110' : 'border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-600'} ${v.qty <= 0 ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
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
                                                            <span className="text-4xl font-serif font-black uppercase tracking-widest italic text-center">SOLD OUT</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        disabled={isTotallySoldOut || !activeVariant || activeVariant.qty <= 0} 
                                        onClick={() => { addToCart({...productData, selectedColor, selectedSize, img: productData.image, uniqueKey: `${id}-${selectedColor}-${selectedSize}`}); alert("Added to your shopping bag! 🌸"); }} 
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-xl disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95"
                                    >
                                        <ShoppingCart className="inline mr-2" /> {isTotallySoldOut ? "OUT OF STOCK" : "ADD TO BAG"}
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

                {/* --- VIDEO SECTION --- */}
                {productData.videoUrl && (
                    <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24 pt-20 border-t border-gray-100">
                        <div className="flex flex-col lg:flex-row items-center gap-12 bg-gray-50 rounded-[4rem] p-10 md:p-20 shadow-inner">
                            <div className="w-full lg:w-1/3 text-center lg:text-left space-y-4">
                                <div className="flex items-center justify-center lg:justify-start gap-2 text-pink-600"><Play size={16} fill="currentColor" /><span className="font-black text-[10px] tracking-[0.4em] uppercase">Cinematic Clip</span></div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-900 italic">See it in Motion</h2>
                                <p className="text-gray-500 text-lg italic leading-relaxed pt-4">Experience the graceful flow of the fabric and the shimmering detail of every sequence as it moves.</p>
                            </div>
                            <div className="w-full lg:w-2/3">
                                <div className="relative aspect-[9/16] md:aspect-[4/5] lg:aspect-[16/10] max-w-3xl mx-auto rounded-[3.5rem] overflow-hidden shadow-2xl bg-black border-8 border-white">
                                    <video src={productData.videoUrl} controls className="w-full h-full object-contain" poster={productData.image} loop muted playsInline />
                                    <div className="absolute top-8 left-8 z-10 pointer-events-none"><div className="bg-black/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /><span className="text-white text-[10px] font-bold uppercase tracking-widest">Saree Pasal Studio</span></div></div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </div>

            <section className="bg-pink-50/30 py-20 mt-20"><div className="max-w-7xl mx-auto px-4"><Recommendations /></div></section>

            <AnimatePresence>
                {showFullScreen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center p-4">
                        <button onClick={() => setShowFullScreen(false)} className="absolute top-10 right-10 text-white hover:text-pink-500 z-[510]"><X size={60}/></button>
                        <div className="w-full h-full max-w-5xl"><Swiper loop={true} initialSlide={zoomIndex} navigation={true} pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="h-full w-full">{allImages.map((img, i) => (<SwiperSlide key={i} className="flex items-center justify-center"><img src={img} className="max-h-full max-w-full object-contain mx-auto shadow-2xl" alt="zoom" /></SwiperSlide>))}</Swiper></div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </main>
    );
}