"use client";
import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <Header />

            {/* Hero Section */}
            <div className="bg-pink-50 py-20 px-4 text-center border-b border-pink-100 relative overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-pink-950 italic mb-6">Our Story</h1>
                    <p className="text-pink-700/60 text-lg md:text-xl font-medium tracking-[0.2em] uppercase">Behind the Grace of Saree Pasal</p>
                </motion.div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Image Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                            <Image 
                                src="/Urwashi.jpg" 
                                alt="Urwashi Adhikari - Founder of Saree Pasal" 
                                fill 
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-pink-900 text-white p-8 rounded-[2rem] shadow-xl hidden md:block">
                            <Heart size={32} className="fill-white" />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif font-bold text-pink-900 italic">Meet Urwashi</h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                Saree Pasal is more than just an online boutique—it is a labor of love, tradition, and a dream brought to life.
                            </p>
                        </div>

                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                I started this journey as a stay-at-home mom with a deep passion for the rich, cultural heritage of South Asian fashion. With the unwavering encouragement and support of my husband, I turned that passion into a platform where every woman can find her perfect outfit.
                            </p>
                            <p>
                                Based in New York, we specialize in curating a wide range of ethnic wear, including elegant <strong>Sarees</strong>, grand <strong>Lehengas</strong>, and sophisticated <strong>Suits</strong>. We believe that looking your best for traditional events shouldn't be difficult or overpriced.
                            </p>
                            <p>
                                That’s why Saree Pasal is committed to offering high-quality garments and matching accessories at the most affordable prices. We deliver cultural richness and value directly to your doorstep, ensuring you have everything you need to make memories that last a lifetime.
                            </p>
                        </div>

                        {/* Contact Quick Links */}
                        <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="tel:3477712375" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center group-hover:bg-pink-900 group-hover:text-white transition-all">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Call or Text</p>
                                    <p className="font-bold text-gray-900">(347) 771-2375</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Email Us</p>
                                    <p className="font-bold text-gray-900">sareepasalusa@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mx-auto text-pink-600">
                            <Star />
                        </div>
                        <h3 className="text-xl font-bold">Premium Quality</h3>
                        <p className="text-gray-500 text-sm">Every piece is hand-picked and inspected for the finest craftsmanship.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mx-auto text-pink-600">
                            <ShoppingBag />
                        </div>
                        <h3 className="text-xl font-bold">Affordable Value</h3>
                        <p className="text-gray-500 text-sm">We provide luxury ethnic wear at prices that beat traditional shops.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mx-auto text-pink-600">
                            <MapPin />
                        </div>
                        <h3 className="text-xl font-bold">Based in USA</h3>
                        <p className="text-gray-500 text-sm">Located in Hicksville, NY, offering fast shipping across the country.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}