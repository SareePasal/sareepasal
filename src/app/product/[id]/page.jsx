"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Recommendations from "../../../components/Landing/Recommendations";
import { auth, db, storage, isAdmin } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
    ShoppingCart, Heart, Edit3, Save, X, Trash2, 
    Plus, AlertTriangle, CheckCircle2, Loader2, 
    Info, Maximize2, Copy, Play, Image as ImageIcon, Settings2, UploadCloud, PackageX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../lib/useCart';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules';
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
    const [isUploading, setIsUploading] = useState(false);
    
    // UI Refs & States
    const fileInputRef = useRef(null);
    const videoInputRef = useRef(null);
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

    // --- 1. ADMIN: REMOVE IMAGE LOGIC ---
    const removeImage = (index) => {
        const updatedImages = productData.allImages.filter((_, i) => i !== index);
        setProductData({ 
            ...productData, 
            allImages: updatedImages,
            image: updatedImages.length > 0 ? updatedImages[0] : "" 
        });
    };

    // --- 2. ADMIN: MEDIA UPLOADS ---
    const handleFileUpload = async (e, type = "image") => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const storageRef = ref(storage, `products/${id}/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            if (type === "image") {
                const updated = [...(productData.allImages || []), url];
                setProductData({ ...productData, allImages: updated, image: updated[0] });
            } else {
                setProductData({ ...productData, videoUrl: url });
            }
            alert("Uploaded! Click SAVE below to finalize.");
        } catch (err) { alert("Upload failed: " + err.message); }
        finally { setIsUploading(false); }
    };

    // --- 3. ADMIN: DUPLICATE ---
    const handleDuplicate = async () => {
        const newCode = prompt("Enter a NEW Product Code for the copy:", productData.code + "-COPY");
        if (!newCode) return;
        const newId = newCode.replace(/\s+/g, '-').toLowerCase();
        try {
            setIsEditing(false); setLoading(true);
            await setDoc(doc(db, "products", newId), { ...productData, code: newCode, title: productData.title + " (Copy)" });
            alert("Duplicate Created!");
            router.push(`/product/${newId}`);
        } catch (err) { alert(err.message); }
        finally { setLoading(false); }
    };

    // --- 4. ADMIN: VARIANT TABLE HELPERS ---
    const addRow = () => { setProductData({ ...productData, variants: [...productData.variants, { color: "", size: "", qty: 1 }] }); };
    const updateRow = (index, field, value) => {
        const updated = [...productData.variants];
        updated[index][field] = value;
        setProductData({ ...productData, variants: updated });
    };
    const deleteRow = (index) => { setProductData({ ...productData, variants: productData.variants.filter((_, i) => i !== index) }); };

    const handleSaveLive = async () => {
        try {
            await updateDoc(doc(db, "products", id), productData);
            setIsEditing(false);
            alert("Live store updated successfully! ✨");
        } catch (err) { alert("Save failed: " + err.message); }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pink-900 font-serif animate-pulse text-xl">Loading Saree Pasal...</div>;
    if (!productData) return <div className="p-20 text-center">Product not found.</div>;

    // Logic for Customer View
    const allImages = productData.allImages || [productData.image];
    const uniqueColors = [...new Set(productData.variants?.map(v => v.color))].filter(c => c !== "");
    const filteredVariants = productData.variants?.filter(v => v.color === selectedColor) || [];
    const activeVariant = filteredVariants.find(v => v.size === selectedSize);
    const isOnSale = productData.oldPrice && productData.oldPrice !== productData.price;

    // --- GLOBAL SOLD OUT LOGIC ---
    const isTotallySoldOut = !productData.variants || 
                             productData.variants.length === 0 || 
                             productData.variants.every(v => Number(v.qty) <= 0);

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                {isAdmin(user) && (
                    <div className="mb-10 p-6 bg-pink-900 rounded-3xl flex flex-wrap justify-between items-center shadow-xl border-4 border-pink-100">
                        <div className="text-white flex items-center gap-2 font-serif font-bold italic"><Settings2 /> Admin Control</div>
                        <div className="flex gap-3">
                            <button onClick={handleDuplicate} className="bg-white/10 text-white border border-white/20 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 text-xs"><Copy size={16}/> DUPLICATE</button>
                            <button onClick={() => setIsEditing(!isEditing)} className="bg-white text-pink-900 px-6 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2 text-xs">{isEditing ? <><X size={16}/> CLOSE</> : <><Edit3 size={16}/> EDIT CONTENT</>}</button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT: IMAGE SLIDER */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className={`relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-100 group ${isTotallySoldOut ? 'grayscale-[0.5]' : ''}`}>
                            <Swiper navigation={true} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} modules={[FreeMode, Navigation, Thumbs]} className="h-full w-full">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <img src={img} className="w-full h-full object-cover object-top cursor-zoom-in" alt="product" onClick={() => { setZoomIndex(i); setShowFullScreen(true); }} />
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
                                    <SwiperSlide key={i} className="cursor-pointer">
                                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-pink-600 shadow-md"><img src={img} className="w-full h-full object-cover" alt="thumb" /></div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    {/* RIGHT: CONTENT / EDITOR */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {isEditing ? (
                            /* --- ADMIN EDITOR VIEW (PRESERVED) --- */
                            <div className="space-y-8 p-8 bg-gray-50 rounded-[3rem] border-2 border-pink-200 border-dashed">
                                {isUploading && <div className="fixed inset-0 bg-white/80 z-[400] flex items-center justify-center font-bold text-pink-900"><Loader2 className="animate-spin mr-2"/> Uploading...</div>}
                                
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase">1. Product Name & Pricing</label>
                                    <input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold bg-white" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                                    <div className="flex gap-4">
                                        <div className="w-1/2"><label className="text-[9px] text-gray-400 ml-2 uppercase font-bold">Now Price</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 font-bold bg-white text-pink-700" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} /></div>
                                        <div className="w-1/2"><label className="text-[9px] text-gray-400 ml-2 uppercase font-bold">Was Price</label><input className="w-full p-4 rounded-2xl ring-1 ring-gray-200 bg-white line-through text-gray-400" value={productData.oldPrice || ""} onChange={e => setProductData({...productData, oldPrice: e.target.value})} /></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase">2. Product Description</label>
                                    <textarea rows="6" className="w-full p-4 rounded-2xl ring-1 ring-gray-200 bg-white text-sm" value={productData.details || ""} onChange={e => setProductData({...productData, details: e.target.value})} />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase">3. Gallery Manager</label>
                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                        {allImages.map((img, i) => (
                                            <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden border bg-white shadow-sm">
                                                <img src={img} className="w-full h-full object-cover" alt="" />
                                                <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-lg hover:bg-black transition-colors">
                                                    <X size={14}/>
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => fileInputRef.current.click()} className="aspect-[3/4] rounded-xl border-2 border-dashed border-pink-300 flex items-center justify-center text-pink-400 bg-white"><Plus size={32} /></button>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase">4. Video Path</label>
                                    <div className="flex gap-2">
                                        <input className="flex-1 p-4 rounded-2xl ring-1 ring-gray-200 bg-white text-xs font-mono" placeholder="Video URL or upload..." value={productData.videoUrl || ""} onChange={e => setProductData({...productData, videoUrl: e.target.value})} />
                                        <button type="button" onClick={() => videoInputRef.current.click()} className="bg-gray-900 text-white px-5 rounded-2xl font-bold flex items-center gap-2 text-xs"><UploadCloud size={16}/> UPLOAD</button>
                                        <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-pink-600 uppercase font-mono tracking-tighter italic">5. Inventory Table (Color | Size | Qty)</label>
                                    {productData.variants?.map((v, i) => (
                                        <div key={i} className="flex gap-2 animate-in slide-in-from-left-1">
                                            <input placeholder="Color" className="w-1/3 p-3 rounded-xl border bg-white font-bold" value={v.color} onChange={e => updateRow(i, 'color', e.target.value)} />
                                            <input placeholder="Size" className="w-1/4 p-3 rounded-xl border bg-white font-bold text-center" value={v.size} onChange={e => updateRow(i, 'size', e.target.value)} />
                                            <input type="number" placeholder="Qty" className="w-1/4 p-3 rounded-xl border bg-white font-bold text-center" value={v.qty} onChange={e => updateRow(i, 'qty', Number(e.target.value))} />
                                            <button onClick={() => deleteRow(i)} className="p-2 text-red-300 hover:text-red-600"><Trash2 size={20}/></button>
                                        </div>
                                    ))}
                                    <button onClick={addRow} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:border-pink-300">+ Add Row</button>
                                </div>

                                <button onClick={handleSaveLive} className="w-full bg-pink-900 text-white py-6 rounded-[2.5rem] font-bold text-xl shadow-xl hover:bg-black transition-all">
                                    <Save className="inline mr-2"/> SAVE EVERYTHING TO CLOUD
                                </button>
                            </div>
                        ) : (
                            /* --- CUSTOMER VIEW (UPDATED COLORS & SOLD OUT) --- */
                            <>
                                <div className="space-y-4">
                                    <span className="text-pink-600 font-black text-[10px] tracking-widest uppercase bg-pink-50 px-4 py-1 rounded-full border border-pink-100">Code: {productData.code}</span>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-4 leading-tight">{productData.title}</h1>
                                    <div className="flex flex-wrap items-center gap-6 mt-4">
                                        {isOnSale && <span className="text-2xl text-red-500 line-through font-bold opacity-60">Was {productData.oldPrice}</span>}
                                        <div className={`px-10 py-5 rounded-[2rem] shadow-2xl border-4 ${isOnSale ? 'bg-gray-900 border-green-500 text-green-400 animate-pulse' : 'bg-white border-pink-100 text-pink-700'}`}>
                                            <span className="text-3xl font-black italic tracking-tighter">💰 {isOnSale ? `Now ${productData.price}` : productData.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12 py-12 border-y border-gray-100">
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
                                            <div>
                                                <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.3em] flex items-center gap-2 italic"><ImageIcon size={14}/> Step 1: Select Color</h3>
                                                <div className="flex flex-wrap gap-4">
                                                    {uniqueColors.map(c => (
                                                        <button key={c} onClick={() => { setSelectedColor(c); setSelectedSize(""); }} 
                                                            className={`flex items-center gap-3 px-6 py-4 rounded-full border-2 transition-all duration-300 shadow-sm ${selectedColor === c ? 'border-pink-900 bg-pink-50 scale-105 shadow-pink-100 shadow-lg' : 'border-gray-100 bg-white hover:border-pink-200'}`}
                                                        >
                                                            {/* Little Color Circle */}
                                                            <div className="w-5 h-5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: c.toLowerCase().replace(" ", "") }} />
                                                            <span className="font-bold text-sm text-gray-800 uppercase tracking-tight">{c}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedColor && (
                                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.3em] flex items-center gap-2 italic"><Maximize2 size={14}/> Step 2: Available Sizes</h3>
                                                    <div className="flex flex-wrap gap-4">
                                                        {filteredVariants.map((v, i) => (
                                                            <button key={i} disabled={v.qty <= 0} onClick={() => setSelectedSize(v.size)} 
                                                                className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center font-black text-xl transition-all ${selectedSize === v.size ? 'border-pink-900 bg-pink-50 text-pink-900 shadow-lg scale-110' : 'border-gray-100 bg-white'} ${v.qty <= 0 ? 'opacity-20 cursor-not-allowed grayscale bg-gray-100' : 'hover:bg-gray-50'}`}
                                                            >
                                                                {v.size}
                                                                {v.qty <= 0 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[2px] bg-red-500 -rotate-45" /></div>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {activeVariant && (
                                                <div className="animate-in zoom-in-95 duration-300">
                                                    {activeVariant.qty > 0 ? (
                                                        <div className="bg-green-50 text-green-700 px-6 py-4 rounded-2xl inline-flex items-center gap-3 font-black text-sm border border-green-100 italic shadow-sm">
                                                            <CheckCircle2 size={20}/> 🌸 Only {activeVariant.qty} left! Order soon.
                                                        </div>
                                                    ) : (
                                                        <div className="bg-red-50 text-red-600 p-10 rounded-[3rem] flex flex-col items-center justify-center gap-4 border-4 border-red-100 animate-bounce shadow-2xl">
                                                            <AlertTriangle size={40} />
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
                                        disabled={isTotallySoldOut || (uniqueColors.length > 0 && !activeVariant) || (activeVariant && activeVariant.qty <= 0)}
                                        onClick={() => {
                                            addToCart({...productData, selectedColor, selectedSize, img: productData.image, uniqueKey: `${id}-${selectedColor}-${selectedSize}`});
                                            alert("🌸 Added to your Saree Pasal bag!");
                                        }}
                                        className="flex-[3] bg-pink-900 text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-xl shadow-pink-900/20 disabled:bg-gray-200 transition-all active:scale-95"
                                    >
                                        <ShoppingCart className="inline mr-2" /> {isTotallySoldOut ? "OUT OF STOCK" : "ADD TO BAG"}
                                    </button>
                                    <button className="flex-1 p-5 border border-gray-200 rounded-[2.5rem] flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-all shadow-sm"><Heart /></button>
                                </div>

                                <div className="pt-12 border-t border-gray-100">
                                    <h3 className="text-2xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-3 italic"><Info size={24} /> Product Details</h3>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg font-medium italic bg-pink-50/20 p-10 rounded-[3rem] border border-pink-100 shadow-inner">
                                        {productData.details || "Luxury ethnic selection from Saree Pasal."}
                                    </div>
                                    
                                    {productData.videoUrl && (
                                        <div className="mt-12 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-black aspect-video relative group">
                                             <video src={productData.videoUrl} controls className="w-full h-full object-contain" />
                                             <div className="absolute top-6 left-6 bg-pink-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"> <Play size={12}/> Product Video</div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showFullScreen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center p-4">
                        <button onClick={() => setShowFullScreen(false)} className="absolute top-10 right-10 text-white hover:text-pink-500 z-[510] transition-colors"><X size={60}/></button>
                        <div className="w-full h-full max-w-6xl">
                            <Swiper loop={true} initialSlide={zoomIndex} navigation={true} pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="h-full w-full">
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i} className="flex items-center justify-center"><img src={img} className="max-h-full max-w-full object-contain mx-auto shadow-2xl" alt="zoom view" /></SwiperSlide>
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