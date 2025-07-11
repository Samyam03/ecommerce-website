import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [isRemoving, setIsRemoving] = useState(null)

  const fetchList = async () => {
    setLoading(true)
    try {
      const response = await axios.get(backendUrl + '/api/product/list')

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    setIsRemoving(id)
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
  
      if (response.data.success) {
        toast.success(response.data.message)
        setList(prevList => prevList.filter(item => item._id !== id))
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error removing product: ' + error.message)
    } finally {
      setIsRemoving(null)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Filter products based on search term and category
  const filteredProducts = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ['All', ...new Set(list.map(item => item.category))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
              <p className="text-gray-600">Manage all your store products</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{list.length}</p>
                  <p className="text-sm text-gray-600">Total Products</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
                  <p className="text-sm text-gray-600">Filtered Results</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl border border-gray-200/50 p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchList}
              disabled={loading}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 flex items-center gap-2"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <svg className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterCategory !== 'All' 
                    ? 'Try adjusting your search or filters' 
                    : 'Start by adding some products to your store'
                  }
                </p>
                {searchTerm || filterCategory !== 'All' ? (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterCategory('All')
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[80px_1fr_120px_120px_100px] items-center py-4 px-6 bg-gray-50 border-b border-gray-200/50">
                <p className="text-sm font-semibold text-gray-700">Image</p>
                <p className="text-sm font-semibold text-gray-700">Product Details</p>
                <p className="text-sm font-semibold text-gray-700">Category</p>
                <p className="text-sm font-semibold text-gray-700">Price</p>
                <p className="text-sm font-semibold text-gray-700 text-center">Actions</p>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200/50">
                {filteredProducts.map((item, index) => (
                  <div key={item._id} className="grid grid-cols-1 md:grid-cols-[80px_1fr_120px_120px_100px] items-center gap-4 py-4 px-6 hover:bg-gray-50/50 transition-colors duration-300">
                    
                    {/* Product Image */}
                    <div className="flex justify-center md:justify-start">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden border border-gray-200/50">
                        <img 
                          className="w-full h-full object-cover" 
                          src={item.image[0]} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMS4zMzMzIDI2LjY2NjdDMjMuNTQyNSAyNi42NjY3IDI1LjMzMzMgMjQuODc1OCAyNS4zMzMzIDIyLjY2NjdDMjUuMzMzMyAyMC40NTc1IDIzLjU0MjUgMTguNjY2NyAyMS4zMzMzIDE4LjY2NjdDMTkuMTI0MiAxOC42NjY3IDE3LjMzMzMgMjAuNDU3NSAxNy4zMzMzIDIyLjY2NjdDMTcuMzMzMyAyNC44NzU4IDE5LjEyNDIgMjYuNjY2NyAyMS4zMzMzIDI2LjY2NjdaIiBmaWxsPSIjOUM5Qzk4Ii8+CjxwYXRoIGQ9Ik0xNiA0MC4wMDAxTDI2LjY2NjcgMjkuMzMzNEwzNy4zMzMzIDQwLjAwMDFINDhWMTZIMTZWNDAuMDAwMVoiIGZpbGw9IiM5QzlDOTgiLz4KPC9zdmc+Cg=='
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.subCategory || 'General'}
                      </p>
                      {item.bestseller && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="flex justify-start md:justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex justify-start md:justify-center">
                      <span className="text-lg font-bold text-gray-900">
                        {currency}{item.price}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-start md:justify-center">
                      <button
                        onClick={() => removeProduct(item._id)}
                        disabled={isRemoving === item._id}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isRemoving === item._id
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
                        }`}
                        title="Remove product"
                      >
                        {isRemoving === item._id ? (
                          <svg className="animate-spin w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
        </div>
       ))}
      </div>
    </>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
