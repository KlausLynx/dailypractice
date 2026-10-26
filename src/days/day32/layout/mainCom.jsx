import { CounterUi } from "../components/Counter";
import { ProductList } from "../components/ProductList";
import { CartSummary } from "../components/CartSummary";
import { ThemeButton } from "../components/ThemeButton";
import { ThemeWrapper } from "../components/ThemeWrapper";

export default function MainComponent() {
    return (
        <ThemeWrapper>
            <div className="min-h-screen font-sans antialiased transition-colors duration-300">
                {/* Global Header Banner */}
                <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <ThemeButton />
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                    Application Dashboard
                                </h1>
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Manage global state items synchronously
                                </p>
                            </div>
                        </div>
                        
                        {/* Isolated Counter Component in Global Navigation Bar */}
                        <div className="w-full sm:w-auto bg-zinc-50 dark:bg-zinc-800/50 p-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/40">
                            <CounterUi />
                        </div>
                    </div>
                </header>

                {/* Main Content Layout Container */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        {/* Left Column: Occupies 2/3 width on wide screens */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm ring-1 ring-zinc-100/50 dark:ring-zinc-900/50 transition-all duration-300">
                                <ProductList />
                            </div>
                        </div>

                        {/* Right Column (Sidebar): Occupies 1/3 width on wide screens */}
                        <div className="lg:col-span-1 lg:sticky lg:top-24">
                            <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-md shadow-zinc-100/40 dark:shadow-none transition-all duration-300">
                                <CartSummary />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </ThemeWrapper>
    );
}
