import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Profile = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${user.id}`);
        setUserData(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          // User doesn't exist in our database, create them
          try {
            const newUser = {
              clerkId: user.id,
              email: user.primaryEmailAddress.emailAddress,
              username: user.username || user.firstName + user.lastName,
              firstName: user.firstName,
              lastName: user.lastName,
              profileImage: user.imageUrl,
            };
            const createResponse = await axios.post(`${API_URL}/users`, newUser);
            setUserData(createResponse.data);
          } catch (createError) {
            setError('Error creating user profile');
          }
        } else {
          setError('Error fetching user profile');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!user) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={userData.profileImage}
            alt={`${userData.firstName}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">@{userData.username}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Member since</label>
              <p className="mt-1">
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 