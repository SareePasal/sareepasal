"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

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
                
                // THE AGGRESSIVE REMOVAL:
                const activeOnly = allItems.filter(item => {
                    const priceText = (item.price || "").toString().toUpperCase();
                    const titleText = (item.title || "").toString().toUpperCase();
                    
                    // If it says "Sold Out" in text, or qty is 0, REMOVE IT
                    const hasSoldOutText = priceText.includes("SOLD OUT") || titleText.includes("SOLD OUT");
                    const hasVariants = item.variants && item.variants.length > 0;
                    const allVariantsEmpty = hasVariants && item.variants.every(v => Number(v.qty) <= 0);
                    const isGlobalZero = !hasVariants && Number(item.quantity) === 0;

                    const isSoldOut = hasSoldOutText || allVariantsEmpty || isGlobalZero;
                    return !isSoldOut; // Only show if NOT sold out
                });

                setProducts(activeOnly);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchLiveProducts();
    }, []);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-pink-600" /></div>;

    return (
        <div className="relative group px-4 md:px-12 py-10 bg-pink-50/30 rounded-[3rem] mb-10">
            <div className="flex justify-between items-end mb-8 px-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-pink-900">Selected for You</h2>
                    <p className="text-pink-600 text-sm italic">Available treasures from our collection</p>
                </div>
                
                <div className="hidden md:flex space-x-2">
                    <button className="swiper-prev-btn p-3 rounded-full border border-pink-200 bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition-all shadow-sm">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="swiper-next-btn p-3 rounded-full border border-pink-200 bg-white text-pink-900 hover:bg-pink-900 hover:text-white transition-all shadow-sm">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={25}
                slidesPerView={1}
                loop={products.length > 4}
                autoplay={{ delay: 4500 }}
                navigation={{ nextEl: '.swiper-next-btn', prevEl: '.swiper-prev-btn' }}
                pagination={{ 
                    clickable: true,
                    el: '.custom-pagination' 
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="pb-5"
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/product/${item.id}`} className="block h-full">
                            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden h-full flex flex-col transition-all hover:shadow-xl">
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110" 
                                    />
                                    {item.isOnSale && (
                                        <div className="absolute top-3 left-3 bg-pink-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                            Sale
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 text-center flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-serif font-bold text-gray-800 text-sm line-clamp-1">{item.title}</h3>
                                        <p className="text-pink-600 font-bold text-lg mt-1">{item.price}</p>
                                    </div>
                                    <div className="mt-4 py-3 bg-pink-50 text-pink-900 text-[10px] font-black rounded-xl uppercase tracking-widest group-hover:bg-pink-900 group-hover:text-white transition-all">
                                        View Details
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="custom-pagination flex justify-center mt-6 gap-2 h-2"></div>

            <style jsx global>{`
                .custom-pagination .swiper-pagination-bullet { background: #be185d; opacity: 0.2; width: 8px; height: 8px; }
                .custom-pagination .swiper-pagination-bullet-active { opacity: 1; width: 24px; border-radius: 4px; transition: all 0.3s; }
            `}</style>
        </div>
    );
}