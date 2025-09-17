'use client';

import React, { useEffect, useState } from 'react';

const getPathUrl = () => {
  if (typeof window !== 'undefined') {
    return new URL(window.location.href).origin.replace(/\/$/, '');
  }
  return ''; // Fallback for SSR
};

const ApiDocumentation: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(getPathUrl());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            w7Docker API Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            <strong>GET, POST, PATCH, DELETE</strong> requests to{' '}
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{baseUrl}/api</code> with these parameters:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-8">
            <li><code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">id</code>: ID of the row</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The request will return the HTML code in UTF-8 encoding.</p>

          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. GET Request</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Fetch user data:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`curl -X GET ${baseUrl}/api/users`}</pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">PowerShell Command:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`Invoke-RestMethod -Uri "${baseUrl}/api/users" -Method Get`}</pre>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. POST Request</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Create a new user:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`curl -X POST ${baseUrl}/api/users -H "Content-Type: application/json" -d '{"name": "new-user-name", "lineStatus": "offline"}'`}</pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">PowerShell Command:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`Invoke-RestMethod -Uri "${baseUrl}/api/users" -Method Post -ContentType "application/json" -Body '{"name": "new-user-name", "lineStatus": "offline"}'`}</pre>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. PATCH Request</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Update user information:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`curl -X PATCH ${baseUrl}/api/users?id=1 -H "Content-Type: application/json" -d '{"lineStatus": "online"}'`}</pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">PowerShell Command:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`Invoke-RestMethod -Uri "${baseUrl}/api/users?id=1" -Method Patch -ContentType "application/json" -Body '{"lineStatus": "online"}'`}</pre>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. DELETE Request</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Delete a user:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`curl -X DELETE ${baseUrl}/api/users?id=1 -H "Content-Type: application/json" -d '{"id": 1}'`}</pre>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-2">PowerShell Command:</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>{`Invoke-RestMethod -Uri "${baseUrl}/api/users?id=1" -Method Delete -ContentType "application/json" -Body '{"id": 1}'`}</pre>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">Database Information</h3>
            <p className="text-blue-700 dark:text-blue-300 mb-2">
              This API uses <strong>Sequelize ORM</strong> with <strong>SQLite</strong> database.
            </p>
            <p className="text-blue-700 dark:text-blue-300 mb-2">
              Database file location: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">./sqlite/dev.sqlite</code>
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              The database is automatically migrated when the application starts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
