import { useSelector, useDispatch} from 'react-redux';
import { selectItems, todoToggled, todoDeleted, todoEdited, selectRemainingCount, filterChanged, selectFilter } from '../store/todoSlice';
import AddTodo from './AddTodo';
import { useState } from 'react';

function TodoList() {
    const items = useSelector(selectItems);
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const [editedId, setEditedId] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    const handleEdit = (todo) => {
        setEditedId(todo.id);
        setEditedValue(todo.text);
    };

    const saveEdit = () => {
        dispatch(todoEdited({ id: editedId, text: editedValue }));
        setEditedId(null);
        setEditedValue('');
    };

    const remaining = useSelector(selectRemainingCount)
    const todoCategory = ['all', 'active', 'done'];

    const visibleItems = items.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'done') return todo.completed
        return true
    })

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mx-auto mt-6">
        {/* Input Header Area */}
        <div className="mb-5">
            <AddTodo />
        </div>

        {/* Modern Filter Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            {todoCategory.map(cat => (
            <button 
                key={cat} 
                onClick={() => dispatch(filterChanged(cat))}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200 ${
                filter === cat 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
            >
                {cat}
            </button>
            ))}
        </div>

        {/* Todo Items List */}
        {visibleItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl mb-4">
                {items.length === 0 ? 'No tasks yet. Add a todo above!' : `No ${filter} tasks.`}
            </div>
        ) : (
            <ul className="space-y-3 mb-4">
            {visibleItems.map(todo => {
                const isEditing = todo.id === editedId;
                return (
                <li 
                    key={todo.id} 
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 group ${
                    isEditing 
                        ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-50' 
                        : todo.completed 
                        ? 'bg-gray-50 border-gray-100 shadow-none' 
                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100'
                    }`}
                >
                    <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
                    {/* Done / Toggle Button */}
                    <button 
                        onClick={() => dispatch(todoToggled(todo.id))} 
                        disabled={!!editedId}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all flex-shrink-0 ${
                        todo.completed 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : editedId 
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                            : 'border-gray-300 hover:border-indigo-500 bg-white'
                        }`}
                        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                    >
                        {todo.completed && (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        )}
                    </button>

                    {/* Todo Text / Inline Edit Input */}
                    {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                        <input 
                            type="text" 
                            value={editedValue} 
                            onChange={(e) => setEditedValue(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                            className="w-full px-2.5 py-1 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                            autoFocus 
                        />
                        <button 
                            onClick={saveEdit} 
                            className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition active:scale-95 flex-shrink-0"
                            aria-label="Save changes"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                        </div>
                    ) : (
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className={`text-sm truncate select-none transition-all duration-200 ${
                            todo.completed ? 'line-through text-gray-400 font-normal' : 'text-gray-700 font-medium'
                            }`}
                            >
                            {todo.text}
                            </span>
                            {todo.dueDate && (
                                <div className={`flex items-center mt-1 text-[11px] font-medium transition-all duration-200 ${
                                    todo.completed ? 'text-gray-300' : 'text-gray-400'
                                }`}>
                                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Due: {todo.dueDate}</span>
                                </div>
                            )}           
                        </div>
                    )}
                    </div>

                    {/* Action Buttons Container */}
                    {!isEditing && (
                    <div className="flex items-center space-x-0.5 flex-shrink-0">
                        {/* Edit Action Button */}
                        <button 
                        onClick={() => handleEdit(todo)} 
                        disabled={!!editedId}
                        className={`p-1.5 rounded-lg transition-all ${
                            editedId 
                            ? 'opacity-30 text-gray-300 cursor-not-allowed' 
                            : 'opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                        }`}
                        aria-label="Edit todo"
                        >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        </button>

                        {/* Delete Action Button */}
                        <button 
                        onClick={() => dispatch(todoDeleted(todo.id))} 
                        disabled={!!editedId}
                        className={`p-1.5 rounded-lg transition-all ${
                            editedId 
                            ? 'opacity-30 text-gray-300 cursor-not-allowed' 
                            : 'opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        aria-label="Delete todo"
                        >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        </button>
                    </div>
                    )}
                </li>
                );
            })}
            </ul>
        )}

        {/* Styled Footer Counter */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Status Overview</span>
            <p>You have <strong className="text-indigo-600 font-semibold">{remaining}</strong> tasks left to do!</p>
            
        </div>
        </div>
    );
}

export default TodoList;
