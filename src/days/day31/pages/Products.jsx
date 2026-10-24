import { Link } from "react-router"
import { products } from "../data/productData"

export const Component = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center sm:text-left">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Featured Products
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Explore our latest collection of premium gear and accessories.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Image & Badge Container */}
                            <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Stock Status Badge */}
                                <span className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
                                    product.inStock 
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Product Info Block */}
                            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                                        {product.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                                        {product.name}
                                    </h3>
                                    {/* Star Rating Layout */}
                                    <div className="flex items-center gap-1">
                                        <span className="text-amber-400 text-sm">★</span>
                                        <span className="text-xs text-zinc-400 font-medium">{product.rating}</span>
                                    </div>
                                </div>

                                {/* Price and Action Button Row */}
                                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                    <span className="text-xl font-extrabold text-white">
                                        ${product.price?.toFixed(2)}
                                    </span>
                                    <Link 
                                        to={`/products/${product.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-zinc-800 hover:bg-indigo-600 active:bg-indigo-700 transition-colors duration-200 border border-zinc-700 hover:border-transparent"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
