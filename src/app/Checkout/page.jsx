"use client";
import React, { useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from '../../lib/useCart';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Truck, CreditCard, Tag, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
    const [user] = useAuthState(auth);
    const { cart } = useCart();
    
    // 1. Initialize the Form Memory
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "United States"
    });

    const [promoInput, setPromoInput] = useState("");
    const [discountPercent, setDiscountPercent] = useState(5); // Start with 5%
    const [appliedMessage, setAppliedMessage] = useState("New Customer 5% Discount Applied");

    // 2. Math Calculations
    const subtotal = cart.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.toString().replace('$', ''));
        return acc + (priceNum * (item.quantity || 1));
    }, 0);

    const discountAmount = (subtotal * discountPercent) / 100;
    const finalTotal = subtotal - discountAmount;

    // 3. Handle Input Changes (Connecting the typing to the memory)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 4. Promo Logic
    const applyPromo = () => {
        const code = promoInput.toUpperCase().trim();
        if (code === "WELCOME10") {
            setDiscountPercent(10);
            setAppliedMessage("Success: 10% OFF Applied! 🎉");
        } else if (code === "WELCOME5") {
            setDiscountPercent(5);
            setAppliedMessage("Success: 5% OFF Applied!");
        } else {
            alert("Invalid Promo Code");
        }
    };

    // 5. Final Payment Function with Validation
    const handlePayment = async () => {
        // We check every single piece of data
        if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zip) {
            alert("❌ Please fill in all mandatory fields. We need this information for shipping and your order receipt.");
            return;
        }

        try {
            // Save details for the Success page to use in the Email/Admin record
            localStorage.setItem("temp_shipping", JSON.stringify({ 
                ...formData, 
                discountAmount: discountAmount.toFixed(2) 
            }));

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart, discountPercent }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; 
            } else {
                alert("Stripe Error: " + data.error);
            }
        } catch (error) {
            alert("Connection failed. Check your internet or terminal.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                
                {/* LEFT SIDE: FORM */}
                <div className="flex-[2] space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-pink-900 flex items-center gap-2">
                            <Truck className="text-pink-600" /> Shipping Details
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Full Name *</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Urwashi Adhikari" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Phone Number *</label>
                                <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="347..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Street Address *</label>
                                <input name="address" value={formData.address} onChange={handleInputChange} placeholder="11 Alpine Ln" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">City *</label>
                                <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Hicksville" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">State *</label>
                                <input name="state" value={formData.state} onChange={handleInputChange} placeholder="NY" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Zip Code *</label>
                                <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="11801" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Country</label>
                                <input disabled value="United States" className="w-full p-4 bg-gray-100 text-gray-400 border-none rounded-2xl cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><Tag className="text-pink-600" size={18}/> Have a Promo Code?</h3>
                        <div className="flex gap-2">
                            <input placeholder="ENTER CODE" value={promoInput} onChange={e => setPromoInput(e.target.value)} className="flex-1 p-4 bg-gray-50 rounded-2xl border-none uppercase focus:ring-2 focus:ring-pink-500" />
                            <button onClick={applyPromo} className="bg-gray-900 text-white px-8 rounded-2xl font-bold hover:bg-black transition-all">Apply</button>
                        </div>
                        <p className="mt-2 text-xs text-green-600 font-bold">{appliedMessage}</p>
                    </div>
                </div>

                {/* RIGHT SIDE: SUMMARY */}
                <div className="flex-1">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-pink-100 sticky top-32">
                        <h3 className="text-xl font-bold mb-6 text-gray-900">Final Summary</h3>
                        <div className="space-y-4 border-b pb-6 mb-6">
                            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-green-600 font-bold"><span>Discount ({discountPercent}%)</span><span>-${discountAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between text-2xl font-bold text-pink-700 pt-2 border-t"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
                        </div>
                        <button onClick={handlePayment} className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-pink-800 active:scale-95 transition-all">
                            <CreditCard size={20} /> PAY WITH STRIPE
                        </button>
                        <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed flex items-center justify-center gap-1">
                            <AlertCircle size={10} /> All fields marked with * are required.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}