"use client";
import React, { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../lib/useCart';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SuccessPage() {
    const { cart, clearCart } = useCart();
    const [user] = useAuthState(auth);
    const [status, setStatus] = useState("saving");

    useEffect(() => {
        const finalizeOrder = async () => {
            if (!user || cart.length === 0) return;

            try {
                const shipping = JSON.parse(localStorage.getItem("temp_shipping") || "{}");
                
                const subtotalValue = cart.reduce((acc, item) => {
                    const priceNum = parseFloat(item.price.toString().replace('$', ''));
                    return acc + (priceNum * (item.quantity || 1));
                }, 0);

                const discountValue = parseFloat(shipping.discountAmount || 0);
                const finalPaid = (subtotalValue - discountValue).toFixed(2);

                const orderData = {
                    customerName: shipping.name || user.displayName,
                    customerEmail: user.email,
                    customerPhone: shipping.phone || "N/A",
                    shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`,
                    items: cart,
                    subtotal: subtotalValue.toFixed(2),
                    discountAmount: discountValue.toFixed(2),
                    totalAmount: finalPaid,
                    status: "Pending",
                    createdAt: serverTimestamp()
                };

                // 1. Save to Database
                await addDoc(collection(db, "orders"), orderData);

                // 2. Send Email
                const emailResponse = await fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                });

                if (!emailResponse.ok) throw new Error("Email API failed");

                // 3. Success!
                clearCart();
                localStorage.removeItem("temp_shipping");
                setStatus("done");

            } catch (err) {
                console.error("Finalize Order Error:", err);
                setStatus("error");
            }
        };

        finalizeOrder();
    }, [user, cart]);

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-xl w-full">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${status === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {status === 'saving' ? <Loader2 className="animate-spin" size={48} /> : <CheckCircle size={48} />}
                </div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                    {status === 'saving' ? 'Saving Order...' : 'Success!'}
                </h1>
                <p className="text-gray-500 mb-10 text-lg">
                    {status === 'saving' 
                        ? 'Please do not refresh this page...' 
                        : `Your order is confirmed. A receipt has been sent to ${user?.email}.`}
                </p>
                <Link href="/" className="bg-pink-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl">
                    <ArrowLeft size={20} /> BACK TO SHOP
                </Link>
            </div>
            <Footer />
        </main>
    );
}