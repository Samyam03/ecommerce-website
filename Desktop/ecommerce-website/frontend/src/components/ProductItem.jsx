import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ _id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    
    return (
        <Link 
            to={`/product/${_id}`}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-white hover:-translate-y-2 h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                <img 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                    src={image[0]} 
                    alt={name}
                    loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 group-hover:from-black/20 transition-all duration-500"></div>
                
                {/* Bottom Overlay CTA */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2.5 rounded-xl font-medium hover:bg-white transition-all duration-200 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        View Product
                    </button>
                </div>
            </div>

            {/* Product Info - Fixed Height */}
            <div className="p-5 flex-1 flex flex-col justify-between min-h-[140px]">
                <div className="mb-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed h-10 overflow-hidden">
                        {name}
                    </h3>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex-1">
                        <p className="text-lg font-bold text-gray-900">
                            {currency}{price}
                        </p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                            Free Shipping
                        </p>
                    </div>
                    
                    {/* Size indicator */}
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
        </Link>
    );
}

export default ProductItem;