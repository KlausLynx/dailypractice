import { useEffect } from "react";
import { selectedError, selectedPost, selectedStatus, fetchPosts } from "../store/postSlice";
import { useDispatch, useSelector } from 'react-redux';

export const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectedPost);
    const status = useSelector(selectedStatus);
    const error = useSelector(selectedError);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts()); 
        }
    }, [status, dispatch]);

    // Elegant Skeleton Loading State
    if (status === "loading") {
        return (
            <div className="w-full grid grid-cols-4 gap-3 mx-auto mt-6 space-y-4">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Polished Error State with Retry Button
    if (status === 'failed') {
        return (
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-red-100 mx-auto mt-6 text-center space-y-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-900">Failed to load posts</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto break-words">{error || "An unexpected network error occurred."}</p>
                </div>
                <button 
                    onClick={() => dispatch(fetchPosts())}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-red-100 transition-all active:scale-95 mx-auto"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                    </svg>
                    Try Again
                </button>
            </div>
        );
    }

    // Final Clean Rendered State
    return (
        <div className="w-full grid grid-cols-4 gap-3 mx-auto mt-6 space-y-4">
            {posts.map(post => (
                <div 
                    key={post.id}
                    className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-50 transition-all duration-200"
                >
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {post.body}
                    </p>
                </div>
            ))}
        </div>
    );
};
