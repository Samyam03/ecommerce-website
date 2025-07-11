import React from 'react'
import Banner from '../components/Banner'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative'>
        <Banner />
      </section>

      {/* Main Content Flow */}
      <div className='relative bg-gradient-to-b from-white via-gray-50/30 to-white'>
        
        {/* Latest Collection Section */}
        <section className='relative'>
          <LatestCollection />
        </section>



        {/* Best Seller Section */}
        <section className='relative'>
          <BestSeller />
        </section>
      </div>

      {/* Trust & Engagement Section */}
      <div className='relative bg-gradient-to-b from-white to-gray-50'>
        
        {/* Policy Section */}
        <section className='relative'>
          <Policy />
        </section>

        {/* Newsletter Section */}
        <section className='relative'>
          <NewsLetterBox />
        </section>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className='fixed bottom-8 right-8 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group z-50 opacity-0 animate-fade-in'
        style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        aria-label='Scroll to top'
      >
        <svg 
          className='w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1' 
          fill='none' 
          stroke='currentColor' 
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 11l5-5m0 0l5 5m-5-5v12' />
        </svg>
      </button>
    </main>
  )
}

export default Home
