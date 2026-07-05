import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../components/ErrorBound'
import { ProductPage } from '../page/productPage'

function MainLayout() {
    return (
            <ProductPage/>
    )
}

export default MainLayout