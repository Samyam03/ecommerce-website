import { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, setUserId, userId } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    toast.success('Logged out successfully');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUserId('');
    setToken('');
    setCartItems({});
    setShowProfileDropdown(false);
  };

  const location = useLocation();
  const isCollectionPage = location.pathname.includes('collection');

  const handleClickOutside = (e) => {
    if (!e.target.closest('.profile-dropdown')) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Modern Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to='/' className="flex items-center space-x-2 group">
              <img 
                src={assets.logo} 
                className='h-10 w-auto transition-transform duration-200 group-hover:scale-105' 
                alt="Logo" 
              />
              <span className="hidden sm:block text-xl font-bold text-gray-800 tracking-tight">
                SHOPSPHERE
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className='hidden md:flex items-center space-x-8'>
              <NavLink
                to='/'
                className={({ isActive }) => 
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    HOME
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink
                to='/collection'
                className={({ isActive }) => 
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    COLLECTION
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink
                to='/about'
                className={({ isActive }) => 
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    ABOUT
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
              
              <NavLink
                to='/contact'
                className={({ isActive }) => 
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    CONTACT
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
                    )}
                  </>
                )}
              </NavLink>
            </div>

            {/* Action Icons */}
            <div className='flex items-center space-x-4'>
              {/* Search Icon */}
              {isCollectionPage && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                  aria-label="Search"
                >
                  <img
                    src={assets.search_icon}
                    className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
                    alt="Search"
                  />
                </button>
              )}

              {/* Profile Dropdown */}
              <div className='relative profile-dropdown'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (token && userId) {
                      setShowProfileDropdown(!showProfileDropdown);
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                  aria-label="Profile"
                >
                  <img
                    src={assets.profile_icon}
                    className='w-5 h-5 transition-transform duration-200 group-hover:scale-110'
                    alt="Profile"
                  />
                </button>
                
                {(token && userId) && showProfileDropdown && (
                                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                     <button
                       onClick={() => {
                         navigate('/orders');
                         setShowProfileDropdown(false);
                       }}
                       className='w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150'
                     >
                       My Orders
                     </button>
                     <div className="border-t border-gray-100 mt-1 pt-1">
                       <button
                         onClick={logout}
                         className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150'
                       >
                         Logout
                       </button>
                     </div>
                   </div>
                )}
              </div>

              {/* Cart Icon */}
              <Link to='/cart' className='relative group'>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <img 
                    src={assets.cart_icon} 
                    className='w-5 h-5 transition-transform duration-200 group-hover:scale-110' 
                    alt="Cart" 
                  />
                  {getCartCount() > 0 && (
                    <span className='absolute -top-1 -right-1 bg-gradient-to-r from-gray-800 to-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse'>
                      {getCartCount()}
                    </span>
                  )}
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setVisible(true)}
                className='md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
                aria-label="Menu"
              >
                <img
                  src={assets.menu_icon}
                  className='w-5 h-5'
                  alt="Menu"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full'>
          {/* Mobile Sidebar Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-100'>
            <h2 className='text-lg font-semibold text-gray-900'>Menu</h2>
            <button
              onClick={() => setVisible(false)}
              className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'
              aria-label="Close menu"
            >
              <img className='h-5 w-5 rotate-180' src={assets.dropdown_icon} alt="Close" />
            </button>
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className='flex-1 px-6 py-4 space-y-2'>
            <NavLink 
              onClick={() => setVisible(false)} 
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              to='/'
            >
              Home
            </NavLink>
            <NavLink 
              onClick={() => setVisible(false)} 
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              to='/collection'
            >
              Collection
            </NavLink>
            <NavLink 
              onClick={() => setVisible(false)} 
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              to='/about'
            >
              About
            </NavLink>
            <NavLink 
              onClick={() => setVisible(false)} 
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              to='/contact'
            >
              Contact
            </NavLink>
          </nav>

          {/* Mobile Sidebar Footer */}
          <div className='p-6 border-t border-gray-100'>
            {token && userId ? (
              <div className='space-y-2'>
                <button
                  onClick={() => {
                    navigate('/orders');
                    setVisible(false);
                  }}
                  className='w-full text-left px-4 py-3 rounded-lg text-base text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200'
                >
                  My Orders
                </button>
                <button
                  onClick={() => {
                    logout();
                    setVisible(false);
                  }}
                  className='w-full text-left px-4 py-3 rounded-lg text-base text-red-600 hover:bg-red-50 transition-all duration-200'
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setVisible(false);
                }}
                className='w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium'
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modern Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setVisible(false)}
      ></div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;