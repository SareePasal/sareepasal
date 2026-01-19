"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { searchProducts } from '@/lib/searchLogic';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || "";
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const found = searchProducts(query);
            setResults(found);
        }
    }, [query]);

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif font-bold text-pink-900 mb-2">
                    Search Results
                </h1>
                <p className="text-gray-500 mb-10">
                    Showing results for "{query}" — {results.length} items found
                </p>

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {results.map((item) => (
                            <Link href={`/product/${item.id}`} key={item.id}>
                                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden group">
                                    <div className="aspect-[3/4] overflow-hidden">
                                        <img src={item.images[0].src} className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700" />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-serif font-bold text-gray-800 line-clamp-1">{item.description.title}</h3>
                                        <p className="text-pink-600 font-bold">{item.description.price}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                        <p className="text-xl text-gray-500">We couldn't find anything matching "{query}"</p>
                        <Link href="/" className="text-pink-600 font-bold mt-4 inline-block underline">Back to Shopping</Link>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}