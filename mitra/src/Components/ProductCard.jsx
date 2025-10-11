import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border border-[#efebe7]">
      
      {/* Product Photo */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition duration-500 ease-in-out hover:opacity-90" 
          onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300?text=Agrimitra+Produce" }}
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-56"> {/* Fixed height for better grid alignment */}
        <div>
          {/* Name and Category */}
          <p className="text-xs font-semibold text-[#bd9476] mb-1">{product.category}</p>
          <h3 className="text-xl font-bold text-[#4f3d2a] mb-3 truncate" title={product.name}>{product.name}</h3>
        </div>

        <div>
          {/* Price and Quantity */}
          <div className="flex justify-between items-center mb-4 border-t pt-3">
            <div className="text-2xl font-extrabold text-green-700">
              ${product.price.toFixed(2)}
              <span className="text-base font-normal text-gray-500">/{product.unit}</span>
            </div>
           
          </div>

          {/* Buy Button */}
          <button
            onClick={() => alert(`Adding ${product.name} to cart!`)}
            className="w-full py-3 bg-[#bd9476] text-white font-bold rounded-lg hover:bg-[#a68269] transition duration-150 shadow-md flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;