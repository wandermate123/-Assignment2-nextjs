'use client';

import { useEffect, useState } from 'react';
import { User } from '@/app/types/user';

export default function OnlineStatusManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserId, setNewUserId] = useState('');

  // Fetch all users and update the state
  const fetchAll = async () => {
    try {
      const res = await fetch(`/api/users/`);
      if (res.ok) {
        const data = await res.json();

        // Assuming the data is an array of users
        const users: User[] = data.map((user: { id: number; name: string; lineStatus: 'online' | 'offline' }) => ({
          id: user.id,
          name: user.name,
          lineStatus: user.lineStatus,
        }));

        setUsers(users); // Update the state with the fetched users
      } else {
        console.log("Error Data Empty: no data");
      }
    } catch (error) {
      console.log("Error Data Empty: no data", error);
    }
  };

  // Load initial status for each user when the component mounts
  useEffect(() => {
    fetchAll();
  }, []);

  // Toggle online/offline status
  const toggleStatus = async (id: number) => {
    const current = users.find((u) => u.id === id);
    if (!current) return;

    const newStatus = current.lineStatus === 'online' ? 'offline' : 'online'; // Store toggle lineStatus
    const newName = current.name;

    const res = await fetch(`/api/users?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, lineStatus: newStatus }), // Corrected field names
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, lineStatus: newStatus } : u))
      );
    }
  };

  // Add a new user ID and fetch their status
  const addUser = async () => {
    if (!newUserId) return; // Don't add empty IDs

    // Make a POST request to add the user (assuming a simple post to add a new user)
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUserId, lineStatus: 'offline' }),
    });

    if (res.ok) {
      // Clear the input field after adding
      setNewUserId('');

      // Directly update the UI by adding the new user to the state
      const newUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
    } else {
      console.log('Failed to add user');
    }
  };

  const deleteID = async (id: number) => {
    // Make a DELETE request to remove the user
    const res = await fetch(`/api/users?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id}),
    });

    if (res.ok) {
      fetchAll(); //re-fetch the data to load.
    } else {
      console.log('Error: Delete did not complete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            User Presence (Online/Offline)
          </h2>

          {/* Input to add a new user ID */}
          <div className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="Enter user ID"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={addUser}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add User
              </button>
            </div>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No users found. Add a user to get started.
              </p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.lineStatus === 'online'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {user.lineStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteID(user.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
