// Exercise 2: Shopping Cart
// Build a shopping cart system with:
// CartContext: Items, add/remove/update quantity
// Calculate total with useMemo
// Persist cart to localStorage
// Show cart count badge in header

import { useEffect } from "react";
import { useCart } from "./context/index"

// Helper Function
const inStock = (quantity) => {
    if (quantity > 0) {
        return true
    }
    return false
}
const products =  [
    {
        id: 1,
        quantity: 0,
        price: 999.99,
        name: "MacBook Apple",
        product: "Laptop",
        category: "Accessories",
        isInStock: function() {
            return inStock(this.quantity)
        }
    },
    {
        id: 2,
        quantity: 3,
        price: 799.99,
        name: "Hp EliteBook",
        product: "Laptop",
        category: "Accessories",
        isInStock: function() {
            return inStock(this.quantity)
        },
    },
    {

        id: 3,
        quantity: 19,
        price: 499.99,
        name: "Dell",
        product: "Laptop",
        category: "Accessories",
        isInStock: function() {
            return inStock(this.quantity)
        },      
    },
    {
        id: 4,
        quantity: 0,
        price: 199.99,
        name: "Nike Air",
        product: "Shoes",
        category: "Footwear",
        isInStock: function() {
            return inStock(this.quantity)
        },
    },
    {
        id: 5,
        quantity: 5,
        price: 149.99,
        name: "Adidas",
        product: "Shoes",
        category: "Footwear",
        isInStock: function() {
            return inStock(this.quantity)
        }
    }
]
export default function Shopping() {
    const { cart, addToCart,increment, decrement, removeFromCart, total, clearCart } = useCart();

    useEffect(() => {
        console.log(cart)
    }, [cart])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="grid grid-cols-3 place-items-center">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 mb-4 w-64">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>Category: {product.category}</p>
                        <p>In Stock: {product.isInStock() ? "Yes" : "No"}</p>

                        {/* decrement */}
                        <button onClick={()=> decrement(product)} disabled={!cart.find((item) => item.id === product.id)} className={`py-2 px-4 rounded mt-2 ${cart.find((item) => item.id === product.id) ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer " : "bg-gray-300 cursor-not-allowed"}`}>
                            -
                        </button>

                        <button onClick={()=> addToCart(product)} disabled={!product.isInStock()} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                            {product.isInStock() ? "Add to Cart" : "Out of Stock"}
                        </button>

                        {/* increment */}
                        <button onClick={()=> increment(product)} disabled={!product.isInStock()} className={`py-2 px-4 rounded mt-2 ${cart.find((item) => item.id === product.id) ? "bg-green-500 hover:bg-green-600 cursor-pointer " : "bg-gray-300 cursor-not-allowed"}`}>
                            +
                        </button>

                        <button 
                        onClick={()=> removeFromCart(product.id)}
                        className={`py-2 px-4 rounded mt-2 ${cart.find((item) => item.id === product.id) ? "bg-red-500 hover:bg-red-600 cursor-pointer " : "bg-gray-300 cursor-not-allowed"}`}>
                            {cart.find((item) => item.id === product.id) ? "Remove from Cart" : "Not in Cart"}
                        </button>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Cart Total: ${total.toFixed(2)}</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mt-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    )
}