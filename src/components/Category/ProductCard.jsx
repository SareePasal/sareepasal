"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2rem] shadow-sm border border-pink-100 overflow-hidden group flex flex-col h-full transition-all hover:shadow-xl hover:shadow-pink-100"
        >
            {/* Clicking the whole card goes to product page */}
            <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 block">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Sale Badge */}
                {product.isOnSale && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">SALE</span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full text-pink-900 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ShoppingCart size={20} />
                    </div>
                </div>
            </Link>

            <div className="p-6 text-center flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-serif font-bold text-gray-800 text-lg line-clamp-1">{product.title}</h3>
                    <p className="text-pink-600 font-bold text-xl mt-2">{product.price}</p>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-50 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Eye size={14} /> VIEW DETAILS
                </div>
            </div>
        </motion.div>
    );
}