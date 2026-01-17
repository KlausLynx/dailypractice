// 📝 Requirements
// Your Todo app must have:
// ✅ Core Features

// Display todos - Show a list of all todos
// Add todo - Input field + button to add new todos
// Delete todo - Button to remove a todo from the list
// Mark complete - Toggle a todo as done/not done (strikethrough or different style)
// Visual feedback - Show completed todos differently (strikethrough, opacity, color, etc.)

// ✅ Technical Requirements

// Use useState for managing todos
// Use useEffect (at least once - be creative!)
// Proper component structure
// Handle edge cases (empty input, empty list, etc.)
// Good UX (no console errors, responsive buttons)

// ✅ Nice to Have (Challenge yourself!)

// Persist todos to localStorage and reload on mount
// Filter todos (Show All / Active / Completed)
// Edit existing todos
// Add timestamps to todos
// Clear all completed todos button

import { useState, useEffect } from 'react';
import {MoreHorizontal} from 'lucide-react';

export default function MainComponent () {
    return (
        <div>
            <TodoApp />
        </div>
    )
}

const TodoApp = () => {
    return (
        <div>
            <div>
                <h1>Todo</h1>
                <div><strong>“Successful people don’t remember more, they track better.”</strong></div>
                <button>Get Started</button>
                <div>
                    <div>
                        <h4 className='line-through'>Download todo app</h4>
                        <MoreHorizontal />
                    </div>
                    <p>The first step for better life</p>
                    <div>
                        <div>
                            <span className='block bg-sky-500 w-24 h-24'>jihib</span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}