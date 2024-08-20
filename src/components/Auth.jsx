import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuthMode = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className={`form-container ${isSignIn ? '' : 'right-panel-active'}`}>
          <div className="sign-in-container">
            <Login />
          </div>
          <div className="sign-up-container">
            <Register />
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className={`overlay-panel overlay-left ${isSignIn ? '' : 'active'}`}>
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={toggleAuthMode}>Sign In</button>
              </div>
              <div className={`overlay-panel overlay-right ${isSignIn ? 'active' : ''}`}>
                <h1>Hello, Friend!</h1>
                <p className='text-4xl'>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={toggleAuthMode}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
