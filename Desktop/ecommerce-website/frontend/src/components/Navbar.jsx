import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
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
      {/* Navbar */}
      <div className="flex items-center justify-between py-3 px-14 font-semibold bg-[#C0C0C0] fixed w-full top-0 left-0 z-20 shadow-sm text-black text-sm">
        {/* Logo */}
        <Link to='/'>
          <img src={assets.logo} className='w-12 cursor-pointer' alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className='hidden md:flex flex-1 justify-center gap-20 uppercase'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? 'border-b-2 border-gray-800' : 'hover:text-gray-600'}
          >
            Home
          </NavLink>
          <NavLink
            to='/collection'
            className={({ isActive }) => isActive ? 'border-b-2 border-gray-800' : 'hover:text-gray-600'}
          >
            Collection
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => isActive ? 'border-b-2 border-gray-800' : 'hover:text-gray-600'}
          >
            About
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) => isActive ? 'border-b-2 border-gray-800' : 'hover:text-gray-600'}
          >
            Contact
          </NavLink>
        </ul>

        {/* Action Icons */}
        <div className='flex items-center gap-14'>
          {isCollectionPage && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className='w-6 cursor-pointer hover:scale-110 transition-transform'
              alt="Search Icon"
            />
          )}

          {/* Profile Dropdown */}
          <div className='relative profile-dropdown'>
            <img
              onClick={(e) => {
                e.stopPropagation();
                if (token && userId) {
                  setShowProfileDropdown(!showProfileDropdown);
                } else {
                  navigate('/login');
                }
              }}
              src={assets.profile_icon}
              className='w-6 cursor-pointer hover:opacity-80'
              alt="Profile Icon"
            />
            {(token && userId) && showProfileDropdown && (
              <div
                className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-md py-3 text-gray-700 z-30"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <p className='px-6 py-2 hover:bg-gray-100 cursor-pointer'>My Profile</p>
                <p
                  onClick={() => {
                    navigate('/orders');
                    setShowProfileDropdown(false);
                  }}
                  className='px-6 py-2 hover:bg-gray-100 cursor-pointer'
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className='px-6 py-2 hover:bg-gray-100 cursor-pointer'
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-6 cursor-pointer hover:scale-110 transition-transform' alt="Cart Icon" />
            <p className='absolute -right-2 -bottom-2 w-6 h-6 text-center text-xs font-bold bg-gray-900 text-white rounded-full'>
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className='w-6 cursor-pointer md:hidden'
            alt="Menu Icon"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ease-in-out ${visible ? 'w-64' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col h-full text-gray-800'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer'>
            <img className='h-5 rotate-180' src={assets.dropdown_icon} alt="Back Icon" />
            <p className='text-sm'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-100 hover:bg-gray-50 text-sm' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-100 hover:bg-gray-50 text-sm' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-100 hover:bg-gray-50 text-sm' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-100 hover:bg-gray-50 text-sm' to='/contact'>Contact</NavLink>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black opacity-30 z-20 ${visible ? 'block' : 'hidden'}`}
        onClick={() => setVisible(false)}
      ></div>

      {/* Page Offset Below Navbar */}
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;