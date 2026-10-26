import { useDispatch, useSelector } from 'react-redux';
import { toggletheme } from '../store/theme';

export const ThemeButton = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(toggletheme())}
            aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl border font-medium text-sm transition-all duration-300 relative overflow-hidden
                bg-white text-zinc-700 border-zinc-200 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 active:scale-95
                dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700/60 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:hover:border-zinc-600"
        >
            <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
                {themeMode === 'light' ? (
                    <svg 
                        className="w-4 h-4 text-amber-500 animate-in fade-in slide-in-from-bottom-2 duration-300" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                ) : (
                    <svg 
                        className="w-4 h-4 text-indigo-400 animate-in fade-in slide-in-from-top-2 duration-300" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </div>

            <span className="capitalize tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
                {themeMode} Mode
            </span>
        </button>
    );
};
