'use client'

import { useState } from 'react'

export default function ApiTestPage() {
  const [testId, setTestId] = useState('')
  const [hashResult, setHashResult] = useState('')
  const [error, setError] = useState('')

  const testApi = async () => {
    try {
      setError('')
      setHashResult('')
      
      // Test GET request
      const getResponse = await fetch('/api/test')
      const getData = await getResponse.json()
      console.log('GET Response:', getData)
      
      // Test POST request
      if (testId) {
        const postResponse = await fetch('/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: testId }),
        })
        const postData = await postResponse.json()
        setHashResult(postData.hash)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            API Test Page
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Test API Endpoint
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter ID to hash:
                </label>
                <input
                  type="text"
                  value={testId}
                  onChange={(e) => setTestId(e.target.value)}
                  placeholder="Enter any text to hash"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <button
                onClick={testApi}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Test API
              </button>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                Error: {error}
              </div>
            )}

            {hashResult && (
              <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
                <h3 className="font-semibold mb-2">Hash Result:</h3>
                <code className="break-all">{hashResult}</code>
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                API Endpoints Available:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">GET /api/test</code> - Returns welcome message</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">POST /api/test</code> - Returns SHA-256 hash of provided ID</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">GET /api/users</code> - Get all users</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">POST /api/users</code> - Create new user</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">PATCH /api/users?id=X</code> - Update user</li>
                <li><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">DELETE /api/users?id=X</code> - Delete user</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
