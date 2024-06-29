
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Reset = () => {
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isReset, setIsReset] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const response = await fetch(`https://billing-l50y.onrender.com/resetPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setIsReset(true);
    }
  };

  if (isReset) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: 'url("/highway.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="login-form-container">
        {/* Header */}
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3d5c5c' }}>
          <div className="container-fluid">
            <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>SestSync</h2>
            <div className="ml-auto">
              <Link to='/login' className="btn btn-light">Log In</Link>
              <Link to='/register' className="btn btn-light">Sign In</Link>
            </div>
          </div>
        </nav>
       
        {/* Reset Form */}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card transparent-form">
                <h1 className="lk" style={{ color: '#1f2e2e' }}>Welcome To JourneyJet</h1>
                <div className="card-body">
                  <h4 className="card-title text-center mb-4">Password Reset Form</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email">Email:</label>
                      <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="oldPassword">Old Password:</label>
                      <input type="password" className="form-control" id="oldPassword" name="oldPassword" value={data.oldPassword} onChange={(e) => setData({ ...data, oldPassword: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword">New Password:</label>
                      <input type="password" className="form-control" id="newPassword" name="newPassword" value={data.newPassword} onChange={(e) => setData({ ...data, newPassword: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword">Confirm New Password:</label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} required />
                      {!passwordsMatch && <p className="text-danger">Passwords do not match!</p>}
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
