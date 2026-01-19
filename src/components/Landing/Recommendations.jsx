"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { db } from '../../lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
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
                // Fetch top 8 items from the Cloud Database
                const q = query(collection(db, "products"), limit(8));
                const querySnapshot = await getDocs(q);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(items);
            } catch (err) {
                console.error("Home fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLiveProducts();
    }, []);

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-pink-600" /></div>;

    return (
        <div className="relative group px-4 md:px-12 py-10 bg-pink-50/30 rounded-[3rem] mb-10">
            <div className="flex justify-between items-end mb-8 px-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-pink-900">Selected for You</h2>
                    <p className="text-pink-600 text-sm">Live treasures from our boutique</p>
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
                autoplay={{ delay: 4000 }}
                navigation={{ nextEl: '.swiper-next-btn', prevEl: '.swiper-prev-btn' }}
                pagination={{ 
                    clickable: true,
                    el: '.custom-pagination' // Move dots to a custom div
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="pb-5" // Space for pagination
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden h-full flex flex-col">
                            {/* Whole Image is now a Link */}
                            <Link href={`/product/${item.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 block">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-110" 
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-pink-900 uppercase">
                                    {item.code}
                                </div>
                            </Link>

                            <div className="p-5 text-center flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-serif font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                                    <p className="text-pink-600 font-bold text-lg mt-1">{item.price}</p>
                                </div>
                                <Link 
                                    href={`/product/${item.id}`} 
                                    className="w-full mt-4 py-3 bg-pink-50 text-pink-900 text-xs font-bold rounded-xl hover:bg-pink-900 hover:text-white transition-all text-center uppercase tracking-widest"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* CUSTOM PAGINATION DIV (Bottom of card, not overlapping) */}
            <div className="custom-pagination flex justify-center mt-6 gap-2 h-2"></div>

            <style jsx global>{`
                .custom-pagination .swiper-pagination-bullet { background: #db2777; opacity: 0.2; }
                .custom-pagination .swiper-pagination-bullet-active { opacity: 1; width: 20px; border-radius: 4px; transition: all 0.3s; }
            `}</style>
        </div>
    );
}