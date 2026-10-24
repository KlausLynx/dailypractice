import { products } from '../data/productData'
import { Link, useParams } from 'react-router'

export const Component = () => {
    const { id } = useParams();
    
    const product = products.find(product => product.id === Number(id))
    
    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center px-4">
                <div className="text-center space-y-5 max-w-sm">
                    <span className="text-4xl">🔍</span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">Product Not Found</h1>
                    <p className="text-sm text-zinc-400">
                        The item you are looking for doesn't exist or may have been removed.
                    </p>
                    <Link 
                        to="/products" 
                        className="inline-flex w-full justify-center items-center px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors duration-200"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    // Styled Product Detail Layout
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
                
                <div className="relative bg-zinc-800 aspect-square md:aspect-auto h-full min-h-[300px]">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center"
                    />
                    <span className={`absolute top-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-md ${
                        product.inStock 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                {/* Product Meta Section */}
                <div className="p-8 sm:p-10 flex flex-col justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-800">
                                <span className="text-amber-400 text-xs">★</span>
                                <span className="text-xs text-zinc-300 font-semibold">{product.rating}</span>
                            </div>
                        </div>
                        
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                            {product.name}
                        </h1>
                        
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Experience next-tier performance and premium build quality. Designed seamlessly to integrate with your lifestyle workflows.
                        </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-zinc-800">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-medium text-zinc-400">Total Price</span>
                            <span className="text-3xl font-black text-white">
                                ${product.price?.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <Link 
                                to="/products" 
                                className="flex-1 text-center px-4 py-3 text-sm font-semibold rounded-xl text-zinc-300 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-800 transition-colors duration-200 border border-zinc-700"
                            >
                                Back
                            </Link>
                            <button 
                                className={`flex-2 py-3 px-4 font-semibold rounded-xl transition-all duration-200 shadow-md ${
                                    product.inStock 
                                        ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-indigo-600/10' 
                                        : 'bg-zinc-800 text-zinc-500 border border-zinc-800 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {product.inStock ? 'Add to Cart' : 'Sold Out'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
