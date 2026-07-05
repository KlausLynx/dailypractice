import { useCallback, useState, useMemo } from "react"
export const useCart = () => {
    const [items, setItems] = useState([]);
    const [quantityUpdate, setQuantityUpdate] = useState(1)

    const addItem = useCallback((product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item?.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item)
            }
            return [...prev, { ...product, quantity }];
        })
    },[]);

    const handleQuantityUpdate = useCallback((product, num) => {
        setQuantityUpdate(prev => {
            const newValue = Math.max(1, prev + num);
            console.log(product, newValue); 
            return newValue
        });
    }, [])

    const removeItem = useCallback((productId) => {
        setItems(prev => {
            return prev.filter(item => item.id !== productId)
        })
    },[]);

    const clearCart = useCallback(() => {
        setItems([])
    },[])

    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);
    
    const itemCount = useMemo(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    return { items, addItem, removeItem, clearCart, itemCount, total, handleQuantityUpdate, quantityUpdate};
}