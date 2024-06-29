
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import '../../App.css';

export const Login = () => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
 
    const [error, setError] = useState(null);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login data being sent:', login); // Debug log
 
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
 
            console.log('Login response status:', response.status); // Debug log
 
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || 'Login failed');
            }
 
            const userData = await response.json();
            console.log('User data received:', userData); // Debug log
 
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data
            localStorage.setItem('role', userData.role); // Store user role
            alert('Login success');
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
            alert('Login failed: ' + error.message);
        } finally {
            setLogin({ email: '', password: '' });
        }
    };
 
    // Redirect if user is already logged in
    if (localStorage.getItem('user')) {
        return <Navigate to="/" replace />; // Redirect to home page
    }


    return (
        <div
            className="background-container"
            style={{
                backgroundImage: 'url("/highway.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
        >
            <div className="login-form-container">
                {/* Header */}
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3973ac' }}>
                    <div className="container-fluid">
                        <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>SeatSync</h2>
                        <div className="ml-auto">
                            <Link to='/login' className="btn btn-light" style={{marginRight:'5px'}}>Log In</Link>
                            <Link to='/register' className="btn btn-light">Sign In</Link>
                        </div>
                    </div>
                </nav>
               
                {/* Login Form */}
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        {/* Left Column for Logo */}
                        

                        <div className="col-md-6">
                            <div className="card transparent-form">
                            <h1 className="lk" style={{ color: '#1f2e2e' }}>"SeatSync"</h1>
                                <div className="card-body">
                                    {/* Login Form */}
                                    <h4 className="card-title text-center mb-4">Login In</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" className="form-control" id="email" name="email" value={login.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password">Password:</label>
                                            <input type="password" className="form-control" id="password" name="password" value={login.password} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <Link to='/Forgot' style={{ color: '#1f2e2e' }}>Forgot Password?</Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link to='/reset' style={{ color: '#1f2e2e' }}>Reset?</Link>
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
                                        </div>
                                        <div className="text-center mt-3">
                                            <Link to="/register" className="text-decoration-none" style={{ color: '#1f2e2e' }}>Register ? New account</Link>
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
