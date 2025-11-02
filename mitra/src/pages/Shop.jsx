import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../Components/ProductCard';
import CropData from "../../CropData";

const ALL_CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Grains', 'Specialty'];

const ProductListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [predictedPrices, setPredictedPrices] = useState({});

  // Fetch predicted prices from backend
  useEffect(() => {
    fetch('http://localhost:5001/predict_prices')
      .then(res => res.json())
      .then(data => setPredictedPrices(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = useMemo(() => {
    return CropData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  return (
    <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
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

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    price: predictedPrices[product.name] ?? product.price,
                    originalPrice: product.price,
                    predictedPrice: predictedPrices[product.name]
                  }} 
                />
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
