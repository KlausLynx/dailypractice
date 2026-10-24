import { useState } from 'react';
import { User, Bell, Sliders, Shield, Save } from 'lucide-react';

export const Component = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile Account', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'preferences', name: 'Preferences', icon: Sliders },
        { id: 'security', name: 'Security & Privacy', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            {/* Header banner */}
            <div className="border-b border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto max-w-5xl text-black">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        This is the Settings Page
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage your profile configuration, application settings, and preference targets.
                    </p>
                </div>
            </div>

            {/* Layout Wrapper */}
            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="grid gap-8 md:grid-cols-4">
                    
                    {/* Settings Sidebar Navigation */}
                    <aside className="md:col-span-1">
                        <nav className="flex flex-col gap-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`inline-flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer text-left ${
                                            isActive
                                                ? 'bg-amber-400 text-amber-950 font-semibold shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800/60'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Active Configuration Panel */}
                    <main className="md:col-span-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="text-xl font-bold capitalize tracking-tight">
                                {activeTab} Configuration
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Make adjustments to your operational workspace views below.
                            </p>

                            {/* Dynamic Mock Fields */}
                            <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Display Identity Name
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Admin User" 
                                        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 placeholder:text-slate-400 placeholder:italic dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Interface Preference
                                    </label>
                                    <select className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950">
                                        <option>Follow System Settings</option>
                                        <option>Light Theme</option>
                                        <option>Dark Theme</option>
                                    </select>
                                </div>
                            </div>

                            {/* Footer Call to Action */}
                            <div className="mt-8 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
                                <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer">
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};
