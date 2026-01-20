// src/components/Landing/CategoryGrid.jsx

"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { name: "Saree", img: "/Saree.png", link: "/Saree_All" },
  { name: "Gown", img: "/Gown.jpg", link: "/Gown" },
  { name: "Suit", img: "/Suit.jpg", link: "/Suit" },
  { name: "Lehenga", img: "/Lehenga.jpg", link: "/Lehenga" },
  { name: "Men", img: "/Menswear.png", link: "/MensWear" },
  { name: "Petticoat", img: "/Petticoat.png", link: "/Petticoat" },
  { name: "Accessories", img: "/Accessories.png", link: "/Accessories" },
  // About is removed from here!
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat, index) => (
        <Link key={index} href={cat.link}>
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
      ))}
    </div>
  );
}