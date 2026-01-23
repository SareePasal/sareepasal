"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Recommendations() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLiveProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                const filtered = allItems.filter(item => {
                    const priceValue = parseFloat(item.price?.toString().replace(/[^0-9.]/g, "") || "0");
                    const hasVariants = item.variants && item.variants.length > 0;
                    const allVariantsEmpty = hasVariants && item.variants.every(v => Number(v.qty) <= 0);
                    const isGlobalSoldOut = !hasVariants && Number(item.quantity) === 0;
                    const isSoldOut = hasVariants ? allVariantsEmpty : isGlobalSoldOut;

                    return priceValue >= 90 && !isSoldOut;
                });

                setProducts(filtered.slice(0, 12));
            } catch (err) {
                console.error("Recommendations fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveProducts();
    }, []);

    if (loading) return <div className="flex justify-center p-6"><Loader2 className="animate-spin text-pink-600" size={24} /></div>;
    if (products.length === 0) return null;

    return (
        <div className="relative group px-2 md:px-8 py-6 bg-pink-50/30 rounded-[1.5rem] md:rounded-[2.5rem] mb-6">
            <div className="flex justify-between items-center mb-6 px-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-pink-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-pink-500" /> Selected for You
                    </h2>
                    <p className="text-pink-600 text-[10px] md:text-xs uppercase tracking-widest font-semibold">Premium Collection</p>
                </div>
                
                <div className="hidden md:flex space-x-2">
                    <button className="rec-prev p-2 rounded-full border border-pink-200 bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition-all shadow-sm">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="rec-next p-2 rounded-full border border-pink-200 bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition-all shadow-sm">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={12}
                slidesPerView={1.5} // Narrower cards on mobile
                loop={products.length > 4}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={{ nextEl: '.rec-next', prevEl: '.rec-prev' }}
                pagination={{ clickable: true, el: '.rec-pagination' }}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 4.5, spaceBetween: 20 }, // Narrower cards on laptop
                }}
                className="pb-8"
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/product/${item.id}`} className="block h-full">
                            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover object-top" 
                                        loading="lazy" 
                                    />
                                    {item.isOnSale && (
                                        <div className="absolute top-2 left-2 bg-pink-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                                            Sale
                                        </div>
                                    )}
                                </div>

                                <div className="p-3 text-center flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-serif font-bold text-gray-800 text-xs line-clamp-1">{item.title}</h3>
                                        <p className="text-pink-600 font-bold text-sm mt-1">{item.price}</p>
                                    </div>
                                    <div className="mt-3 py-1.5 bg-pink-50/50 text-pink-900 text-[9px] font-black rounded-lg uppercase tracking-wider group-hover:bg-pink-900 group-hover:text-white transition-all text-center border border-pink-100">
                                        View Detail
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination dots moved slightly up and made smaller */}
            <div className="rec-pagination flex justify-center mt-2 gap-1.5 h-1"></div>

            <style jsx global>{`
                .rec-pagination .swiper-pagination-bullet { background: #be185d; opacity: 0.15; width: 5px; height: 5px; }
                .rec-pagination .swiper-pagination-bullet-active { opacity: 0.8; width: 15px; border-radius: 3px; transition: all 0.3s; }
            `}</style>
        </div>
    );
}