

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./Components/login/Register";
import { Login } from "./Components/login/Login";
import { Forgot } from "./Components/login/Forgot";
import { Reset } from "./Components/login/Reset";

import PrivateRoute from "./PrivatedRoute";
import Apps from "./Apps";
import App2 from "./App2";

 
function App() {
    // Retrieve role from localStorage
    const role = localStorage.getItem('role');
 
    console.log('Role from localStorage:', role); // Check role in console to verify
 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} /> {/* Public route for login */}
                <Route path="/register" element={<Register />} /> {/* Public route for registration */}
                <Route path="/forgot" element={<Forgot />} /> {/* Public route for forgot password */}
                <Route path="/reset" element={<Reset />} /> {/* Public route for reset password */}
               
                {/* Private routes based on role */}
                {role === 'admin' ? (
                    <Route
                        path="/*"
                        element={<PrivateRoute element={<Apps />} />} // Admin dashboard
                    />
                ) : (
                    <Route
                        path="/*"
                        element={<PrivateRoute element={<App2 />} />} // User dashboard
                    />
                )}
 
               
 
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if route does not match */}
            </Routes>
        </BrowserRouter>
    );
}
 
export default App;
