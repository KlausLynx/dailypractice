import { Link } from "react-router"
import { ArrowLeft } from 'lucide-react'

export const Component = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <div className="w-full max-w-md text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    404 Error
                </p>
                
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Page Not Found
                </h1>
                
                <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                    Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
                </p>
                
                <div className="mt-8 flex justify-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        <ArrowLeft className="h-4 w-4" /> 
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
