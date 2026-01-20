"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Star } from 'lucide-react';

const reviews = [
  { name: "Bipul Mainali", text: "Loved this kurta! Vibrant color, perfect fit, super comfortable, and delivered quickly. Highly recommend!", stars: 5 },
  { name: "Rubina Karki", text: "Few days back , I got a Kurtha set from them. I was super happy with the purchase because the kurtha set was perfectly fitted and quality was also good . Additionally, it was also timely delivered . Highly recommended for traditional attire", stars: 5 },
  { name: "Biwash Shrestha", text: "I am absolutely thrilled with my recent purchase from Saree Pasal, and I couldn't recommend them highly enough! Their online fashion clothing platform truly exceeded my expectations in every way.", stars: 5 },
  { name: "Shristi Bhattarai", text: "Bought a lehenga and saree for Dushera and Navaratri, and they exceeded my expectations! The designs are stunning, and the quality is top-notch. The price? Surprisingly affordable for what you get. I received endless compliments on my outfits—highly recommend to anyone looking for stylish ethnic wear!", stars: 5 },
  //{ name: "Anjali Rai", text: "Best ethnic wear shop online. The customer service is very helpful.", stars: 5 },

];

export default function GoogleReviews() {
  return (
    <div className="bg-white px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-pink-900">What Our Customers Say</h2>
        <div className="flex justify-center mt-2 text-yellow-500">
           {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="max-w-3xl"
      >
        {reviews.map((rev, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center p-8 bg-pink-50 rounded-3xl mx-4">
              <p className="italic text-gray-700 text-lg mb-4">"{rev.text}"</p>
              <p className="font-bold text-pink-900">— {rev.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-2">Happy with your purchase?</p>
        <a 
          href="https://g.page/r/CW-wRhwAq57dEAE/review" 
          target="_blank" 
          className="text-pink-600 font-bold hover:underline"
        >
          Click here to leave us a 5-star Google Review!
        </a>
      </div>
    </div>
  );
}