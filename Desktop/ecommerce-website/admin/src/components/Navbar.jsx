import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <nav className='fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200/50 shadow-sm z-50 flex items-center'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex items-center justify-between h-16'>
          
          {/* Logo Section */}
          <div className='flex items-center gap-3'>
            <img className='h-8 w-auto' src={assets.logo} alt="Admin Panel" />
            <div className='hidden sm:block'>
              <div className='flex items-center gap-2'>
                <div className='w-px h-6 bg-gray-300'></div>
                <span className='text-sm font-medium text-gray-600 tracking-wider uppercase'>
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-4'>
            
            {/* Admin Badge */}
            <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full'>
              <svg className='w-4 h-4 text-gray-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className='text-sm font-medium text-gray-700'>Administrator</span>
            </div>

            {/* Logout Button */}
            <button 
              onClick={() => setToken('')} 
              className='inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group'
            >
              <svg className='w-4 h-4 transition-transform duration-300 group-hover:rotate-12' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className='text-sm'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
