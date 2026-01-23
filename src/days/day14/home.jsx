import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import {Plus, Ellipsis } from 'lucide-react';
export default function Home() {

    const tags = [
        { id: 1, title: 'Work', color: 'bg-blue-700' },
        { id: 2, title: 'Personal', color: 'bg-purple-700' },
        { id: 3, title: 'Family', color: 'bg-amber-700' },
        { id: 4, title: 'Entertainment', color: 'bg-slate-700' },
    ];

    const availableColors = [
        'bg-red-700', 'bg-blue-700', 'bg-purple-700', 
        'bg-amber-700', 'bg-slate-700', 'bg-pink-700',
        'bg-green-700', 'bg-indigo-700', 'bg-yellow-700',
    ];

    const {register, handleSubmit, formState: {errors}, setValue, clearErrors, reset} = useForm();

    const [todo, setTodo] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];
        console.log(initialTodos)
        return initialTodos
    });

    const [dynamicTags, setDynamicTags] = useState(() => {
        const storedTags = localStorage.getItem('dynamicTags');
        return storedTags ? JSON.parse(storedTags) : [];
    });

    const [checkedTodos, setCheckedTodos] = useState(() => {
    const storedChecked = localStorage.getItem('checkedTodos');
        return storedChecked ? JSON.parse(storedChecked) : [];
    });

    const [showTagInput, setShowTagInput] = useState(false);
    const [customTagInput, setCustomTagInput] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [hideCheckCompleted, setHideCheckCompleted] = useState(false);
    const [selectedFilterTag, setSelectedFilterTag] = useState(null)
    const [showForm, setShowForm] = useState(false);
    const [openEllipsis, setOpenEllipsis] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);

    const addCustomTag = () => {
        if (customTagInput.trim() === '') return;
        const ALL_TAGS = [...tags, ...dynamicTags];
        if (ALL_TAGS.find(tag => tag.title.toLowerCase() === customTagInput.trim().toLowerCase())) {
            alert('Tag already exists!');
            return;
        }
        const randomColor = availableColors[crypto.getRandomValues(new Uint32Array(1))[0] % availableColors.length];

        const newTag = {
            id: crypto.randomUUID(),
            title: customTagInput,
            color: randomColor,
        }
        setDynamicTags([...dynamicTags, newTag]);
        setCustomTagInput('');
        setShowTagInput(false);
    }

    useEffect(() => {
        setValue("selectedTags", JSON.stringify(selectedTags));
    }, [selectedTags, setValue]);

    const ALL_TAGS = [...tags, ...dynamicTags];

    const onSubmit = (data) => {
        console.log(data);

        if (editingTodo) {
            setTodo(todo.map(item => {
                if (item.id === editingTodo.id) {
                    return {
                        ...item,
                        title: data.title,
                        description: data.description,
                        tags: JSON.stringify(selectedTags),
                    }
                } else {
                    return item;
                }
            }));
        } else {
            const newTodo = {
                id: crypto.randomUUID(),
                title: data.title,
                description: data.description,
                tags: JSON.stringify(selectedTags),
                createdAt: new Date().toISOString(),
            }
            setTodo([...todo, newTodo]);
        }

         reset();
        setSelectedTags([]);
        setShowForm(false);
        setEditingTodo(null);
    }


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo));
    }, [todo]);

    useEffect(() => {
        localStorage.setItem('dynamicTags', JSON.stringify(dynamicTags));
    }, [dynamicTags]);

    useEffect(() => {
        localStorage.setItem('checkedTodos', JSON.stringify(checkedTodos));
    }, [checkedTodos]);

    const h1Colors = ['text-green-700', 'text-blue-700', 'text-amber-700', 'text-purple-700'];

    console.log({});

    const handleEachTodoTag = (tagId) => {
       if (selectedFilterTag === tagId) {
            setSelectedFilterTag(null);
       } else {
        setSelectedFilterTag(tagId);
       }
    }

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this todo?");
        if (confirmed) {
            setTodo(todo.filter(item => item.id !== id));
        }   
    }

    const handleEdit = (id) => {
        const todoToEdit = todo.find(item => item.id === id);
        if (!todoToEdit) {
            return true;
        } else {
            setEditingTodo(todoToEdit);
            setValue("title", todoToEdit.title);
            setValue("description", todoToEdit.description);
            const parsedTags = JSON.parse(todoToEdit.tags);
            setSelectedTags(parsedTags);

            setShowForm(true);
            setOpenEllipsis(null);
        }
    }

    const toggleDone = (id) => {
        if (checkedTodos.includes(id)) {
            setCheckedTodos(checkedTodos.filter(todoId => todoId !== id));
        } else {
            setCheckedTodos([...checkedTodos, id]);
        }
    }

    return (
        <div className='bg-indigo-300 min-h-screen overflow-y-hidden flex items-center justify-center'>
            <div className={`max-w-7xl p-5 mx-5 bg-amber-300 w-full rounded-3xl shadow-lg h-full relative${showForm ? 'hidden lg:block' : 'block'}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold py-6">{"Todo".split('').map( (char, index) => {
                        return <span key={index} className={h1Colors[index % h1Colors.length]}>{char}</span>
                    })}</h1>
                    <Plus onClick={() => setShowForm(!showForm)} size={30} />
                </div>
                <div className="grid grid-rows-[auto_4fr] lg:grid lg:grid-cols-[auto_3fr] gap-6">
                    <div>
                        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-5 lg:!items-start">
                            {ALL_TAGS.map(tag => (
                                <button type="button" key={tag.id} onClick={() => handleEachTodoTag(tag.id)} className="flex items-center gap-2 text-gray-950 font-bold px-3 py-2 rounded-full cursor-pointer hover:scale-105 transition-transform bg-indigo-600 lg:bg-transparent text-sm lg:text-base">
                                    <span className={`${tag.color} w-5 h-5 lg:w-6 lg:h-6 rounded-full`} ></span>
                                    {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className=" hidden lg:block mt-10">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="hidden" checked={hideCheckCompleted} onChange={(e)=> setHideCheckCompleted(e.target.checked)}/>   
                                <span className={`w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center ${hideCheckCompleted ? 'bg-blue-600' : ''}`}>
                                    {hideCheckCompleted &&  (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>
                                <span className="text-gray-500">Hide done tasks</span>
                            </label>
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-[63vh] lg:max-h-[65vh] pr-2">
                        {todo.length === 0 ? (
                            <p className="text-white text-center mt-10">No todos added yet!</p>
                        ) : ( 
                            <div className="flex flex-col gap-4">
                                {todo.filter(item => {
                                    if (selectedFilterTag) {
                                        const todoTags = JSON.parse(item.tags);
                                        if (!todoTags.includes(selectedFilterTag)) return false
                                    }

                                    if (hideCheckCompleted && checkedTodos.includes(item.id)) {
                                        return false;
                                    }

                                    return true;
                                })
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map(item => (
                                    <div key={item.id} className="bg-white p-4 rounded-2xl shadow-md relative">
                                        <h2 className={`text-xl font-bold mb-2 ${checkedTodos.includes(item.id) ? 'line-through' : ''}`}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h2>
                                        <p className={`text-gray-700 mb-4 ${checkedTodos.includes(item.id) ? 'line-through' : ''}`}>{item.description}</p>
                                        <div className="flex gap-2">
                                            {JSON.parse(item.tags).map(tagId => {
                                                const tag = ALL_TAGS.find(t => t.id === tagId);
                                                if (!tag) return null;
                                                return (
                                                    <span key={tag.id} className={`flex items-center gap-2 text-white px-3 py-1 rounded-full ${tag.color}`}>
                                                        <span className={`${tag.color} w-4 h-4 rounded-full`}></span>
                                                        {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <button 
                                            type="button"
                                            className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-red-600 transition-colors" 
                                            onClick={() => {
                                                setOpenEllipsis(openEllipsis === item.id ? null : item.id);
                                            }}
                                        >
                                            <Ellipsis size={25} />
                                        </button>
                                        
                                        {openEllipsis === item.id && (
                                            <div>
                                                <div className="flex flex-col absolute top-10 right-4 bg-white border border-gray-300 rounded-md shadow-md min-w-[130px]">
                                                    <button type="button" onClick={() => handleEdit(item.id)} className="px-4 py-2 text-left hover:bg-gray-100 transition-colors cursor-pointer">
                                                        Edit...
                                                    </button>
                                                    <div className="border-t border-gray-200"></div>
                                                    <button type="button" onClick={() => handleDelete(item.id)} className="px-4 py-2 text-left hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-3">
                                            <small className="text-gray-400">Created at: {new Date(item.createdAt).toLocaleString()}</small>
                                            <label className="flex items-center justify-end gap-2 cursor-pointer">
                                                <input type="checkbox" className="hidden" checked={checkedTodos.includes(item.id)} onChange={() => toggleDone(item.id)}/>
                                                <span className={`w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center ${checkedTodos.includes(item.id) ? 'bg-blue-600' : 'bg-white'}`}>
                                                    {checkedTodos.includes(item.id) && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <span>Done</span>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            { showForm && (
                <div className="fixed inset-0 bg-indigo-300 lg:!bg-black/50 lg:backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-y-auto">
                    <div className="w-full max-w-[750px] mx-auto">
                        <div className="rounded-2xl relative">
                            <form action="" className="bg-amber-100 p-6 lg:p-10 rounded-2xl relative" onSubmit={handleSubmit(onSubmit)}>
                                <div className="lg:order-2">
                                    <div className="flex justify-between items-center gap-4">
                                        <button type="button"  className="hover:bg-amber-700 px-6 py-2 rounded-md transition-colors" onClick={() => {
                                                setShowForm(false);
                                                setEditingTodo(null);
                                                reset(); 
                                                setSelectedTags([]);
                                        }}>Cancel</button>
                                        <button type="submit" className="bg-emerald-700 px-6 py-2 rounded-md">{editingTodo ? 'Edit' : 'Add'}</button>
                                    </div>

                                    <div className="mt-5">
                                        <label htmlFor="todo-title">Title: </label>
                                        <input type="text" placeholder="add a title" className="border border-gray-300 rounded-md p-2 w-full placeholder-gray-500 placeholder-sm" {...register("title", {
                                            required: "Title is required",
                                            minLength: {
                                                value: 3,
                                                message: "Title must be at least 3 characters"
                                            },
                                        })}/>
                                        {errors.title && <p className="text-red-600 mt-1 text-sm">{errors.title.message}</p>}
                                    </div>

                                
                                    <div className="mt-5">
                                        <label htmlFor="description" className="font-bold">Description: </label>
                                        <textarea {...register("description", {
                                            required: "Description is required",
                                            minLength: {
                                                value: 10,
                                                message: "Description must be at least 10 characters"
                                            },
                                        })} id="description" cols="30" rows="4" placeholder="add a description" className="border border-gray-300 rounded-md p-2 mt-2 w-full placeholder-sm placeholder-gray-500"></textarea>
                                        {errors.description && <p className="text-red-600 mt-1 text-sm">{errors.description.message}</p>}
                                    </div>

                                    <input type="hidden" {...register("selectedTags", {
                                        validate: value => {
                                            const parsed = JSON.parse(value || '[]');
                                            return parsed.length > 0 || "At least one tag must be selected" 
                                        }   
                                    })} value={JSON.stringify(selectedTags)}/>
                                    {errors.selectedTags && <p className="text-red-600 mt-1 text-sm">{errors.selectedTags.message}</p>}
                                </div>
                                
                                <div className="mt-5 lg:order-1">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="tags" className="font-bold">Tags: </label>
                                        <button type="button" onClick={() => setShowTagInput(!showTagInput)} className="ml-4 bg-cyan-700 px-3 py-1 rounded-md text-sm text-white">+ Add Custom Tag</button>
                                    </div>
                                    {showTagInput && (
                                    <div className="mt-5 flex items-center">
                                        <input type="text" className="border border-gray-300 rounded-md p-2 w-full placeholder-sm placeholder-gray-500" placeholder="add a custom tag" value={customTagInput} onChange={(e)=> setCustomTagInput(e.target.value) } onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                addCustomTag()
                                            }
                                        }}/>
                                        <button type="button" onClick={addCustomTag} className="ml-4 bg-emerald-700 px-4 py-1 rounded-md text-sm text-white">Add</button>
                                    </div>
                                    ) }
                                    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 mt-5">
                                        {ALL_TAGS.map(tag => (
                                            <button key={tag.id} className={`flex items-center gap-2 border border-gray-300 rounded-md p-2 max-w-full hover:bg-cyan-100 ${selectedTags.includes(tag.id)? 'bg-cyan-200': 'border-gray-300'}`}
                                            type="button"
                                            onClick={() => {
                                                if (selectedTags.includes(tag.id)) {
                                                    setSelectedTags(selectedTags.filter(id => id !== tag.id))
                                                } else {
                                                    setSelectedTags([...selectedTags, tag.id])
                                                }
                                                clearErrors("selectedTags");
                                            }}>
                                                <span className={`${tag.color} w-6 h-6 rounded-full`}></span>
                                                {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    )
}