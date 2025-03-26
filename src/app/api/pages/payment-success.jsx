'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const total = searchParams.get('total');

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-500 dark:text-green-400 mb-4">
          🎉 Payment Successful! 🎉
        </h1>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Thank you for shopping with <span className="font-bold text-purple-600">Saree Pasal</span>.
        </p>
        {total && (
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Total Amount: <span className="font-bold">${total}</span>
          </p>
        )}
        <Link
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}