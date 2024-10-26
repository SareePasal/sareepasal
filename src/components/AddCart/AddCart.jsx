'use client'
import { useContext } from "react";
import * as React from 'react';
import  {StoreContext} from "../provider/Provider";
import { observer } from "mobx-react";

 const AddCart = observer((id) => {
  const { addToCart } = useContext(StoreContext)
  return (
    <div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-1 my-2 px-5 rounded-lg"
          onClick={e => addToCart(id)}>
           Add to Cart
      </button>
    </div>
  );
})

export default AddCart
