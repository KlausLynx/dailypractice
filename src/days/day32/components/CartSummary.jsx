import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/cart";

export const CartSummary = () => {
    const total = useSelector((state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0));
    const totalPrice = useSelector((state) => state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0));
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="w-full bg-white dark:bg-zinc-950 transition-colors duration-300">
            {/* Component Header Block */}
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Your Order
                </h2>
                <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-100/50 dark:border-indigo-500/20 tabular-nums">
                    {total} {total === 1 ? "item" : "items"}
                </span>
            </div>

            {/* Content Switcher: Empty state vs Item List */}
            {cart.length === 0 ? (
                <div className="text-center py-10 text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                    Your cart is completely empty.
                </div>
            ) : (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 max-h-[360px] overflow-y-auto pr-1">
                    {cart.map((cartItem) => (
                        <div key={cartItem.id} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-4 group">
                            <div className="flex flex-col min-w-0 pr-4">
                                <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 truncate">
                                    {cartItem.name}
                                </span>
                                {cartItem.price && (
                                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                                        <span className="text-zinc-600 dark:text-zinc-400 font-semibold text-sm tabular-nums">
                                            ${(cartItem.price * cartItem.qty).toLocaleString()}
                                        </span>
                                        <span>•</span>
                                        <span>Qty: {cartItem.qty}</span>
                                    </div>
                                )}
                            </div>
                            
                            <button
                                onClick={() => dispatch(removeItem(cartItem.id))}
                                className="text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-xl transition-all duration-200 cursor-pointer shrink-0 active:scale-90"
                                aria-label={`Remove ${cartItem.name} from cart`}
                            >
                                <svg
                                    xmlns="http://w3.org"
                                    className="h-4.5 w-4.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Total Pricing Footer Block */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-2">
                <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-xl border border-zinc-100/50 dark:border-zinc-800/40">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Total Amount
                    </span>
                    <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums">
                        ${totalPrice.toLocaleString()}
                    </span>
                </div>
                
                {/* Modern Interactive Checkout Action Button */}
                {cart.length > 0 && (
                    <button className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm active:scale-[0.99] cursor-pointer">
                        Proceed to Checkout
                    </button>
                )}
            </div>
        </div>
    );
};
