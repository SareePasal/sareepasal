'use client'
import { useContext, useState } from "react";
import { StoreContext } from "../provider/Provider";
import { observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion";

const AddCart = observer((id) => {
  const { addToCart } = useContext(StoreContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const addingCart = () => {
    if (id.color != "" && id.size != "") {
      addToCart(id);
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else if (id.color == "") {
      id.alert(true);
    } else if (id.size == "") {
      id.setAlertSize(true);
    } else {
      id.alert(true);
      id.setAlertSize(true);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
        onClick={addingCart}
      >
        Add to Cart
      </button>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 left-0 right-0 flex justify-center"
          >
            <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-1.5 rounded-md text-sm shadow-lg flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Added to cart!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default AddCart;