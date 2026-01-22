"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
    ShoppingCart, Heart, Edit3, Save, X, Trash2, 
    Plus, AlertTriangle, CheckCircle2, Loader2, 
    Info, Maximize2, Copy, Play, Image as ImageIcon 
} from 'lucide-react';
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
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // UI States
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [zoomIndex, setZoomIndex] = useState(0);
    const [newImageUrl, setNewImageUrl] = useState("");

    // Selection States
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
                    if (!data.allImages) data.allImages = [data.image];
                    setProductData(data);
                }
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        getProduct();
        window.scrollTo(0, 0);
    }, [id]);

    // --- ADMIN: DUPLICATE PRODUCT ---
    const handleDuplicate = async () => {
        const newCode = prompt("Enter a UNIQUE Product Code for the copy (e.g., " + productData.code + "-NEW):");
        if (!newCode) return;

        const newId = newCode.replace(/\s+/g, '-').toLowerCase();
        
        try {
            setIsEditing(false);
            setLoading(true);
            // Save the exact same data to a NEW document ID
            await setDoc(doc(db, "products", newId), {
                ...productData,
                code: newCode,
                title: productData.title + " (Copy)"
            });
            alert("Product Copied! Redirecting to the new design...");
            router.push(`/product/${newId}`);
        } catch (err) { alert("Duplicate failed: " + err.message); }
        finally { setLoading(false); }
    };

    const handleSaveLive = async () => {
        try {
            await updateDoc(doc(db, "products", id), productData);
            setIsEditing(false);
            alert("All changes saved! ✨");
        } catch (err) { alert("Save failed: " + err.message); }
    };

    // --- ADMIN: GALLERY HELPERS ---
    const addImageToGallery = () => {
        if (!newImageUrl) return;
        const updated = [...productData.allImages, newImageUrl];
        setProductData({ ...productData, allImages: updated, image: updated[0] });
        setNewImageUrl("");
    };

    const removeImageFromGallery = (index) => {
        const updated = productData.allImages.filter((_, i) => i !== index);
        setProductData({ ...productData, allImages: updated, image: updated[0] || "" });
    };

    // --- ADMIN: VARIANT ROW HELPERS ---
    const addVariantRow = () => {
        const updated = [...(productData.variants || []), { color: "", size: "", qty: 1 }];
        setProductData({ ...productData, variants: updated });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pink-900 font-serif animate-pulse text-xl">Opening Collection...</div>;
    if (!productData) return <div className="p-20 text-center">Garment not found.</div>;

    const allImages = productData.allImages || [productData.image];
    const uniqueColors = [...new Set(productData.variants?.map(v => v.color))].filter(c => c !== "");
    const filteredSizes = productData.variants?.filter(v => v.color === selectedColor);
    const activeVariant = filteredSizes.find(v => v.size === selectedSize);

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                {/* ADMIN TOOLBAR (UPGRADED) */}
                {isAdmin(user) && (
                    <div className="mb-10 p-6 bg-pink-900 rounded-3xl flex flex-wrap justify-between items-center shadow-xl gap-4 border-4 border-pink-100">
                        <div className="text-white">
                            <h2 className="text-xl font-serif font-bold italic">Store Manager Mode</h2>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleDuplicate} className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
                                <Copy size={18}/> Duplicate this Product
                            </button>
                            <button onClick={() => setIsEditing(!isEditing)} className="bg-white text-pink-900 px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2">
                                {isEditing ? <><X size={18}/> Close Editor</> : <><Edit3 size={18}/> Edit Content</>}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT: IMAGE SLIDER */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100 group border border-pink-50">
                            <Swiper navigation={true} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} modules={[FreeMode, Navigation, Thumbs]} className="h-full w-full">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={img} className="w-full h-full object-cover object-top cursor-zoom-in" alt="product" onClick={() => { setZoomIndex(i); setShowFullScreen(true); }} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <button onClick={() => setShowFullScreen(true)} className="absolute bottom-8 right-8 bg-white/90 p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all text-pink-900 z-10"><Maximize2 size={24} /></button>
                        </div>

                        {/* Thumbnail Ribbon */}
                        {allImages.length > 1 && (
                            <Swiper onSwiper={setThumbsSwiper} spaceBetween={12} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="h-28">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i} className="cursor-pointer">
                                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-pink-600 shadow-md">
                                            <img src={img} className="w-full h-full object-cover" alt="thumb" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    {/* RIGHT: CONTENT / EDITOR */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {isEditing ? (
                            /* --- ADMIN ADVANCED EDITOR --- */
                            <div className="space-y-8 p-8 bg-gray-50 rounded-[3rem] border-2 border-pink-200 border-dashed">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase tracking-widest">1. Name & Pricing</label>
                                    <input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                    <div className="flex gap-4">
                                        <input className="w-1/2 p-4 rounded-2xl ring-1 ring-gray-200 text-pink-700 font-bold" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                                        <input className="w-1/2 p-4 rounded-2xl ring-1 ring-gray-200 text-gray-400 line-through" value={productData.oldPrice} onChange={e => setProductData({...productData, oldPrice: e.target.value})} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase tracking-widest">2. Gallery Manager</label>
                                    <div className="grid grid-cols-4 gap-2 mb-4">
                                        {allImages.map((img, i) => (
                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                                                <img src={img} className="w-full h-full object-cover" />
                                                <button onClick={() => removeImageFromGallery(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={12}/></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input className="flex-1 p-3 rounded-xl border text-xs" placeholder="Paste New Image URL here..." value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} />
                                        <button onClick={addImageToGallery} className="bg-gray-900 text-white px-4 rounded-xl"><Plus/></button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase tracking-widest font-mono">3. Inventory Table</label>
                                    {productData.variants?.map((v, i) => (
                                        <div key={i} className="flex gap-2"><input placeholder="Color" className="w-1/3 p-3 rounded-xl border" value={v.color} onChange={e => {const u = [...productData.variants]; u[i].color = e.target.value; setProductData({...productData, variants: u})}} /><input placeholder="Size" className="w-1/4 p-3 rounded-xl border" value={v.size} onChange={e => {const u = [...productData.variants]; u[i].size = e.target.value; setProductData({...productData, variants: u})}} /><input type="number" className="w-1/4 p-3 rounded-xl border" value={v.qty} onChange={e => {const u = [...productData.variants]; u[i].qty = Number(e.target.value); setProductData({...productData, variants: u})}} /><button onClick={() => setProductData({...productData, variants: productData.variants.filter((_, idx) => idx !== i)})} className="text-red-300"><Trash2/></button></div>
                                    ))}
                                    <button onClick={addVariantRow} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-xs font-bold">+ Add Row</button>
                                </div>

                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-6 rounded-[2.5rem] font-bold text-xl shadow-2xl hover:bg-black transition-all">
                                    <Save className="inline mr-2"/> SAVE ALL CHANGES
                                </button>
                            </div>
                        ) : (
                            /* --- CUSTOMER VIEW --- */
                            <>
                                <div>
                                    <span className="text-pink-600 font-black text-[10px] tracking-widest uppercase bg-pink-50 px-4 py-1 rounded-full italic border border-pink-100">Code: {productData.code}</span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 leading-tight">{productData.title}</h1>
                                    <div className="mt-8 flex items-center gap-6">
                                        {productData.oldPrice && <span className="text-2xl text-red-500 line-through font-bold opacity-60">Was {productData.oldPrice}</span>}
                                        <div className="px-10 py-5 rounded-[2rem] shadow-2xl border-4 bg-gray-900 border-green-500 text-green-400">
                                            <span className="text-3xl font-black italic">💰 {productData.oldPrice ? `Now ${productData.price}` : productData.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10 py-10 border-y border-gray-100">
                                    <div>
                                        <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">1. Select Color</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {uniqueColors.map(c => (
                                                <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} className={`px-8 py-4 rounded-2xl border-2 font-black transition-all ${selectedColor === c ? 'border-pink-900 bg-pink-900 text-white shadow-xl scale-105' : 'border-gray-100'}`}>{c}</button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedColor && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4">
                                            <h3 className="text-xs font-black uppercase text-gray-400 mb-5 tracking-widest italic">2. Available Sizes</h3>
                                            <div className="flex flex-wrap gap-4">
                                                {filteredVariants.map((v, i) => (
                                                    <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center font-black text-xl transition-all ${selectedSize === v.size ? 'border-pink-900 bg-pink-50 text-pink-900 shadow-lg scale-110' : 'border-gray-100'} ${v.qty <= 0 ? 'opacity-20 cursor-not-allowed grayscale bg-gray-100' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {v.size}
                                                        {v.qty <= 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[2px] bg-red-500 -rotate-45" /></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeVariant && (
                                        <div className="animate-in zoom-in-95">
                                            {activeVariant.qty > 0 ? (
                                                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-flex items-center gap-3 font-bold border border-green-100 italic shadow-sm">
                                                    <CheckCircle2 size={20}/> 🌸 HURRY! Only {activeVariant.qty} pieces remaining!
                                                </div>
                                            ) : (
                                                <div className="bg-red-50 text-red-600 p-8 rounded-[2.5rem] flex items-center justify-center gap-4 border-4 border-red-100 animate-bounce shadow-2xl">
                                                    <AlertTriangle size={32} />
                                                    <span className="text-4xl font-serif font-black uppercase tracking-widest italic text-center">SOLD OUT</span>
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
                                            alert("🌸 Saree added to your bag!");
                                        }}
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-bold text-2xl shadow-xl disabled:bg-gray-300 transition-all active:scale-95"
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