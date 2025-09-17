'use client'

import { useState } from 'react'
import { Database, ToggleLeft, ToggleRight, Save, Play, Trash2, Edit } from 'lucide-react'

type DatabaseType = 'prisma' | 'sequelize'

interface GitCommand {
  id: string
  command: string
  description: string
  createdAt: string
}

export default function DatabasePage() {
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseType>('prisma')
  const [gitCommands, setGitCommands] = useState<GitCommand[]>([])
  const [newCommand, setNewCommand] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const generateCRUDCommands = () => {
    const baseCommands = [
      {
        id: '1',
        command: `git config --global user.name "Student 12345678"`,
        description: 'Set global git username',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        command: `git config --global user.email "student@students.latrobe.edu.au"`,
        description: 'Set global git email',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        command: `git clone https://github.com/owner/repo.git`,
        description: 'Clone repository',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        command: `git add .`,
        description: 'Stage all changes',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        command: `git commit -m "Update via automation"`,
        description: 'Commit changes',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        command: `git push origin main`,
        description: 'Push to remote repository',
        createdAt: new Date().toISOString()
      }
    ]
    setGitCommands(baseCommands)
  }

  const addCommand = () => {
    if (newCommand.trim()) {
      const command: GitCommand = {
        id: Date.now().toString(),
        command: newCommand.trim(),
        description: newDescription.trim() || 'Custom command',
        createdAt: new Date().toISOString()
      }
      setGitCommands(prev => [...prev, command])
      setNewCommand('')
      setNewDescription('')
    }
  }

  const deleteCommand = (id: string) => {
    setGitCommands(prev => prev.filter(cmd => cmd.id !== id))
  }

  const saveToDatabase = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/database/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: gitCommands,
          databaseType: selectedDatabase
        })
      })

      if (response.ok) {
        alert('Commands saved to database successfully!')
      } else {
        alert('Failed to save commands to database')
      }
    } catch (error) {
      console.error('Error saving to database:', error)
      alert('Error saving to database')
    } finally {
      setIsSaving(false)
    }
  }

  const executeCommands = async () => {
    setIsExecuting(true)
    try {
      const response = await fetch('/api/git/execute-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: gitCommands.map(cmd => cmd.command)
        })
      })

      if (response.ok) {
        alert('Commands executed successfully!')
      } else {
        alert('Failed to execute commands')
      }
    } catch (error) {
      console.error('Error executing commands:', error)
      alert('Error executing commands')
    } finally {
      setIsExecuting(false)
    }
  }

  const generateDockerConfig = () => {
    if (selectedDatabase === 'prisma') {
      return `# Dockerfile for Next.js with Prisma
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`
    } else {
      return `# Dockerfile for Next.js with Sequelize
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Database className="w-10 h-10 mr-3 text-blue-600" />
            Database Integration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose between Prisma and Sequelize for database operations
          </p>
        </div>

        {/* Database Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Database Selection
          </h2>
          
          <div className="flex items-center justify-center space-x-8">
            <button
              onClick={() => setSelectedDatabase('prisma')}
              className={`flex items-center px-6 py-3 rounded-lg border-2 transition-colors ${
                selectedDatabase === 'prisma'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {selectedDatabase === 'prisma' ? (
                <ToggleRight className="w-6 h-6 mr-2" />
              ) : (
                <ToggleLeft className="w-6 h-6 mr-2" />
              )}
              Prisma ORM
            </button>

            <button
              onClick={() => setSelectedDatabase('sequelize')}
              className={`flex items-center px-6 py-3 rounded-lg border-2 transition-colors ${
                selectedDatabase === 'sequelize'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              {selectedDatabase === 'sequelize' ? (
                <ToggleRight className="w-6 h-6 mr-2" />
              ) : (
                <ToggleLeft className="w-6 h-6 mr-2" />
              )}
              Sequelize ORM
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Selected: <span className="font-semibold capitalize">{selectedDatabase}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commands Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Git Commands Management
            </h2>

            {/* Add New Command */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Command
                </label>
                <input
                  type="text"
                  value={newCommand}
                  onChange={(e) => setNewCommand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter git command"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter description"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={addCommand}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Command
                </button>
                <button
                  onClick={generateCRUDCommands}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Generate CRUD
                </button>
              </div>
            </div>

            {/* Commands List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {gitCommands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-mono text-sm text-gray-900 dark:text-white mb-1">
                        {cmd.command}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {cmd.description}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteCommand(cmd.id)}
                      className="ml-2 p-1 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={saveToDatabase}
                disabled={gitCommands.length === 0 || isSaving}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save to Database'}
              </button>
              <button
                onClick={executeCommands}
                disabled={gitCommands.length === 0 || isExecuting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                {isExecuting ? 'Executing...' : 'Execute Commands'}
              </button>
            </div>
          </div>

          {/* Docker Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Docker Configuration
            </h2>
            
            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-96">
              <pre>{generateDockerConfig()}</pre>
            </div>

            <div className="mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(generateDockerConfig())}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Copy Dockerfile
              </button>
            </div>
          </div>
        </div>

        {/* Database Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Database ORM
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose between Prisma and Sequelize for your database needs
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Save className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              CRUD Operations
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Full Create, Read, Update, Delete functionality
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Play className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Command Execution
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Execute and manage git commands with database persistence
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
