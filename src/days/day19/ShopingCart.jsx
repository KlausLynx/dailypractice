import Shopping from "./shopping/shopping"
import { CartProvider } from "./shopping/context/index"
export default function ShopingCart() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Shoping Cart</h1>
            <CartProvider>
                <Shopping />
            </CartProvider>
        </div>
    )
}