import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200/30 to-gray-300/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-200/30 to-gray-300/20 rounded-full blur-3xl'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          
          {/* Hero Left Side - Content */}
          <div className='space-y-8 text-center lg:text-left order-2 lg:order-1'>
            
            {/* Badge */}
            <div className='inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50'>
              <div className='w-2 h-2 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium text-gray-700 tracking-wide uppercase'>
                Our Bestsellers
              </span>
              <div className='w-8 h-[2px] bg-gradient-to-r from-gray-800 to-gray-600 rounded-full'></div>
            </div>

            {/* Main Heading */}
            <div className='space-y-4'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight'>
                <span className='block'>Latest</span>
                <span className='block bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent'>
                  Arrivals
                </span>
              </h1>
              
              <p className='text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
                Discover our newest collection of premium products, carefully curated for style and quality.
              </p>
            </div>

            {/* Mobile Image - Only visible on mobile */}
            <div className='lg:hidden relative'>
              <div className='relative'>
                {/* Image container with modern styling */}
                <div className='relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200'>
                  <img 
                    className='w-full h-auto object-cover transition-transform duration-700 hover:scale-105' 
                    src={assets.hero_img} 
                    alt='Latest Fashion Collection'
                  />
                  
                  {/* Overlay gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent'></div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start'>
              <button 
                onClick={() => navigate('/collection')}
                className='group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl'
              >
                <span className='mr-2'>Shop Now</span>
                <svg 
                  className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' 
                  fill='none' 
                  stroke='currentColor' 
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </button>
              
              <div className='flex items-center gap-3 text-gray-600'>
                <span className='text-sm font-medium'>Free shipping on orders over $50</span>
                <div className='w-8 h-[2px] bg-gradient-to-r from-gray-400 to-gray-300 rounded-full'></div>
              </div>
            </div>

            {/* Stats */}
            <div className='flex items-center justify-center lg:justify-start gap-8 pt-8'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>1000+</div>
                <div className='text-sm text-gray-600'>Happy Customers</div>
              </div>
              <div className='w-px h-12 bg-gray-300'></div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>500+</div>
                <div className='text-sm text-gray-600'>Products</div>
              </div>
              <div className='w-px h-12 bg-gray-300'></div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>4.9★</div>
                <div className='text-sm text-gray-600'>Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Right Side - Image - Only visible on desktop */}
          <div className='relative order-1 lg:order-2 hidden lg:block'>
            <div className='relative'>
              {/* Image container with modern styling */}
              <div className='relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200'>
                <img 
                  className='w-full h-auto object-cover transition-transform duration-700 hover:scale-105' 
                  src={assets.hero_img} 
                  alt='Latest Fashion Collection'
                />
                
                {/* Overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        <div className='flex flex-col items-center gap-2 text-gray-400'>
          <span className='text-xs uppercase tracking-wider'>Scroll Down</span>
          <div className='w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
