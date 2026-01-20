"use client";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SaleBanner from "../components/Landing/SaleBanner";
import CategoryGrid from "../components/Landing/CategoryGrid";
import Recommendations from "../components/Landing/Recommendations";
import AboutSection from "../components/Landing/AboutSection";
import GoogleReviews from "../components/Landing/GoogleReviews";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* 1. ANIMATED SALE BANNER */}
      <section className="mt-2">
        <SaleBanner />
      </section>

      {/* 2. PARENT CATEGORIES (Saree, Gown, etc.) */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center text-pink-900 mb-12 italic"
        >
          Our Collections
        </motion.h2>
        <CategoryGrid />
      </section>

      {/* 3. SMART RECOMMENDATIONS (Slidable Cards) */}
      <section className="bg-pink-50/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Recommendations />
        </div>
      </section>

      {/* 4. ABOUT THE OWNER */}
      <AboutSection />

      {/* 5. GOOGLE REVIEWS */}
      <section className="py-16">
        <GoogleReviews />
      </section>

      <Footer />
    </main>
  );
}