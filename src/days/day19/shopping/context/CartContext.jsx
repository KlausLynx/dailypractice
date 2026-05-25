import { createContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export { CartContext };

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart(prevCart => {
            const exists = prevCart.find((cartItem) => cartItem.id === item.id)
            if (exists) {
                return prevCart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem) 
            }

            return [...prevCart, {...item, quantity: 1}]
        })
    }

    const increment = (item) => {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
        if (!cartItem) return; 
        
        if (cartItem.quantity >= item.quantity) return;
        return updateQuantity(item, cartItem.quantity + 1)
    }

    const decrement = (item) => {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
        updateQuantity(item, cartItem.quantity - 1)
    }
    const updateQuantity = (item, newQuantity) => {
        setCart(prevCart => {

            if (newQuantity <= 0) {
                return prevCart.filter((cartItem) => cartItem.id !== item.id)
            }

            return prevCart.map((cartItem) => {
                return cartItem.id === item.id ? {...cartItem, quantity: newQuantity} : cartItem
            })
        })
    }

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    }

    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cart]);

    const clearCart = () => {
        setCart([]);
    }

    const value = {
        cart,
        addToCart,
        increment,
        removeFromCart,
        updateQuantity,
        decrement,
        clearCart,
        total
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}