// import { useState, useEffect } from 'react';
import {MoreHorizontal} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MainComponent () {
    return (
        <div className='bg-indigo-300 min-h-screen'>
            <TodoApp />
        </div>
    )
}

const TodoApp = () => {
    const h1Colors = ['text-green-700', 'text-blue-700', 'text-amber-700', 'text-purple-700'];
    return (
        <div className="max-w-4xl mx-auto">
            <div className=" rounded-lg min-h-screen p-6 flex flex-col justify-around items-center">
                <h1 className='font-bold text-6xl'>
                    {"Todo".split('').map((char, index)=> (
                        <span key={index} className={h1Colors[index % h1Colors.length]}>{char}</span>
                    ))}
                </h1>

                <div><strong>“Successful people don’t remember more, they track better.”</strong></div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors cursor-pointer">
                    <Link to="/home">Get Started</Link>
                </button>
                <div className='bg-cyan-100 w-full max-w-md p-4 rounded-lg shadow-md flex flex-col gap-6'>
                    <div className='flex justify-between items-center'>
                        <h4 className='line-through'>Download todo app</h4>
                        <MoreHorizontal />
                    </div>
                    <small className='text-gray-400 line-through'>The first step for better life</small>
                    <div className='flex justify-between items-center'>
                        <div className='max-w-md max-h-md flex justify-center gap-2'>
                            <span className='inline-block bg-emerald-600 w-[20px] h-5 rounded-full'></span>
                            <span className='inline-block bg-purple-600 w-[20px] h-5 rounded-full'></span>
                        </div>
                        <div className=''>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="hidden" checked readOnly />
                                <span className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center bg-blue-600">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span>Done</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}