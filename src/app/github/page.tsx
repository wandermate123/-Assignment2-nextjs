'use client'

import { useState } from 'react'
import { Github, Terminal, CheckCircle, AlertCircle, Copy } from 'lucide-react'

export default function GitHubPage() {
  const [formData, setFormData] = useState({
    username: '',
    token: '',
    owner: '',
    repo: ''
  })

  const [gitCommands, setGitCommands] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<string>('')
  const [showCommands, setShowCommands] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateGitCommands = () => {
    const commands = [
      `# Set up Git configuration`,
      `git config --global user.name "${formData.username}"`,
      `git config --global user.email "student@students.latrobe.edu.au"`,
      ``,
      `# Clone the repository`,
      `git clone https://github.com/${formData.owner}/${formData.repo}.git`,
      `cd ${formData.repo}`,
      ``,
      `# Update README.md`,
      `echo "# ${formData.repo}" > README.md`,
      `echo "" >> README.md`,
      `echo "This repository was updated via GitHub Automation App" >> README.md`,
      `echo "" >> README.md`,
      `echo "## Student Information" >> README.md`,
      `echo "- Student Number: 12345678" >> README.md`,
      `echo "- Subject: CSE3CWA/CSE5006" >> README.md`,
      `echo "- Assignment: 2" >> README.md`,
      `echo "- Date: ${new Date().toISOString()}" >> README.md`,
      `echo "" >> README.md`,
      `echo "## Features" >> README.md`,
      `echo "- Automated GitHub operations" >> README.md`,
      `echo "- Docker containerization" >> README.md`,
      `echo "- Database integration (Prisma/Sequelize)" >> README.md`,
      `echo "- Dark/Light theme support" >> README.md`,
      `echo "- Accessibility compliance" >> README.md`,
      ``,
      `# Commit and push changes`,
      `git add README.md`,
      `git commit -m "Update README.md via automation - Student 12345678"`,
      `git push origin main`
    ]
    setGitCommands(commands)
    setShowCommands(true)
  }

  const executeGitCommands = async () => {
    setIsExecuting(true)
    setExecutionResult('')
    
    try {
      const response = await fetch('/api/git/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: gitCommands,
          token: formData.token,
          owner: formData.owner,
          repo: formData.repo
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setExecutionResult('✅ Git commands executed successfully!')
      } else {
        setExecutionResult(`❌ Error: ${result.error || 'Failed to execute git commands'}`)
      }
    } catch (error) {
      console.error('Error executing git commands:', error)
      setExecutionResult(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsExecuting(false)
    }
  }

  const copyCommands = () => {
    const commandsText = gitCommands.join('\n')
    navigator.clipboard.writeText(commandsText)
    alert('Commands copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Github className="w-10 h-10 mr-3 text-gray-900 dark:text-white" />
            GitHub Integration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Automate GitHub operations and repository management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Repository Configuration
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your GitHub username"
                  required
                />
              </div>

              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  id="token"
                  name="token"
                  value={formData.token}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your GitHub personal access token"
                  required
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Generate a token at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">GitHub Settings</a>
                </p>
              </div>

              <div>
                <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Repository Owner
                </label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter repository owner username"
                  required
                />
              </div>

              <div>
                <label htmlFor="repo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Repository Name
                </label>
                <input
                  type="text"
                  id="repo"
                  name="repo"
                  value={formData.repo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter repository name"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={generateGitCommands}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Generate Commands
                </button>
                <button
                  onClick={executeGitCommands}
                  disabled={gitCommands.length === 0 || isExecuting}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {isExecuting ? 'Executing...' : 'Execute Commands'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Commands */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Generated Commands
              </h2>
              {gitCommands.length > 0 && (
                <button
                  onClick={copyCommands}
                  className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              )}
            </div>

            {gitCommands.length > 0 ? (
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-96">
                {gitCommands.map((command, index) => (
                  <div key={index} className="mb-1">
                    {command.startsWith('#') ? (
                      <span className="text-blue-400">{command}</span>
                    ) : command === '' ? (
                      <br />
                    ) : (
                      <>
                        <span className="text-gray-500">$</span> {command}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generate commands to see them here</p>
              </div>
            )}

            {/* Execution Result */}
            {executionResult && (
              <div className={`mt-4 p-4 rounded-md flex items-center ${
                executionResult.startsWith('✅') 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
              }`}>
                {executionResult.startsWith('✅') ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span className="text-sm">{executionResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Terminal className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Automated Commands
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate and execute git commands automatically
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Github className="w-12 h-12 text-gray-900 dark:text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              GitHub Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Direct integration with GitHub repositories
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Safe Execution
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Secure token-based authentication and execution
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
