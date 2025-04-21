import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch Users Function
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, []);

  // Delete User Handler
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/users/delete/${userId}`);
      // Refresh users list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  // Edit User Modal Component
  const EditUserModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:4000/users/update/${user._id}`, editedUser);
        onSave(editedUser);
        onClose();
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-96">
          <h2 className="text-2xl mb-4">Edit User</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={editedUser.username}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              placeholder="Username"
              className="w-full p-2 bg-gray-700 rounded"
            />
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              placeholder="Email"
              className="w-full p-2 bg-gray-700 rounded"
            />
            <div className="flex justify-between">
              <button 
                onClick={handleSave} 
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button 
                onClick={onClose} 
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Modal for Delete
  const DeleteConfirmationModal = ({ user, onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-96">
          <h2 className="text-2xl mb-4 text-red-500">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete user {user.username}?</p>
          <div className="flex justify-between">
            <button 
              onClick={() => onConfirm(user._id)} 
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button 
              onClick={onClose} 
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header remains the same */}
      <main className="container mx-auto px-4 py-8">
        <section className={`mb-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden ${
          mounted ? "animate-fadeIn" : "opacity-0"
        }`}>
          <h2 className="text-2xl font-semibold p-4 bg-gray-700">Users</h2>
          <div className="p-4">
            {users.length === 0 ? (
              <div className="text-gray-400 text-center">No users found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div 
                    key={user._id} 
                    className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition duration-300 relative"
                  >
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-500 text-white p-1 rounded"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
                    <p className="text-gray-300">Email: {user.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Edit User Modal */}
      {selectedUser && (
        <EditUserModal 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(updatedUser) => {
            // Optional: Update user in local state
            setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
          }}
        />
      )}
    </div>
  );
}
