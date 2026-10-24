import { Info, Users, Sparkles, ArrowRight } from 'lucide-react'

export const Component = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            {/* Hero Section */}
            <div className="bg-amber-400 px-6 py-20 text-center shadow-inner">
                <div className="mx-auto max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-950">
                        <Sparkles className="h-3.5 w-3.5" /> Our Story
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-amber-950 sm:text-5xl lg:text-6xl">
                        This is the About Page
                    </h1>
                    <p className="mt-6 text-lg text-amber-900/90 max-w-xl mx-auto">
                        Building fast, code-split, modern web applications designed to deliver outstanding user experiences.
                    </p>
                </div>
            </div>

            {/* Core Stats / Highlights Section */}
            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Card 1 */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
                            <Info className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">Code-Split Efficiency</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Our architecture automatically lazy-loads views instantly, dropping initial bundle sizes down to sub-kilobyte chunks.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
                            <Users className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">User Centric</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Tailored explicitly around smooth state handshakes, predictable route auth, and high accessibility metrics.
                        </p>
                    </div>

                    {/* Card 3 (Spans full width on tablet, single col on mobile/desktop grid) */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">Optimized Bundles</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Compiled with hyper-efficient treeshaking transformations to clear out asset overhead from build environments.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

// this is from lazy import
// ✓ 1790 modules transformed.
// docs/index.html                          0.72 kB │ gzip:  0.41 kB
// docs/assets/index-BM09MElO.css         230.61 kB │ gzip: 35.80 kB
// docs/assets/About-Do9vQNcn.js            0.12 kB │ gzip:  0.14 kB
// docs/assets/Settings-BuvWUwvN.js         0.13 kB │ gzip:  0.14 kB
// docs/assets/Dashboard-C3IuzpmV.js        0.24 kB │ gzip:  0.20 kB
// docs/assets/productData-CtPIXIZa.js      0.81 kB │ gzip:  0.35 kB
// docs/assets/Login-ZgcV5Qef.js            1.43 kB │ gzip:  0.74 kB
// docs/assets/NotFound-l7sz1ZST.js         1.46 kB │ gzip:  0.85 kB
// docs/assets/Products-D_QxnAPu.js         2.55 kB │ gzip:  1.01 kB
// docs/assets/ProductDetail-B0NmqYb_.js    3.58 kB │ gzip:  1.28 kB
// docs/assets/index-CTpI04-0.js          292.04 kB │ gzip: 93.56 kB

// this is for the static
// ✓ 1790 modules transformed.
// docs/index.html                          0.72 kB │ gzip:  0.41 kB
// docs/assets/index-Bi2WIYfy.css         230.85 kB │ gzip: 35.82 kB
// docs/assets/Settings-DGHvRNdj.js         0.13 kB │ gzip:  0.14 kB
// docs/assets/Dashboard-Cmaq_Eyc.js        0.24 kB │ gzip:  0.20 kB
// docs/assets/productData-CtPIXIZa.js      0.81 kB │ gzip:  0.35 kB
// docs/assets/Login-Dj_BBoyW.js            1.43 kB │ gzip:  0.75 kB
// docs/assets/NotFound-B7tn51c9.js         1.46 kB │ gzip:  0.85 kB
// docs/assets/Products-XHZhb-ua.js         2.55 kB │ gzip:  1.01 kB
// docs/assets/ProductDetail-Cwfzo5Mv.js    3.58 kB │ gzip:  1.28 kB
// docs/assets/index-CXMwob8U.js          292.05 kB │ gzip: 93.55 kB