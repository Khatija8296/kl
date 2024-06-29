import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const signout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example state to track login status
  const history = useHistory();

  const handleSignOut = () => {
    // Implement sign-out functionality here
    // Clear user authentication tokens or session data
    // For example:
    // localStorage.removeItem('authToken');
    setIsLoggedIn(false); // Update login status
    history.push("/Login"); // Redirect to login page after sign-out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inventory Billing App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default signout;
