import { ProductGallery } from "../components/productgallery";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorBound";
import RelatedProducts from "../components/relatedProducts";
import { useCallback, lazy, Suspense, useMemo} from "react";
import { useCart } from "../hooks/usecart";
import Tabs from "../components/ProductTabs";
const Reviews = lazy(()=> import("../components/Reviews"));
const Shipping = lazy(()=> import("../components/Shipping"));
const PRODUCT = {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 149.99,
    description: 'Experience studio-quality sound with active noise cancellation, 30-hour battery life, and premium comfort padding.',
    images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
        'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400',
    ],
    specs: {
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.0',
        'Driver Size': '40mm',
        'Weight': '250g',
        'Noise Cancellation': 'Active (ANC)',
    }
};

const RELATED_PRODUCTS = [ 
    { id: 2, name: 'Sport Earbuds', price: 79.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200' },
    { id: 3, name: 'Studio Monitor', price: 199.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
    { id: 4, name: 'Portable Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200' },
];

export const ProductPage = () => {
    const { addItem, itemCount, total, handleQuantityUpdate, quantityUpdate } = useCart()

    const handleRelatedProductsAddToCart = useCallback((product, qty = 1) => {
        addItem(product, qty);
    }, [addItem]);

    const handleAddToCart = useCallback((product, qty = 1) => {
        if (quantityUpdate > 0) {
            addItem(product, quantityUpdate)
        }else {
            addItem(product, qty);
        }
    }, [addItem, quantityUpdate]);

    const savingsInfo = useMemo(() => {
        const originalPrice = PRODUCT.price * 1.25;
        const savings = originalPrice - PRODUCT.price;
        return {
        originalPrice: originalPrice.toFixed(2),
        savings: savings.toFixed(2),
        percentOff: 20
        };
    }, []);  

    return(
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <span style={{
                background: '#4f46e5',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px'
                }}>
                🛒 Cart: {itemCount} items — ${total.toFixed(2)}
                </span>
            </div>
            <div>
                <ErrorBoundary fallbackRender={({error, resetErrorBoundary}) => <div> {error.message} <br /> <button onClick={resetErrorBoundary}>Try Again</button></div>}>
                    <ProductGallery productImages={PRODUCT.images} productName={PRODUCT.name}/>
                </ErrorBoundary>
            </div>
                
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
                    {PRODUCT.name}
                </h1>

                {/* Price with savings badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '32px', fontWeight: '800', color: '#4f46e5' }}>
                        ${PRODUCT.price}
                    </span>
                    <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '18px' }}>
                    ${savingsInfo.originalPrice}
                    </span>
                    <span style={{
                    background: '#dcfce7',
                    color: '#16a34a',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600'
                    }}>
                    Save {savingsInfo.percentOff}% (${savingsInfo.savings})
                    </span>
                </div>

                <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '24px' }}>
                    {PRODUCT.description}
                </p>
                {/* Quantity Selector Row */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',   
                    gap: '12px', 
                    marginBottom: '12px' 
                }}>
                    <button type="button" onClick={() => handleQuantityUpdate(PRODUCT, -1)}
                        style={{
                            padding: '14px 20px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>
                        -
                    </button>

                    <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                        {quantityUpdate}
                    </span>

                    <button type="button" onClick={() => handleQuantityUpdate(PRODUCT, 1)}
                        style={{
                            padding: '14px 20px',
                            background: '#4f4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer'
                        }}>
                        +
                    </button>
                </div>
                {/* Add to Cart Button - now its own separate full-width block */}
                <button onClick={() => handleAddToCart(PRODUCT)}
                    style={{
                    width: '100%',
                    padding: '14px',
                    background: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginBottom: '12px'
                    }}>
                    Add to Cart
                </button>

                <button style={{
                    width: '100%',
                    padding: '14px',
                    background: 'white',
                    color: '#4f46e5',
                    border: '2px solid #4f46e5',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>
                    ♡ Add to Wishlist
                </button>
            </div>
            {/* Tabs — Compound Component Pattern */}
            <Tabs defaultTab="description">
                <Tabs.TabList>
                    <Tabs.Tab id="description">Description</Tabs.Tab>
                    <Tabs.Tab id="specs">Specifications</Tabs.Tab>
                    <Tabs.Tab id="reviews">Reviews</Tabs.Tab>
                    <Tabs.Tab id="shipping">Shipping</Tabs.Tab>
                </Tabs.TabList>

                <Tabs.TabPanel id="description">
                <p style={{ color: '#4b5563', lineHeight: '1.8' }}>
                    {PRODUCT.description} These headphones feature advanced 40mm drivers
                    delivering crystal-clear highs and deep, punchy bass. The ergonomic
                    design ensures hours of comfortable listening, perfect for work, travel,
                    or workouts.
                </p>
                </Tabs.TabPanel>

                <Tabs.TabPanel id="specs">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                    {Object.entries(PRODUCT.specs).map(([key, value]) => (
                        <tr key={key} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#374151', width: '40%' }}>{key}</td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Tabs.TabPanel>

                {/* Reviews tab uses Suspense + lazy loading */}
                <Tabs.TabPanel id="reviews">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense 
                        fallback={ <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                            Loading reviews...
                        </div>}>
                        <Reviews productId={PRODUCT.id} />
                    </Suspense>               
                </ErrorBoundary>
                </Tabs.TabPanel>

                {/* Shipping tab uses Suspense + lazy loading */}
                <Tabs.TabPanel id="shipping">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense 
                        fallback={ <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                            Loading shipping Info...
                        </div>}>
                        <Shipping/>
                    </Suspense>               
                </ErrorBoundary>
                </Tabs.TabPanel>
            </Tabs>

            <div style={{ marginTop: '50px' }}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <RelatedProducts
                        products={RELATED_PRODUCTS}
                        onAddToCart={handleRelatedProductsAddToCart}
                    />
                </ErrorBoundary>
            </div>
        </div>
    )
}