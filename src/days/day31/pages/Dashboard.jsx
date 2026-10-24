import { useAuth } from "../auth/auth"
import { LayoutDashboard, TrendingUp, ShoppingBag, Users, Clock } from 'lucide-react'

export const Component = () => {
    const { user } = useAuth()

    // Fallback name if auth context is loading or evaluation is pending
    const userName = user?.name || "User";

    // Mock analytical data targets for structural display
    const stats = [
        { label: "Total Sessions", value: "1,482", change: "+12.3%", icon: Clock },
        { label: "Active Products", value: "24", change: "+4.5%", icon: ShoppingBag },
        { label: "Team Members", value: "8", change: "Stable", icon: Users },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            {/* Context Header */}
            <div className="border-b border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-black">
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Welcome, {userName}!
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            This is the Dashboard Page. Here is a baseline summary of your workspace parameters.
                        </p>
                    </div>
                    
                    {/* Action pill */}
                    <div className="inline-flex self-start items-center gap-2 rounded-lg bg-amber-400/20 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:bg-amber-400/10 dark:text-amber-400">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Workspace Active
                    </div>
                </div>
            </div>

            {/* Metrics & Analytics Workspace */}
            <main className="mx-auto max-w-6xl px-6 py-10">
                
                {/* Highlight Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {stat.label}
                                    </span>
                                    <div className="rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-2xl font-bold tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                                        stat.change.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'
                                    }`}>
                                        {stat.change.startsWith('+') && <TrendingUp className="h-3 w-3" />}
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Primary Panel Slate Block */}
                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="text-lg font-bold tracking-tight">System Status Log</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Operational nodes are routing metrics predictably across production servers.
                    </p>
                    
                    {/* Placeholder content boundary box */}
                    <div className="mt-6 flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                        <span className="text-sm text-slate-400">Operational data visualizers mount here</span>
                    </div>
                </div>

            </main>
        </div>
    );
};
