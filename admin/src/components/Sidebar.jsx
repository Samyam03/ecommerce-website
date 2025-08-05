import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';

const Sidebar = ({ open, setOpen }) => {
  // Sidebar classes for mobile/desktop
  const sidebarBase = 'w-64 h-[calc(100vh-4rem)] flex flex-col z-40 transition-transform duration-300';
  // On mobile: solid white bg, dark text. On md+: gradient bg, dark text.
  const sidebarMobile = open
    ? 'fixed top-16 left-0 translate-x-0 shadow-2xl md:shadow-none bg-white text-gray-900'
    : 'fixed top-16 -translate-x-full md:translate-x-0 left-0 bg-white text-gray-900';
  const sidebarDesktop = 'md:bg-gradient-to-b md:from-white md:to-gray-50/50 md:text-gray-900 md:border-r md:border-gray-200/50';

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={
          `${sidebarBase} ${sidebarMobile} ${sidebarDesktop} md:fixed md:top-16 md:left-0 md:block ${open ? 'block' : 'hidden md:block'}`
        }
        style={{ maxWidth: '16rem' }}
      >
        {/* Header: mobile (row), desktop (stacked) */}
        <div className="pt-8 pb-10 px-6">
          {/* Mobile: flex row, close button right */}
          <div className="flex items-center md:hidden gap-3 mb-6 justify-between">
            <div>
              <h2 className='text-lg font-bold mb-0 leading-tight'>Dashboard</h2>
              <p className='text-sm text-gray-600 leading-tight'>Manage your store</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Desktop: stacked */}
          <div className="hidden md:block">
            <h2 className='text-lg font-bold mb-2'>Dashboard</h2>
            <p className='text-sm text-gray-600'>Manage your store</p>
          </div>
        </div>
        <div className='flex flex-col h-full'>
          {/* Navigation Items */}
          <nav className='flex-1 px-6 pb-10 pt-0 flex flex-col gap-8'>
            <div className='space-y-4'>
              <NavLink 
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 shadow-lg' 
                      : 'text-gray-900 hover:bg-gray-50 hover:shadow-md border border-gray-200/50'
                  }`
                }
                to="/add"
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
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
                  </>
                )}
              </NavLink>

              <NavLink 
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 shadow-lg' 
                      : 'text-gray-900 hover:bg-gray-50 hover:shadow-md border border-gray-200/50'
                  }`
                }
                to="/list"
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
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
                  </>
                )}
              </NavLink>

              <NavLink 
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 shadow-lg' 
                      : 'text-gray-900 hover:bg-gray-50 hover:shadow-md border border-gray-200/50'
                  }`
                }
                to="/orders"
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
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
                  </>
                )}
              </NavLink>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className='mt-20 mb-8 p-4 bg-gray-50 md:bg-white rounded-xl border border-gray-200/50 shadow-sm'>
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
    </>
  )
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Sidebar
