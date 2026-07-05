import { ErrorBoundary } from 'react-error-boundary'

export default function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div className='p-2 text-red-400'>
            <h3>⚠️ Something went wrong here</h3>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary} className='mt-2 px-4 py-2 bg-red-500 text-white rounded cursor-pointer'>
                Try again
            </button>
        </div>
    )
}