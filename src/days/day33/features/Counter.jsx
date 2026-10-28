import { useDispatch, useSelector } from "react-redux";
import { incremented, decremented, incrementedByAmount, decrementedByAmount, reset } from "../store/counterSlice";
import { useState } from "react";

export default function Counter() {
    const [amount, setAmount] = useState('');
    const parsed = Number(amount)
    const isValid = Number.isInteger(parsed) && parsed > 0
    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    const handleValue = (e) =>  {
        const value = Number(e.target.value)
        setAmount(value)
    }

    const addValue = () =>  {
        if (!isValid) return
        dispatch(incrementedByAmount(parsed))
        setAmount('')
    }

    const subtractValue = () =>  {
        if (!isValid) return
        dispatch(decrementedByAmount(parsed))
        setAmount('')

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                
                {/* Counter Display */}
                <div className="text-center mb-8">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Current Count</h2>
                <p className="text-6xl font-black text-indigo-600 tracking-tight transition-all duration-300">
                    {count}
                </p>
                </div>

                {/* Primary Controls (+ / -) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                    onClick={() => dispatch(incremented())}
                    className="flex items-center justify-center py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-2xl rounded-xl transition shadow-lg shadow-indigo-100 active:scale-95"
                >
                    +
                </button>
                <button 
                    onClick={() => dispatch(decremented())}
                    className="flex items-center justify-center py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-2xl rounded-xl transition active:scale-95"
                >
                    -
                </button>
                </div>

                {/* Custom Amount Controls */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="number" className="text-xs font-medium text-gray-500">
                    Amount to shift
                    </label>
                    <input 
                        type="number" 
                        name="number" 
                        id="number" 
                        value={amount} 
                        onChange={(e) => handleValue(e)}
                        className="w-full px-4 py-2.5 appearance-auto border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 transition"
                    />

                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => addValue()}
                        disabled={!isValid}
                        className="py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm rounded-xl transition active:scale-98 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                        >
                        Add {amount}
                    </button>

                    <button 
                        onClick={() => subtractValue()}
                        disabled={!isValid}
                        // className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-sm rounded-xl transition active:scale-98"
                        className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-sm rounded-xl transition active:scale-98 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                        >
                        Subtract {amount}
                    </button>
                </div>
                </div>

                {/* Reset Action */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <button 
                    onClick={() => dispatch(reset())}
                    className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                >
                    Reset Counter
                </button>
                </div>
            </div>
        </div>
    );
}
