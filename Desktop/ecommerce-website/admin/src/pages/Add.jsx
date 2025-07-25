import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../../constants";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      });

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([])
        setBestseller(false)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600">Create a new product for your store</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                <p className="text-sm text-gray-600">Upload up to 4 images (first image will be the main image)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { state: image1, setter: setImage1, id: "image1", label: "Main Image" },
                { state: image2, setter: setImage2, id: "image2", label: "Image 2" },
                { state: image3, setter: setImage3, id: "image3", label: "Image 3" },
                { state: image4, setter: setImage4, id: "image4", label: "Image 4" }
              ].map((img) => (
                <div key={img.id} className="relative">
                  <label htmlFor={img.id} className="block cursor-pointer group">
                    <div className={`aspect-square rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                      img.state 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 bg-gray-50 group-hover:border-blue-400 group-hover:bg-blue-50'
                    }`}>
                      {img.state ? (
                        <img 
                          className="w-full h-full object-cover" 
                          src={URL.createObjectURL(img.state)} 
                          alt={img.label} 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-xs font-medium">Upload</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">{img.label}</p>
                    <input 
                      onChange={(e) => img.setter(e.target.files[0])} 
                      type="file" 
                      id={img.id} 
                      accept="image/*"
                      hidden 
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                <p className="text-sm text-gray-600">Basic information about your product</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  type="text"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                <textarea 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-h-[120px] resize-none"
                  placeholder="Describe your product features and benefits"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
                  <select 
                    onChange={(e) => setSubCategory(e.target.value)}
                    value={subCategory}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input 
                    onChange={(e) => setPrice(e.target.value)} 
                    value={price}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sizes Section */}
          <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Available Sizes</h3>
                <p className="text-sm text-gray-600">Select all available sizes for this product</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSizes((prev) =>
                    prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
                  )}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    sizes.includes(size)
                      ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Product Settings</h3>
                <p className="text-sm text-gray-600">Additional product configurations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input 
                onChange={() => setBestseller(prev => !prev)} 
                checked={bestseller} 
                type="checkbox" 
                id='bestseller'
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label className='text-gray-700 font-medium cursor-pointer' htmlFor="bestseller">
                Add to bestseller collection
              </label>
            </div>
          </div>

          {/* Error Message */}
          {/* The error state variable was removed, so this block will be removed. */}

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Adding Product...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;