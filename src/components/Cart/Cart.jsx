'use client'
import {useContext } from "react";
import {StoreContext} from "../provider/Provider";
import { observer } from "mobx-react";
import Display from "./Display"

const Card = observer(() =>{
  const { currentCart, totalPrice} = useContext(StoreContext)
  return(
    <div>
      {
        currentCart.map((object,i)=>{
          return(
            <div class="flex justify-center p-4" key={i}>
              <Display key={i} item={object}/>
            </div>
          )
        }
      )}
      <span>Total Price: {totalPrice}</span>
    </div>
  )
})

export default Card