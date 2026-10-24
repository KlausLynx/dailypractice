// pages/Forbidden.jsx
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router'; // Add your routing framework link import here if needed

export function Component() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <div className="w-full max-w-md text-center">
                {/* Visual Security Indicator */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    <ShieldAlert className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                    403 Error
                </p>
                
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Access Forbidden
                </h1>
                
                <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
                    You don't have permission to view this page. You ain't the admin.
                </p>
                
                {/* Fallback Action */}
                <div className="mt-8 flex justify-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:outline-slate-50"
                    >
                        <ArrowLeft className="h-4 w-4 text-black" /> 
                        <span className='text-black'>Go Back</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
