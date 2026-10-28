import Counter from '../features/Counter'
import Todo from '../features/TodoList'
import { PostList } from '../features/Post'
import { LoadUsers } from '../features/userCall'

export default function MainComponent() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 antialiased">
            <div className="max-w-5xl mx-auto space-y-10">
                
                {/* Dashboard Control Header */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Personal Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage your stats, daily tasks, and team updates in one single place.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <LoadUsers />
                    </div>
                </header>

                {/* Dashboard Core Layout Grid */}
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Primary Left/Main Section: Applications & Content */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Todo List Component Card Container */}
                        <section aria-label="Task Management">
                            <Todo />
                        </section>

                        {/* Recent Community Feed / Post List Container */}
                        <section className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 p-6 border border-gray-100" aria-label="Recent Updates">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Community Activity
                            </h2>
                            <PostList />
                        </section>
                    </div>

                    {/* Secondary Right Sidebar Section: Metrics & Quick Controls */}
                    <aside className="lg:col-span-5 space-y-6">
                        {/* Counter Metrics Component Card Container */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 p-6 border border-gray-100">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Core Metrics
                            </h2>
                            <Counter />
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    )
}
