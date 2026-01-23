"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send, PhoneForwarded, RefreshCcw, ExternalLink, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [input, setInput] = useState("");
    const [step, setStep] = useState("START"); 
    const [preferences, setPreferences] = useState({ category: "", color: "" });
    const scrollRef = useRef(null);

    const initialMessage = { 
        role: 'bot', 
        text: "Namaste! 🙏 Welcome to Saree Pasal Chat.\n\nI can help you find the perfect outfit by color, type, or even your budget (e.g. 'under 100').\n\nHow can I help you today?\n1️⃣ Sarees\n2️⃣ Lehengas\n3️⃣ Gowns\n4️⃣ Shipping & Returns Info" 
    };

    const [messages, setMessages] = useState([initialMessage]);

    useEffect(() => {
        const loadInventory = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const available = items.filter(item => {
                    const hasVariants = item.variants && item.variants.length > 0;
                    const allVariantsEmpty = hasVariants && item.variants.every(v => Number(v.qty) <= 0);
                    const isGlobalZero = !hasVariants && Number(item.quantity) === 0;
                    const hasSoldOutText = (item.price || "").toString().toUpperCase().includes("SOLD OUT");
                    return !allVariantsEmpty && !isGlobalZero && !hasSoldOutText;
                });
                setAllProducts(available);
            } catch (err) { console.error(err); }
        };
        if (isOpen) loadInventory();
    }, [isOpen]);

    const handleRestart = () => {
        setMessages([initialMessage]);
        setStep("START");
        setPreferences({ category: "", color: "" });
        setInput("");
    };

    // --- ENHANCED LOGIC ENGINE ---
    const getBotResponse = (userInput) => {
        const q = userInput.toLowerCase().trim();

        // 1. PRICE DETECTION (e.g. "under 50", "below 100")
        const priceMatch = q.match(/(under|below|less than|budget)\s*\$?\s*(\d+)/);
        if (priceMatch) {
            const maxPrice = parseFloat(priceMatch[2]);
            const matches = allProducts.filter(p => {
                const pPrice = parseFloat(p.price?.toString().replace(/[^0-9.]/g, "") || "0");
                return pPrice <= maxPrice;
            }).slice(0, 5);

            if (matches.length > 0) {
                return {
                    text: `I found these beautiful items under $${maxPrice} for you! ✨`,
                    links: matches.map(m => ({ title: m.title, url: `/product/${m.id}`, price: m.price }))
                };
            }
            return { text: `I don't have anything under $${maxPrice} right now. Would you like to see our latest arrivals?` };
        }

        // 2. SHIPPING & RETURNS (Handling Option "4" or Keywords)
        if (["4", "ship", "delivery", "policy", "time"].some(w => q.includes(w))) {
            return { text: "🚚 **Shipping:** We offer **FREE SHIPPING** on all orders in the USA! Delivery usually takes **3-5 business days after product is shipped and based on the location**.\n\n🌸 **Returns:** To keep our prices the lowest, all sales are final. No Returns! No Exchange!!" };
        }

        if (["return", "exchange", "refund", "policy"].some(w => q.includes(w))) {
            return { text: "🌸 **Return Policy:** To keep our prices the most affordable in the market, all sales at Saree Pasal are final. No retrun, No Exchange allowed. \n\nHowever, we hand-inspect every piece for 100% quality before it leaves our New York boutique!" };
        }

        if (["contact", "whatsapp", "phone", "owner", "call", "talk", "human", "4"].some(w => q.includes(w))) {
            return { text: "You can talk directly to Urwashi! Click the **WhatsApp** button below or call us at **(347) 771-2375** regarding your query. She can  help with custom orders and sizing! 📞" };
        }

        // 3. GREETINGS
        if (["hi", "hello", "namaste", "hey", "menu"].some(w => q === w)) {
            setStep("START");
            return { text: "Namaste! 🙏 How can I help you today?\n\n1️⃣ Saree\n2️⃣ Lehenga\n3️⃣ Gown\n4️⃣ Support" };
        }

        // 4. CONVERSATIONAL FLOW
        if (step === "START") {
            let cat = "";
            if (q.includes("1") || q.includes("saree")) cat = "Saree";
            if (q.includes("2") || q.includes("lehenga")) cat = "Lehenga";
            if (q.includes("3") || q.includes("gown")) cat = "Gown";

            if (cat) {
                setPreferences({ category: cat });
                setStep("ASK_COLOR");
                return { text: `Lovely choice! 🌸 Our ${cat} collection is very popular. What **color** are you looking for? (Red, Green, Pastel, Gold...)` };
            }
        }

        if (step === "ASK_COLOR") {
            const matches = allProducts.filter(p => {
                const searchPool = `${p.title} ${p.type} ${p.details}`.toLowerCase();
                return searchPool.includes(preferences.category.toLowerCase()) && searchPool.includes(q);
            }).slice(0, 5);

            setStep("START"); // Reset flow for next question
            if (matches.length > 0) {
                return {
                    text: `Excellent! ✨ I've found these ${q} ${preferences.category}s for you:`,
                    links: matches.map(m => ({ title: m.title, url: `/product/${m.id}`, price: m.price }))
                };
            }
            return { text: `I couldn't find a ${q} ${preferences.category} in stock, but click "Shop All" to see our other stunning designs!` };
        }

        // 5. COLOR KEYWORD SEARCH (Anytime)
        const colors = ["red", "green", "blue", "yellow", "pink", "maroon", "gold", "white", "black", "pastel"];
        const foundColor = colors.find(c => q.includes(c));
        if (foundColor) {
            const matches = allProducts.filter(p => `${p.title} ${p.details}`.toLowerCase().includes(foundColor)).slice(0, 5);
            if (matches.length > 0) {
                return {
                    text: `I found some beautiful ${foundColor} items for you:`,
                    links: matches.map(m => ({ title: m.title, url: `/product/${m.id}`, price: m.price }))
                };
            }
        }

        // 6. CONTACT FALLBACK
        return { text: "I want to make sure you find the perfect outfit! 🌸\n\nWould you like to speak directly with Urwashi on **WhatsApp**? She can help with custom orders!" };
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            const response = getBotResponse(currentInput);
            setMessages(prev => [...prev, { role: 'bot', ...response }]);
            setIsTyping(false);
        }, 800);
    };

    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

    return (
        <div className="fixed bottom-6 right-6 z-[999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white w-[330px] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl border border-pink-100 flex flex-col overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="bg-pink-900 p-6 text-white flex justify-between items-center shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white text-pink-900 rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-inner border border-pink-200">S</div>
                                <div>
                                    <h3 className="font-bold text-base tracking-tight uppercase">Saree Pasal Chat</h3>
                                    <p className="text-[10px] text-pink-200 flex items-center gap-1 font-bold italic">
                                        <Sparkles size={10}/> ONLINE ASSISTANT
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleRestart} className="hover:bg-white/10 p-2 rounded-full transition-all" title="Restart Chat"><RefreshCcw size={18}/></button>
                                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all"><X size={20}/></button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm ${m.role === 'user' ? 'bg-pink-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-pink-50'}`}>
                                        {m.text}
                                    </div>
                                    {m.links && (
                                        <div className="mt-4 w-full space-y-2 animate-in fade-in slide-in-from-bottom-2">
                                            {m.links.map((link, idx) => (
                                                <Link key={idx} href={link.url} className="flex items-center justify-between bg-white border border-pink-100 p-4 rounded-xl hover:bg-pink-50 transition-all shadow-sm group active:scale-95">
                                                    <span className="text-xs font-bold text-gray-700 truncate mr-2">{link.title}</span>
                                                    <span className="text-[10px] font-black text-pink-600 shrink-0 flex items-center gap-1">{link.price} <ExternalLink size={10} /></span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white px-4 py-3 rounded-2xl border border-pink-50 shadow-sm flex gap-1">
                                        {[0, 1, 2].map(dot => (
                                            <motion.span key={dot} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }} className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-white border-t border-pink-50 space-y-3 shadow-inner">
                            <a href="https://wa.me/13477712375" target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-green-50 text-green-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all border border-green-100 shadow-sm font-sans">
                                <PhoneForwarded size={14}/> Message Urwashi on WhatsApp
                            </a>
                            <div className="flex gap-2">
                                <input className="flex-1 bg-gray-100 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-pink-500 placeholder:text-gray-400 font-medium" placeholder="Try 'under 50' or 'Red Saree'..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
                                <button onClick={handleSend} className="bg-pink-900 text-white p-4 rounded-2xl hover:bg-black transition-all shadow-lg"><Send size={20} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={() => setIsOpen(!isOpen)} className="bg-pink-900 text-white p-4 md:p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-white flex items-center justify-center group relative">
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
                {!isOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>}
            </button>
        </div>
    );
}