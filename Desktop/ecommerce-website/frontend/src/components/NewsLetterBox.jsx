import React, { useState } from 'react'

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (email) {
            setIsSubmitted(true);
            // Add actual newsletter subscription logic here
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    }

    return (
        <section className='py-16 lg:py-20 bg-transparent'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                
                {/* Section Header */}
                <div className='mb-12 lg:mb-16'>
                    <div className='inline-flex items-center gap-3 mb-6'>
                        <div className='w-12 h-[1px] bg-gray-400'></div>
                        <span className='text-sm font-medium text-gray-600 tracking-wider uppercase'>
                            Newsletter
                        </span>
                        <div className='w-12 h-[1px] bg-gray-400'></div>
                    </div>
                    
                    <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6'>
                        Stay Updated
                    </h2>
                    
                    <p className='text-lg text-gray-600 mb-4'>
                        Subscribe & get <span className='font-bold text-gray-900'>15% off</span> your first order
                    </p>
                    
                    <p className='text-gray-600 leading-relaxed max-w-2xl mx-auto'>
                        Be the first to know about new arrivals, exclusive deals, and special offers. 
                        Join thousands of satisfied customers.
                    </p>
                </div>

                {/* Newsletter Form */}
                <div className='max-w-lg mx-auto mb-16 lg:mb-20'>
                    {!isSubmitted ? (
                        <form onSubmit={onSubmitHandler} className='relative'>
                            <div className='flex items-center bg-white rounded-lg border-2 border-gray-200 shadow-lg hover:border-gray-300 transition-colors duration-200 p-2'>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent outline-none' 
                                    placeholder='Enter your email address'
                                    required
                                />
                                <button 
                                    type='submit' 
                                    className='bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2 group'
                                >
                                    Subscribe
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className='bg-green-50 border-2 border-green-200 rounded-lg p-6 shadow-lg'>
                            <div className='flex items-center justify-center gap-3 text-green-700 mb-2'>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className='font-semibold text-lg'>Successfully Subscribed!</span>
                            </div>
                            <p className='text-green-600'>Check your email for your 15% discount code.</p>
                        </div>
                    )}
                </div>

                {/* Benefits */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 max-w-4xl mx-auto mb-12'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                            <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-3'>Exclusive Deals</h3>
                        <p className='text-sm text-gray-600 leading-relaxed'>Special discounts just for subscribers</p>
                    </div>
                    
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-3'>Early Access</h3>
                        <p className='text-sm text-gray-600 leading-relaxed'>First to shop new collections</p>
                    </div>
                    
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-3'>Style Updates</h3>
                        <p className='text-sm text-gray-600 leading-relaxed'>Latest trends and fashion tips</p>
                    </div>
                </div>

                {/* Privacy Notice */}
                <p className='text-xs text-gray-500'>
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    )
}

export default NewsLetterBox
