import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    
    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);
    
    return (
        <section className='py-12 lg:py-16 bg-transparent'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                
                {/* Section Header */}
                <div className='text-center mb-10 lg:mb-12'>
                    <div className='inline-flex items-center gap-3 mb-4'>
                        <div className='w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400'></div>
                        <span className='text-sm font-medium text-amber-600 tracking-wider uppercase flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Best Sellers
                        </span>
                        <div className='w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400'></div>
                    </div>
                    
                    <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4'>
                        Customer Favorites
                    </h2>
                    
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Discover what everyone&apos;s talking about. These top-rated products 
                        have won the hearts of our customers worldwide.
                    </p>
                </div>

                {/* Products Grid */}
                {bestSeller.length > 0 ? (
                    <>
                                                                          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mb-8'>
                             {bestSeller.map((item, index) => (
                                 <div 
                                     key={index}
                                     className='transform transition-all duration-300 hover:scale-[1.02] relative h-full'
                                 >
                                     {/* Bestseller Ranking Badge */}
                                     <div className='absolute -top-2 -left-2 z-10 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg'>
                                         #{index + 1}
                                     </div>
                                     
                                     <ProductItem 
                                         _id={item._id} 
                                         image={item.image} 
                                         name={item.name} 
                                         price={item.price} 
                                     />
                                 </div>
                             ))}
                        </div>
                        
                        {/* Call to Action */}
                        <div className='text-center mt-10'>
                            <button 
                                onClick={() => navigate('/collection')}
                                className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
                            >
                                Explore All Bestsellers
                                <svg 
                                    className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' 
                                    fill='none' 
                                    stroke='currentColor' 
                                    viewBox='0 0 24 24'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : (
                                         <div className='text-center py-12'>
                        <div className='mb-4'>
                            <svg className='w-16 h-16 text-amber-300 mx-auto' fill='currentColor' viewBox='0 0 24 24'>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Bestsellers Yet</h3>
                        <p className='text-gray-600'>Check back soon to see our top-performing products.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BestSeller;