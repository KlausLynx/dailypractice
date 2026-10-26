import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addBy, reset } from "../store/counterReducer";
import { useState } from "react";

export const CounterUi = () => {
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-950 p-2 sm:p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
            
            {/* Count Display Area */}
            <div className="flex items-center gap-3 px-3 py-1 bg-zinc-50 dark:bg-zinc-900/60 rounded-lg border border-zinc-100 dark:border-zinc-800/40 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    Count:
                </span>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums min-w-[2rem] text-center sm:text-left">
                    {count}
                </span>
            </div>

            {/* Core Operational Controls */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
                <button
                    onClick={() => dispatch(decrement())}
                    className="flex items-center justify-center w-9 h-9 font-bold rounded-lg transition-all duration-200 active:scale-95 cursor-pointer text-base
                        bg-zinc-100 hover:bg-zinc-200 text-zinc-700
                        dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300"
                >
                    —
                </button>
                <button
                    onClick={() => dispatch(increment())}
                    className="flex items-center justify-center w-9 h-9 font-bold text-white rounded-lg transition-all duration-200 active:scale-95 cursor-pointer text-base
                        bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm shadow-indigo-100 dark:shadow-none"
                >
                    ＋
                </button>
            </div>

            {/* Advanced Input Actions Group */}
            <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-4">
                <input
                    type="number"
                    value={amount}
                    min={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-14 h-9 rounded-lg text-center font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                        bg-zinc-50 border-zinc-200 text-zinc-900
                        dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                />
                
                <button
                    onClick={() => dispatch(addBy(amount))}
                    className="h-9 px-3 font-semibold text-xs rounded-lg transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap
                        bg-indigo-50 hover:bg-indigo-100 text-indigo-700
                        dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400"
                >
                    Add {amount}
                </button>
                
                <button
                    onClick={() => dispatch(reset())}
                    className="h-9 px-3 font-semibold text-xs rounded-lg transition-all duration-200 active:scale-95 cursor-pointer
                        bg-rose-50 hover:bg-rose-100 text-rose-600
                        dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
