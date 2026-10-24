import { Link } from "react-router"

export const Home = () => {
    return (
        <div className="h-750 flex flex-col justify-center items-center bg-zinc-950 text-zinc-100 px-4">
        <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col items-center text-center gap-6">
            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Welcome Home
            </h1>

            {/* Info & CTA Wrapper */}
            <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-zinc-400 font-medium">
                Ready to explore? Let's head over to the about section.
            </p>
            
            {/* Action Link */}
            <Link 
                to="/about" 
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200 text-center"
            >
                Go to About Page
            </Link>
            </div>
        </div>
        </div>
    )
}
