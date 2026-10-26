import { addItem } from "../store/cart";
import { useDispatch } from "react-redux";

const products = [
    { id: 1, name: "Keyboard", price: 25 },
    { id: 2, name: "Mouse", price: 15 },
    { id: 3, name: "Headphones", price: 40 },
];

export const ProductList = () => {
    const dispatch = useDispatch();

    return (
        <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
            <div 
                key={product.id} 
                className="flex flex-col justify-between p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
            >
                <div className="flex justify-between items-start mb-4">
                <div className="text-lg font-semibold text-gray-900">{product.name}</div>
                <div className="text-xl font-bold text-indigo-600">${product.price}</div>
                </div>
                
                <button 
                onClick={() => dispatch(addItem(product))}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer text-center"
                >
                Add to Cart
                </button>
            </div>
            ))}
        </div>
        </div>
    );
};
