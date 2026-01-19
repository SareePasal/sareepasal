"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { searchProducts } from '../../lib/searchLogic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, Search as SearchIcon } from 'lucide-react';

// 1. We create a "Child" component that does the actual searching
function SearchContent() {
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
                            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden group h-full flex flex-col">
                                <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                                    <img 
                                        src={item.images[0].src} 
                                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700" 
                                        alt={item.description.title}
                                    />
                                </div>
                                <div className="p-4 text-center flex-grow flex flex-col justify-between">
                                    <h3 className="font-serif font-bold text-gray-800 line-clamp-1">{item.description.title}</h3>
                                    <p className="text-pink-600 font-bold mt-2">{item.description.price}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <SearchIcon className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-xl text-gray-500 font-serif italic">We couldn't find any treasures matching "{query}"</p>
                    <Link href="/" className="text-pink-600 font-bold mt-6 inline-block bg-white px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
                        Return to Shop
                    </Link>
                </div>
            )}
        </div>
    );
}

// 2. The Main Page just provides the "Suspense Boundary" (The loading wrapper)
export default function SearchResultsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            
            {/* This Suspense box tells Next.js: "If the search isn't ready yet, show this loading spinner" */}
            <Suspense fallback={
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-pink-900">
                    <Loader2 className="animate-spin mb-4" size={48} />
                    <p className="font-serif italic text-xl">Searching our boutique...</p>
                </div>
            }>
                <SearchContent />
            </Suspense>

            <Footer />
        </main>
    );
}