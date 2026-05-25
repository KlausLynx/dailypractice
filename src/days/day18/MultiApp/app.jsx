import ThemeProvider from './themeProvider';
import { UserProvider } from './userContext';
import { CartProvider } from './cartContext';
import Header from './header';
import { ProductCard, CartDisplay } from './display';

// Sample products for testing
const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Headphones', price: 199 }
];

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <CartProvider>
                    <Header />
                    <div className="products">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <CartDisplay />
                </CartProvider>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;