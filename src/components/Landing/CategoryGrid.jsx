"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const categories = [
  { name: "Saree", img: "/Saree.png", link: "/Saree_All" },
  { name: "Gown", img: "/Gown.jpg", link: "/Gown" },
  { name: "Suit", img: "/Suit.jpg", link: "/Suit" },
  { name: "Lehenga", img: "/Lehenga.jpg", link: "/Lehenga" },
  // Special "Live Sale" tile will be inserted here
  { name: "Men", img: "/Menswear.png", link: "/MensWear" },
  { name: "Petticoat", img: "/Petticoat.png", link: "/Petticoat" },
  { name: "Accessories", img: "/Accessories.png", link: "/Accessories" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {/* 1. Show first 4 standard categories */}
      {categories.slice(0, 4).map((cat, index) => (
        <CategoryTile key={index} cat={cat} />
      ))}

      {/* 2. THE DYNAMIC SALE TILE (Inserted after Lehenga) */}
      <Link href="/Sale">
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer border-4 border-red-500/20"
        >
          <SaleLiveSlider />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h3 className="text-white text-lg md:text-xl font-serif font-bold tracking-widest uppercase">
              Boutique Sale
            </h3>
          </div>
        </motion.div>
      </Link>

      {/* 3. Show remaining categories */}
      {categories.slice(4).map((cat, index) => (
        <CategoryTile key={index + 4} cat={cat} />
      ))}
    </div>
  );
}

// Sub-component for standard tiles
function CategoryTile({ cat }) {
  return (
    <Link href={cat.link}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      >
        <img 
          src={cat.img} 
          alt={cat.name} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <h3 className="text-white text-lg md:text-xl font-serif font-bold tracking-widest uppercase">
            {cat.name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}

// --- THE NEW DYNAMIC SALE SLIDER COMPONENT ---
function SaleLiveSlider() {
    const [saleItems, setSaleItems] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchSaleImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Filter items that have an old price (meaning they are on sale)
                const onSale = items.filter(item => item.oldPrice && item.oldPrice !== item.price);
                setSaleItems(onSale);
            } catch (err) { console.error(err); }
        };
        fetchSaleImages();
    }, []);

    useEffect(() => {
        if (saleItems.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % saleItems.length);
        }, 3000); // Slides every 3 seconds
        return () => clearInterval(timer);
    }, [saleItems]);

    if (saleItems.length === 0) {
        return <img src="/sale.png" className="w-full h-full object-cover" alt="Sale" />;
    }

    const currentItem = saleItems[index];
    
    // Calculate the percentage to show on the dynamic tile
    const oldP = parseFloat(currentItem.oldPrice.replace(/[^0-9.]/g, ""));
    const newP = parseFloat(currentItem.price.replace(/[^0-9.]/g, ""));
    const off = Math.round(((oldP - newP) / oldP) * 100);

    return (
        <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img 
                        src={currentItem.image} 
                        className="w-full h-full object-cover object-top" 
                        alt="Sale Preview" 
                    />
                    
                    {/* Dynamic Sale Badge on the Tile */}
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-xl border border-white animate-bounce">
                        {off}% OFF
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}