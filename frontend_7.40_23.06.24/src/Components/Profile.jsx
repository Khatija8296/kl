import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
 
const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data
 
  useEffect(() => {
    // Function to fetch user data (replace with your actual logic)
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          // Handle case where user data is not found in localStorage
          console.error("User data not found");
          return;
        }
       
        // Example: Fetch user data from backend based on stored user ID or email
        const response = await fetch(`http://localhost:3000/register/${storedUser.email,storedUser.password}`); // Adjust endpoint URL as per your backend
       
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
 
    fetchUserData();
  }, []);
 
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" replace />;
  }
 
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">User Profile</h2>
              {user && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      value={user.userName}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={user.phoneNumber}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      value={user.role}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      value={user.gender}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      value={user.age}
                      disabled
                    />
                  </div>
                </div>
              )}
              <div className="d-grid">
                <Link to="/" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Profile;
 