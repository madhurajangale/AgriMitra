import React, { useState, useMemo } from 'react';
// You might need to import icons for the search bar if you aren't using the SVG in the code
import { Search } from 'lucide-react'; 
import ProductCard from '../Components/ProductCard';
import CropData from "../../CropData";



const ALL_CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Grains', 'Specialty'];


const ProductListingsPage = () => {
  // 1. State for user input
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // 2. Filter Logic (Memoized for performance)
  const filteredProducts = useMemo(() => {
    return CropData.filter(product => {
      // Filter by Search Term (case-insensitive)
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by Category
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  return (
    <div className={`min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#4f3d2a] mb-2">
            The Farmer's Market
          </h1>
          <p className="text-xl text-gray-500">
            Freshly harvested, locally sourced produce just for you.
          </p>
        </header>
        
        {/* Search and Filter Section */}
        <div className="mb-10 p-5 bg-white rounded-xl shadow-lg border border-[#efebe7]">
          {/* Search Input */}
          <div className="relative mb-6 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search by name: e.g., Tomatoes, Honey, Corn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border-2 border-gray-300 rounded-full focus:ring-[#bd9476] focus:border-[#bd9476] transition duration-150 text-[#4f3d2a]"
            />
            {/* Search Icon (SVG) */}
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-gray-700 font-semibold self-center hidden sm:block">Filter By:</span>
            {ALL_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`
                  px-4 py-2 text-sm font-semibold rounded-full transition duration-200 shadow-sm
                  ${filterCategory === category
                    ? 'bg-[#bd9476] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#efebe7]'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow-md">
            <p className="text-xl font-medium text-gray-600">
              No produce found matching your criteria. Try adjusting your search or filters! 🚜
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductListingsPage;

