// Exercise 5 — Multiple Interactions
// Create a simple shopping cart item with "+" and "-" buttons and a quantity display starting at 1. Test that you can't go below 0 (quantity stays at 0 after clicking "-" when already at 0).
import { useState } from 'react'

export default function CartItem() {
    const [quantity, setQuantity] = useState(1)
    const increment = () => setQuantity(quantity + 1)
    const decrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0)

    return (
        <div>
            <h3>Item Name</h3>
            <p>Quantity: {quantity}</p>
            <button onClick={increment} aria-label='Increment'>+</button>
            <button onClick={decrement} aria-label='Decrement'>-</button>
        </div>
    )
}