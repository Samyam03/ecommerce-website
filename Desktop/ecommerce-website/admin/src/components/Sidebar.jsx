import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='w-64 h-[calc(100vh-4rem)] fixed top-16 left-0 bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/50 flex flex-col z-40'>
      <div className='flex flex-col h-full'>
        {/* Sidebar Header */}
        <div className='pt-8 pb-10 px-6'>
          <h2 className='text-lg font-bold text-gray-900 mb-2'>Dashboard</h2>
          <p className='text-sm text-gray-600'>Manage your store</p>
        </div>

        {/* Navigation Items */}
        <nav className='flex-1 px-6 pb-10 pt-0 flex flex-col gap-8'>
          <div className='space-y-4'>
            <NavLink 
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                }`
              }
              to="/add"
            >
              <div className={({ isActive }) => 
                `p-2 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                }`
              }>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium'>Add Items</p>
                <p className='text-xs opacity-75'>Create new products</p>
              </div>
              <svg className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>

            <NavLink 
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                }`
              }
              to="/list"
            >
              <div className={({ isActive }) => 
                `p-2 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                }`
              }>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium'>List Items</p>
                <p className='text-xs opacity-75'>View all products</p>
              </div>
              <svg className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>

            <NavLink 
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                }`
              }
              to="/orders"
            >
              <div className={({ isActive }) => 
                `p-2 rounded-lg transition-colors duration-300 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'
                }`
              }>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium'>Orders</p>
                <p className='text-xs opacity-75'>Manage customer orders</p>
              </div>
              <svg className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className='mt-20 mb-8 p-4 bg-white rounded-xl border border-gray-200/50 shadow-sm'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <svg className='w-4 h-4 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-900'>System Status</p>
              <p className='text-xs text-gray-600'>All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
