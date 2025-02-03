import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-160">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-full sm:max-w-md bg-white p-8 rounded-2xl shadow-lg gap-5">
        <div className="inline-flex items-center gap-2 mb-4">
          <p className="text-4xl font-semibold text-gray-800">
            {currentState}
          </p>
        </div>

        {currentState === 'Login' ? null : (
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
            placeholder="Name" 
            required 
          />
        )}

        <input 
          type="email" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
          placeholder="Email" 
          required 
        />

        <input 
          type="password" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
          placeholder="Password" 
          required 
        />

        <div className="w-full flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black transition">Forgot Your Password?</p>
          {currentState === "Login" ? (
            <p 
              onClick={() => setCurrentState('Sign Up')} 
              className="cursor-pointer hover:text-black transition"
            > 
              Create Account
            </p>
          ) : (
            <p 
              onClick={() => setCurrentState('Login')} 
              className="cursor-pointer hover:text-black transition"
            > 
              Login
            </p>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition mt-4"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Login;