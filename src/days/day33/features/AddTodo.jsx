import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoAdded } from '../store/todoSlice';

function AddTodo() {
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const dispatch = useDispatch();

    function handleAdd() {
        if (!text.trim()) return;
        dispatch(todoAdded(text, dueDate));
        setText('');
        setDueDate('');
    }

    return (
        <div className="space-y-3">
            {/* Main Task Input Row */}
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    placeholder="What needs to be done?" 
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button 
                    onClick={handleAdd}
                    disabled={!text.trim()}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 disabled:shadow-none active:scale-95"
                >
                    Add
                </button>
            </div>

            {/* Due Date & Time Picker */}
            <div className="flex items-center gap-2 px-1">
                <label htmlFor="due-date" className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Due:
                </label>
                <input 
                    id="due-date"
                    type="datetime-local" 
                    value={dueDate} 
                    onChange={e => setDueDate(e.target.value)} 
                    className="text-xs font-medium text-gray-500 bg-transparent border-0 p-0 focus:ring-0 cursor-pointer hover:text-indigo-600 transition-colors"
                />
            </div>
        </div>
    );
}

export default AddTodo;
