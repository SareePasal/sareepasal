"use client";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SaleBanner from "../components/Landing/SaleBanner";
import CategoryGrid from "../components/Landing/CategoryGrid";
import Recommendations from "../components/Landing/Recommendations";
import GoogleReviews from "../components/Landing/GoogleReviews";
import AboutSection from "../components/Landing/AboutSection"; // Added this back in
import { motion } from "framer-motion";

// --- ADD THESE THREE IMPORTS FOR THE DATA MOVER ---
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import KimoraSindhuri from '../components/Saree/KimoraSindhuri'; 

export default function Home() {
  const [user] = useAuthState(auth); // Listen to who is logged in

  const uploadToCloud = async () => {
    try {
      // SMART LOGIC: We use the product code as the ID. 
      // This way, if you click it twice, it just updates the existing one!
      const productID = KimoraSindhuri.description.code; 
      
      await setDoc(doc(db, "products", productID), {
        title: KimoraSindhuri.description.title,
        price: KimoraSindhuri.description.price,
        code: KimoraSindhuri.description.code,
        image: KimoraSindhuri.images[0].src,
        isOnSale: false,
        showInBanner: true,
        size: KimoraSindhuri.description.size,
        quantity: 10,
        type: "Saree"
      }, { merge: true }); // "merge" means it updates existing info safely

      alert("Success! Cloud updated without creating duplicates! 🌸");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="mt-2">
        <SaleBanner />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-bold text-center text-pink-900 mb-8"
        >
          Our Collections
        </motion.h2>
        <CategoryGrid />
      </section>

      <section className="bg-pink-50/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-pink-900 mb-8">Selected for You</h2>
          <Recommendations />
        </div>
      </section>

      <AboutSection />

      <section className="py-16">
        <GoogleReviews />
      </section>

      {/* 2. PROTECTED BUTTON: Only visible if YOU are logged in */}
      {user?.email === "sareepasalusa@gmail.com" && (
        <div className="bg-gray-100 p-10 text-center border-t-4 border-black">
          <p className="mb-4 font-bold text-red-600 underline">ADMIN DATA MOVER (PROTECTED)</p>
          <button 
              onClick={uploadToCloud} 
              className="bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-gray-800"
          >
              UPDATE DATABASE
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}