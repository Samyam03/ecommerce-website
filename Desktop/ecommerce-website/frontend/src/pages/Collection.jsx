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
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-10 border-t">
      <div className="w-full sm:w-64">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center gap-2 text-blue-600 cursor-pointer"
        >
          FILTERS
          <img
            className={`h-4 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle Filters"
          />
        </button>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 p-4 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-semibold">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {['Men', 'Women', 'Kids'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  value={item}
                  onChange={toggleCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 p-4 mt-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-semibold">TYPE</p>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  value={item}
                  onChange={toggleSubCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-xl mb-4">
          <Title text1="ALL " text2="COLLECTIONS" />
          <select
            onChange={(event) => setSortType(event.target.value)}
            className="border-2 border-gray-300 px-3 py-2 text-sm"
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by Price: Low to High</option>
            <option value="High-Low">Sort by Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item.id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;