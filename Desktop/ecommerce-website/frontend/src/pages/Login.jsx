import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user._id); // Store userId
          console.log('Storing userId:', response.data.user._id); // Debugging
          toast.success('Logged in successfully');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

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
            onChange={(event) => setName(event.target.value)}
            value={name}
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
            placeholder="Name" 
            required 
          />
        )}

        <input 
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
          placeholder="Email" 
          required 
        />

        <input 
          onChange={(event) => setPassword(event.target.value)}
          value={password}
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
};

export default Login;