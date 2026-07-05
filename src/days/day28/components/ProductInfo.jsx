import {useState} from 'react'
function ProductInfo({ product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1)  

    return (
        <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',   
                    gap: '12px', 
                    marginBottom: '12px' 
                }}>
                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}
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

                    {/* <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                        {quantityUpdate}
                    </span> */}

                    <button onClick={() => onAddToCart(product, quantity)}>
                        Add to Cart
                    </button>

                    {/* <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}
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
                    </button> */}
                </div>
    )
}


export default ProductInfo