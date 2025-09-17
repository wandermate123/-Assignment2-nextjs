'use client'
import React, { useState, useEffect } from 'react';

const Createblog = () => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [data, setData] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set client flag to true after component mounts
        setIsClient(true);
        
        // Safely parse initial blogs from localStorage
        const blogsJSON = localStorage.getItem('myData');
        if (blogsJSON) {
            try {
                const blogs = JSON.parse(blogsJSON);
                setData(blogs);
            } catch (error) {
                console.error('Failed to parse blog data from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            // Save data to localStorage whenever it changes
            localStorage.setItem('myData', JSON.stringify(data));
        }
    }, [data, isClient]);

    const addData = () => {
        const currentDate = new Date().toLocaleDateString();
        const newData = {
            id: data.length + 1,
            author: author,
            date: currentDate,
            title: title,
            description: description,
            imageUrl: imageUrl
        };
        const updatedData = [...data, newData];
        setData(updatedData);
        setAuthor('');
        setTitle('');
        setDescription('');
        setImageUrl('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Create New Blog Post
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Share your thoughts and ideas with the world
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form onSubmit={(e) => { e.preventDefault(); addData(); }} className="space-y-6">
                        {/* Author Field */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Author Name
                            </label>
                            <input
                                id="author"
                                type="text"
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your name"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>

                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Blog Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={6}
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                                placeholder="Write your blog description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Image URL Field */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image URL
                            </label>
                            <input
                                id="imageUrl"
                                type="url"
                                className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Create Blog Post
                            </button>
                        </div>
                    </form>
                </div>

                {/* Success Message */}
                {data.length > 0 && (
                    <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-800 dark:text-green-200 font-medium">
                                Blog post created successfully! Total posts: {data.length}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Createblog
