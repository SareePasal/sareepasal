"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Mock data for now - Later Admin can change this!
const saleProducts = [
  { id: 1, title: "New Customer", image: "/Saree.png", discount: "5% OFF", link: "/" },
  { id: 2, title: "New Glamour: Designer Gowns", image: "/Gown.jpg", discount: "FREE SHIPPING", link: "/Gown" },
  { 
    id: 3, 
    title: "On SALE Items", 
    image: "/Saree.png", 
    discount: "", 
    link: "/Sale"  // <--- Takes them to the "Boutique Outlet" page we built
  },
];

export default function SaleBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % saleProducts.length);
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, []);

 return (
    <div className="relative h-[250px] md:h-[400px] overflow-hidden bg-pink-100 mx-4 rounded-3xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          
          {/* Changed object-cover to object-top to stop cutting off heads/shoulders */}
          <img 
            src={saleProducts[index].image} 
            className="w-full h-full object-cover object-top md:object-center" 
            alt="Sale" 
          />
          
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 text-white">
            <motion.span 
              initial={{ y: 20 }} animate={{ y: 0 }}
              className="bg-yellow-400 text-pink-900 px-3 py-1 rounded-full w-fit font-bold text-xs md:text-sm mb-2"
            >
              {saleProducts[index].discount}
            </motion.span>
            <motion.h1 
              initial={{ y: 20 }} animate={{ y: 0 }}
              className="text-2xl md:text-5xl font-serif font-bold mb-4 max-w-md"
            >
              {saleProducts[index].title}
            </motion.h1>
            <Link href={saleProducts[index].link} 
                  className="bg-white text-pink-900 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm w-fit hover:bg-pink-100 transition-all">
              Shop Now
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}