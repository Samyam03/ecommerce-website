import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (event) => {
    setCategory(prev =>
      category.includes(event.target.value)
        ? prev.filter(item => item !== event.target.value)
        : [...prev, event.target.value]
    );
  };

  const toggleSubCategory = (event) => {
    setSubCategory(prev =>
      subCategory.includes(event.target.value)
        ? prev.filter(item => item !== event.target.value)
        : [...prev, event.target.value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();

    switch (sortType) {
      case 'Low-High':
        setFilterProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case 'High-Low':
        setFilterProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className='text-center text-3xl font-bold pt-8 border-t border-gray-200/50 pb-8'>
          <Title text1="ALL " text2="COLLECTIONS" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          
          {/* Left Sidebar - Filters */}
          <div className="w-full sm:w-72">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center gap-2 text-gray-900 cursor-pointer hover:text-gray-700 transition-colors duration-300 font-semibold"
            >
              FILTERS
              <img
                className={`h-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
                src={assets.dropdown_icon}
                alt="Toggle Filters"
              />
            </button>

            {/* Category Filter */}
            <div className={`bg-white rounded-xl border border-gray-200/50 p-6 mt-6 shadow-sm hover:shadow-md transition-all duration-300 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">CATEGORIES</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {['Men', 'Women', 'Kids'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 transition-colors"
                      type="checkbox"
                      value={item}
                      onChange={toggleCategory}
                      checked={category.includes(item)}
                    />
                    <span className="group-hover:text-gray-900 transition-colors font-medium">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className={`bg-white rounded-xl border border-gray-200/50 p-6 mt-6 shadow-sm hover:shadow-md transition-all duration-300 ${showFilter ? '' : 'hidden'} sm:block`}>
              <p className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">TYPE</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 transition-colors"
                      type="checkbox"
                      value={item}
                      onChange={toggleSubCategory}
                      checked={subCategory.includes(item)}
                    />
                    <span className="group-hover:text-gray-900 transition-colors font-medium">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <div>
                <p className="text-gray-600 text-sm mt-1">
                  Showing {filterProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="relative">
                <select
                  onChange={(event) => setSortType(event.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-300 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <option value="Relevant">Sort by: Relevant</option>
                  <option value="Low-High">Sort by Price: Low to High</option>
                  <option value="High-Low">Sort by Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filterProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {filterProducts.map((item, index) => (
                  <div 
                    key={item._id}
                    className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setCategory([]);
                    setSubCategory([]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Clear Filters
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;