import { memo } from 'react';

// Only re-renders if products array or onAddToCart reference changes
const RelatedProducts = memo(({ products, onAddToCart }) => {
    console.log('RelatedProducts rendered');

    return (
        <div>
        <h3>You Might Also Like</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {products.map(product => (
            <div key={product.id} style={{
                width: '180px',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                />
                <div style={{ padding: '12px' }}>
                <p style={{ fontWeight: '600', fontSize: '14px', margin: '0 0 4px' }}>
                    {product.name}
                </p>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 10px' }}>
                    ${product.price}
                </p>
                <button
                    onClick={() => onAddToCart(product)}
                    style={{
                    width: '100%',
                    padding: '6px',
                    background: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                    }}
                >
                    Add to Cart
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
});

export default RelatedProducts;