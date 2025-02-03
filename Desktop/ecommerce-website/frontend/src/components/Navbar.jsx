import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  // Get the current location/path
  const location = useLocation();

  // Check if the current path is the collection page
  const isCollectionPage = location.pathname.includes('collection');

  return (
    <>
      <div className="flex items-center justify-between py-4 px-8 font-medium shadow-md bg-gradient-to-r from-white to-gray-300 z-10 fixed w-full top-0 left-0 transition-all">
        {/* Logo */}
        <Link to='/'>
          <img src={assets.logo} className='w-12 cursor-pointer' alt="Logo" />
        </Link>

        {/* Navigation links */}
        <ul className='hidden md:flex gap-8 text-sm text-gray-700 uppercase font-semibold'>
          <NavLink 
            to='/'
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all ${isActive ? 'border-b-2 border-black' : 'hover:text-black'}`}
          >
            <p>Home</p>
          </NavLink>
          <NavLink 
            to='/collection' 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all ${isActive ? 'border-b-2 border-black' : 'hover:text-black'}`}
          >
            <p>Collection</p>
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all ${isActive ? 'border-b-2 border-black' : 'hover:text-black'}`}
          >
            <p>About</p>
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all ${isActive ? 'border-b-2 border-black' : 'hover:text-black'}`}
          >
            <p>Contact</p>
          </NavLink>
        </ul>

        {/* Action Icons */}
        <div className='flex items-center gap-8'>
          {/* Search Icon for Collection page */}
          {isCollectionPage && (
            <img 
              onClick={() => setShowSearch(true)} 
              src={assets.search_icon} 
              className='w-6 cursor-pointer transition-transform hover:scale-110' 
              alt="Search Icon" 
            />
          )}

          {/* Profile Dropdown */}
          <div className='group relative'>
            <Link to='/login'>
              <img src={assets.profile_icon} className='w-6 cursor-pointer transition-all hover:opacity-80' alt="Profile Icon" />
            </Link>
            <div className='group-hover:block hidden absolute right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-4 px-6 bg-white shadow-lg rounded-lg text-gray-600'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p className='cursor-pointer hover:text-black'>Orders</p>
                <p className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>

          {/* Cart Icon with Count */}
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-6 min-w-6 cursor-pointer transition-all hover:scale-110' alt="Cart Icon" />
            <p className='absolute right-[-7px] bottom-[-7px] w-5 h-5 text-center text-[10px] font-semibold bg-black text-white rounded-full'>
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-6 cursor-pointer md:hidden' alt="Menu Icon" />
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div 
        className={`absolute top-0 right-0 bottom-0 bg-white transition-all ease-in-out z-20 ${visible ? 'w-3/4' : 'w-0'} overflow-hidden`}
      >
        <div className='flex flex-col text-gray-600'>
          <div 
            onClick={() => setVisible(false)} 
            className='flex items-center gap-4 p-4 cursor-pointer'
          >
            <img className='h-5 rotate-180' src={assets.dropdown_icon} alt="Back Icon" />
            <p>Back</p>
          </div>
          <NavLink 
            onClick={() => setVisible(false)} 
            className='py-3 pl-6 border-b' 
            to='/'
          >
            Home
          </NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            className='py-3 pl-6 border-b' 
            to='/collection'
          >
            Collection
          </NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            className='py-3 pl-6 border-b' 
            to='/about'
          >
            About
          </NavLink>
          <NavLink 
            onClick={() => setVisible(false)} 
            className='py-3 pl-6 border-b' 
            to='/contact'
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      <div 
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-15 ${visible ? 'block' : 'hidden'}`} 
        onClick={() => setVisible(false)}
      ></div>

      {/* Main Content Below Navbar */}
      <div className="mt-20">
        {/* Place your main page content here */}
        {/* Example: */}
        <div className="content">
        </div>
      </div>
    </>
  );
};

export default Navbar;