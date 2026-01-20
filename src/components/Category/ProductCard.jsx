"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Tag } from 'lucide-react';

export default function ProductCard({ product }) {
    // 1. AGGRESSIVE SOLD OUT CHECK
    const isSoldOut = 
        (product.price || "").toString().toUpperCase().includes("SOLD OUT") ||
        (product.title || "").toString().toUpperCase().includes("SOLD OUT") ||
        (product.variants?.length > 0 && product.variants.every(v => Number(v.qty) <= 0)) ||
        (Number(product.quantity) === 0);

    // 2. SALE CALCULATION
    const hasSale = product.oldPrice && product.oldPrice !== product.price && !isSoldOut;
    let savingsPercent = 0;
    if (hasSale) {
        const oldP = parseFloat(product.oldPrice.replace(/[^0-9.]/g, ""));
        const newP = parseFloat(product.price.replace(/[^0-9.]/g, ""));
        savingsPercent = Math.round(((oldP - newP) / oldP) * 100);
    }

    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <motion.div 
                whileHover={{ y: -8 }}
                className={`bg-white rounded-[2rem] shadow-sm border border-pink-100 overflow-hidden flex flex-col h-full transition-all hover:shadow-xl ${isSoldOut ? 'opacity-60' : ''}`}
            >
                {/* IMAGE AREA */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 ${isSoldOut ? 'grayscale' : ''}`}
                    />
                    
                    {/* SALE BADGE */}
                    {hasSale && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg border border-white">
                                SAVE {savingsPercent}%
                            </span>
                        </div>
                    )}

                    {/* SOLD OUT OVERLAY */}
                    {isSoldOut && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="bg-white text-red-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl">SOLD OUT</span>
                        </div>
                    )}
                </div>

                {/* TEXT AREA */}
                <div className="p-5 text-center flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="font-serif font-bold text-gray-800 text-sm line-clamp-1">{product.title}</h3>
                        
                        <div className="mt-2 flex flex-col items-center">
                            {hasSale && (
                                <span className="text-[10px] text-red-400 line-through font-bold">{product.oldPrice}</span>
                            )}
                            <p className="text-pink-600 font-black text-lg">{product.price}</p>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest border-t pt-4">
                        <Eye size={12} /> View Details
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}