import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About This Project
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn more about our GitHub automation application
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Overview
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is a Next.js application built for Assignment 2 of CSE3CWA/CSE5006. 
              The project demonstrates modern web development practices including:
            </p>

            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Sequelize ORM for database operations</li>
              <li>Docker containerization</li>
              <li>Prisma database schema management</li>
              <li>GitHub API integration</li>
              <li>Responsive design with dark mode support</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Blog Management</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Create, read, and manage blog posts with a modern interface
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Database Integration</h4>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  SQLite for local development with Sequelize ORM
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">GitHub API</h4>
                <p className="text-purple-700 dark:text-purple-400 text-sm">
                  Integration with GitHub API for repository operations
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">Docker Support</h4>
                <p className="text-orange-700 dark:text-orange-400 text-sm">
                  Containerized deployment with Docker Compose
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Next.js</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">React Framework</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">TypeScript</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Type Safety</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">Tailwind</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CSS Framework</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 dark:text-green-400">Sequelize</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ORM</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Note:</strong> This project is part of CSE3CWA/CSE5006 Assignment 2 and demonstrates 
                modern full-stack web development practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
