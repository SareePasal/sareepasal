"use client";
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchProducts } from '../../lib/searchLogic';
import Link from 'next/link';

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const doSearch = (e) => {
        // If they press Enter
        if (e.key === 'Enter') {
            executeNavigation();
        }
    };

    const executeNavigation = () => {
        if (query.length > 1) {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            const found = searchProducts(val);
            setResults(found);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                <Search 
                    className="text-gray-400 w-4 h-4 cursor-pointer" 
                    onClick={executeNavigation} 
                />
                <input 
                    type="text" 
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={doSearch}
                    placeholder="Try 'Silk' or 'Red'..." 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2"
                />
                {query && (
                    <X 
                        className="text-gray-400 w-4 h-4 cursor-pointer hover:text-pink-600" 
                        onClick={() => {setQuery(""); setIsOpen(false);}} 
                    />
                )}
            </div>

            {/* LIVE DROPDOWN */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] overflow-hidden">
                    {results.slice(0, 5).map((item) => (
                        <Link 
                            key={item.id} 
                            href={`/product/${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center p-3 hover:bg-pink-50 transition-all border-b border-gray-50 last:border-none"
                        >
                            <img src={item.images[0].src} className="w-10 h-14 object-cover rounded-lg mr-3" />
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item.description.title}</h4>
                                <p className="text-[10px] text-pink-600 font-bold">{item.description.price}</p>
                            </div>
                        </Link>
                    ))}
                    <button 
                        onClick={executeNavigation}
                        className="w-full py-2 bg-pink-50 text-[10px] font-bold text-pink-700 hover:bg-pink-100 uppercase"
                    >
                        View all {results.length} results
                    </button>
                </div>
            )}
        </div>
    );
}