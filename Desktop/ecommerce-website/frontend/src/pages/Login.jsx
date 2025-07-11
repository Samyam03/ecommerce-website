import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, setUserId } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          toast.success('Account created successfully! Please login.');
          setName('');
          setEmail('');
          setPassword('');
          setCurrentState('Login');
          navigate('/temp', { replace: true });
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 0);
        } else {
          toast.error(response.data.message);
        }
      } 
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          setUserId(response.data.user._id);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.user._id);
          toast.success('Logged in successfully');
        } else {
          toast.error("You have entered an invalid email or password");
        }
      }
    } catch (error) {
      toast.error("The user with the provided email does not exist");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200/30 to-gray-300/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-200/30 to-gray-300/20 rounded-full blur-3xl'></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-gray-400"></div>
            <span className="text-sm font-medium text-gray-600 tracking-wider uppercase">
              {currentState === 'Login' ? 'Welcome Back' : 'Join Us'}
            </span>
            <div className="w-12 h-[1px] bg-gray-400"></div>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              {currentState}
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentState === 'Login' 
              ? 'Sign in to access your account and continue shopping' 
              : 'Create your account to start your shopping journey'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            
            {/* Name Input (Sign Up only) */}
            {currentState === 'Sign Up' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input 
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    type="text" 
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input 
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  type="email" 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white" 
                  placeholder="Enter your email address" 
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input 
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  type="password" 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white" 
                  placeholder="Enter your password" 
                  required 
                />
              </div>
            </div>

            {/* Links Section */}
            <div className="flex justify-between items-center text-sm">
              <button type="button" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Forgot Password?
              </button>
              {currentState === "Login" ? (
                <button
                  type="button"
                  onClick={() => setCurrentState('Sign Up')} 
                  className="text-gray-900 hover:text-gray-700 transition-colors font-semibold"
                > 
                  Create Account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentState('Login')} 
                  className="text-gray-900 hover:text-gray-700 transition-colors font-semibold"
                > 
                  Back to Login
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white text-lg font-medium px-6 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <span className="flex items-center justify-center gap-2">
                {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              {currentState === 'Login' 
                ? "Don't have an account? " 
                : "Already have an account? "
              }
              <button 
                type="button"
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              >
                {currentState === 'Login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;