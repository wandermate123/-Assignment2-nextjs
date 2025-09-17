'use client'

import { Play, User, GraduationCap, Calendar, Code } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About This Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            GitHub Automation App - Assignment 2
          </p>
        </div>

        {/* Student Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            Student Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Name:</span>
                <span className="text-gray-900 dark:text-white">Your Name</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Student Number:</span>
                <span className="text-gray-900 dark:text-white font-mono">12345678</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Subject:</span>
                <span className="text-gray-900 dark:text-white">CSE3CWA/CSE5006</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">Assignment:</span>
                <span className="text-gray-900 dark:text-white">Assignment 2</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">Date:</span>
                <span className="text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300 mr-2">University:</span>
                <span className="text-gray-900 dark:text-white">La Trobe University</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Code className="w-6 h-6 mr-2 text-green-600" />
            Project Description
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This GitHub Automation App is designed to help students in team environments by providing 
              an automated solution for GitHub operations. Instead of relying on another student as a 
              team member, this web application acts as a robot team member that can push and post 
              content to shared Git repositories.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Key Features:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Automated GitHub repository operations</li>
              <li>Docker containerization support</li>
              <li>Database integration with Prisma and Sequelize</li>
              <li>Dark/Light theme support</li>
              <li>Accessibility compliance</li>
              <li>Cookie-based navigation state management</li>
              <li>Responsive design for all devices</li>
              <li>Automated testing with Playwright</li>
            </ul>
          </div>
        </div>

        {/* Video Tutorial */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Play className="w-6 h-6 mr-2 text-red-600" />
            How to Use This Website
          </h2>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Video Tutorial
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Click the play button to watch a demonstration of how to use this application.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Note: This is a placeholder for the actual video. In a real implementation, 
              you would embed your video here or provide a link to your video tutorial.
            </p>
            <div className="mt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Play Tutorial Video
              </button>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Frontend</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Next.js 15</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Backend</h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Node.js</li>
                <li>• Prisma ORM</li>
                <li>• Sequelize ORM</li>
                <li>• SQLite Database</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">DevOps</h3>
              <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                <li>• Docker</li>
                <li>• Docker Compose</li>
                <li>• GitHub Actions</li>
                <li>• Playwright Testing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
