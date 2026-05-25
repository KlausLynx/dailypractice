import React, { useState } from 'react';
import {ShoppingCart} from 'lucide-react';

const CartBadge = () => {
  const [cartItems, setCartItems] = useState(0);
  const addItemToCart = () => {
    setCartItems(cartItems + 1);
  }
  return (
    <div>
      
      <button onClick={addItemToCart} className="relative p-2 bg-blue-500 text-white rounded-lg">
        {cartItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        <ShoppingCart strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default CartBadge

