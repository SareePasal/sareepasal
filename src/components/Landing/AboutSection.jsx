"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-pink-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
        {/* Image side */}
        <div className="w-full md:w-1/2 h-80 md:h-[500px]">
          <img src="/Urwashi.jpg" className="w-full h-full object-cover object-top" alt="Owner" />
        </div>
        
        {/* Text side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Tradition Meets Style</h2>
          <p className="text-pink-100 leading-relaxed mb-8 text-lg">
            Saree Pasal is an online boutique started by a stay-at-home mom with a passion for ethnic elegance. 
            We offer high-quality sarees, lehengas, and suits designed for the modern South Asian woman.
          </p>
          <Link href="/About" className="inline-block border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-pink-900 transition-all">
            Read Our Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}