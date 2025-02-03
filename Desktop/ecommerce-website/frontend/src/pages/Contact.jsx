import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title */}
      <div className='text-center text-3xl font-bold pt-10 border-t pb-8'>
        <Title text1={'CONTACT '} text2={'US'} />
      </div>
      
      {/* Contact Section */}
      <div className='flex flex-col md:flex-row items-center gap-10 my-4'>
        {/* Contact Image */}
        <img className='h-[400px] w-auto rounded-lg shadow-lg' src={assets.contact_img} alt="Contact" />
        
        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6 bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-2/3'>
          <p className='font-semibold text-2xl text-gray-800'>Our Store</p>
          <p className='text-gray-600'>
            3477 Jim Rosa Lane <br />San Francisco, CA, United States
          </p>
          <p className='text-gray-600'>
            Telephone: <span className='font-semibold'>(123) 456-7890</span> <br />
            Email: <a href='mailto:admin@shopsphere.com' className='text-blue-600 hover:underline'>admin@shopsphere.com</a>
          </p>
          
          <p className='font-semibold text-xl text-gray-800'>Careers at ShopSphere</p>
          <p className='text-gray-600'>Learn more about our teams and job openings.</p>
          
          <button className='border border-black px-6 py-3 text-sm font-medium rounded-md transition-all hover:bg-black hover:text-white'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
