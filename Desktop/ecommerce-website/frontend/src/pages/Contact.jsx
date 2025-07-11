import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1={'CONTACT '} text2={'US'} />
        </div>
        
        {/* Contact Section */}
        <div className='my-8 lg:my-12'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            
            {/* Contact Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  className='w-full h-auto object-cover transition-transform duration-700 hover:scale-105' 
                  src={assets.contact_img} 
                  alt="Contact" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Contact Details */}
            <div className='space-y-6'>
              
              {/* Store Information Card */}
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300'>
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M7 7h.01M7 10h.01M7 13h.01M17 7h.01M17 10h.01M17 13h.01" />
                  </svg>
                  <p className='font-semibold text-2xl text-gray-800'>Our Store</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className='text-gray-600 leading-relaxed'>
                      3477 Jim Rosa Lane <br />San Francisco, CA, United States
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className='text-gray-600'>
                        Telephone: <span className='font-semibold text-gray-800'>(123) 456-7890</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className='text-gray-600'>
                        Email: <a href='mailto:admin@shopsphere.com' className='text-gray-900 font-semibold hover:text-gray-700 transition-colors underline decoration-gray-300 hover:decoration-gray-500'>admin@shopsphere.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Careers Card */}
              <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300'>
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4.5A2.5 2.5 0 0014.5 2h-5A2.5 2.5 0 007 4.5V6m9 0a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                  <p className='font-semibold text-xl text-gray-800'>Careers at ShopSphere</p>
                </div>
                
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Learn more about our teams and job openings.
                </p>
                
                <button className='inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group'>
                  <span>Explore Jobs</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              
              {/* Additional Contact Info */}
              <div className='bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white'>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
