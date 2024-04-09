import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  // State to store user data
  const [userData, setUserData] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    // Make a GET request to fetch user data
    axios.get('/api/user/profile')
      .then(response => {
        // Set the user data in state
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Render loading message if user data is not yet fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  // Render user profile
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {userData.username}
      </div>
    </div>
  );
}

export default Profile;
