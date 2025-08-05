import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const navigate = useNavigate();
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);
    
    return (
        <section className='py-12 lg:py-16 bg-transparent'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                
                {/* Section Header */}
                <div className='text-center mb-10 lg:mb-12'>
                    <div className='inline-flex items-center gap-3 mb-4'>
                        <div className='w-12 h-[1px] bg-gray-400'></div>
                        <span className='text-sm font-medium text-gray-600 tracking-wider uppercase'>
                            Latest Collection
                        </span>
                        <div className='w-12 h-[1px] bg-gray-400'></div>
                    </div>
                    
                    <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4'>
                        New Arrivals
                    </h2>
                    
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Discover our carefully curated selection of the latest products, 
                        handpicked for quality and style.
                    </p>
                </div>

                {/* Products Grid */}
                {latestProducts.length > 0 ? (
                    <>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mb-8'>
                            {latestProducts.map((item, index) => (
                                <div 
                                    key={index}
                                    className='transform transition-all duration-300 hover:scale-[1.02] h-full'
                                >
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
                        <div className='text-center'>
                            <button 
                                onClick={() => navigate('/collection')}
                                className='inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 group'
                            >
                                View All Products
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
                            <svg className='w-16 h-16 text-gray-300 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                            </svg>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Products Available</h3>
                        <p className='text-gray-600'>Check back soon for our latest arrivals.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default LatestCollection;