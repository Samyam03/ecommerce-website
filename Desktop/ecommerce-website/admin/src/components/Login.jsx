import React from 'react';
import { useState } from 'react';

const Login = () => {

 const[email,setEmail]= useState('');
 const[password,setPassword]=useState('');

 const onSubmitHandler=async(event)=>{
    try {
        event.preventDefault();

    } 
    catch (error) {
        
    }
 }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
            onChange={(event)=>setEmail(event.target.value)}
            value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
            onChange={(event)=>setPassword(event.target.value)}
            value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;