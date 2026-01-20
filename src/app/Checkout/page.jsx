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
    
    const [formData, setFormData] = useState({
        name: "", phone: "", address: "", city: "", state: "", zip: "", country: "United States"
    });

    const [promoInput, setPromoInput] = useState("");
    const [discountPercent, setDiscountPercent] = useState(5); 
    const [appliedMessage, setAppliedMessage] = useState("New Customer 5% Discount Applied");

    const subtotal = cart.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.toString().replace('$', ''));
        return acc + (priceNum * (item.quantity || 1));
    }, 0);

    const discountAmount = (subtotal * discountPercent) / 100;
    const finalTotal = subtotal - discountAmount;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

    const handlePayment = async () => {
        if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.zip) {
            alert("❌ Please fill in all mandatory fields.");
            return;
        }

        try {
            localStorage.setItem("temp_shipping", JSON.stringify({ 
                ...formData, 
                discountAmount: discountAmount.toFixed(2) 
            }));

            // This CALLS the API, but it is not the API itself
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
            alert("Connection failed. Check your terminal.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                <div className="flex-[2] space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-serif font-bold mb-6 text-pink-900 flex items-center gap-2"><Truck className="text-pink-600" /> Shipping Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="p-4 bg-gray-50 rounded-2xl" />
                            <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number *" className="p-4 bg-gray-50 rounded-2xl" />
                            <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address *" className="md:col-span-2 p-4 bg-gray-50 rounded-2xl" />
                            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City *" className="p-4 bg-gray-50 rounded-2xl" />
                            <input name="state" value={formData.state} onChange={handleInputChange} placeholder="State *" className="p-4 bg-gray-50 rounded-2xl" />
                            <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="Zip Code *" className="p-4 bg-gray-50 rounded-2xl" />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex gap-2">
                            <input placeholder="ENTER CODE" value={promoInput} onChange={e => setPromoInput(e.target.value)} className="flex-1 p-4 bg-gray-50 rounded-2xl uppercase" />
                            <button onClick={applyPromo} className="bg-gray-900 text-white px-8 rounded-2xl font-bold">Apply</button>
                        </div>
                        <p className="mt-2 text-xs text-green-600 font-bold">{appliedMessage}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-pink-100 sticky top-32">
                        <div className="space-y-4 border-b pb-6 mb-6 text-sm">
                            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-green-600 font-bold"><span>Discount</span><span>-${discountAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between text-2xl font-bold text-pink-700 border-t pt-2"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
                        </div>
                        <button onClick={handlePayment} className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3">
                            <CreditCard size={20} /> PAY WITH STRIPE
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}