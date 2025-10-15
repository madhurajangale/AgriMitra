import React, { useState } from 'react';
import { FARMER_DATA } from '../../Farmerdata';
import  CropData from '../../CropData';
import { Plus, Archive } from 'lucide-react'; // Example icons

export const FARMER_STOCK = [
    { id: 1, name: 'Tomatoes', category: 'Vegetables', quantity: 50, unit: 'lbs', price: 3.99, deliveryCost: 5.00, image: 'https://images.unsplash.com/photo-1579549303799-fae26b1c5a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY5fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080' },
    { id: 2, name: 'Jowar', category: 'Grains', quantity: 150, unit: 'lbs', price: 2.49, deliveryCost: 7.00, image: 'https://images.unsplash.com/photo-1557800636-8c1056a29f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY5fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080' },
    { id: 3, name: 'Wheat', category: 'Grains', quantity: 75, unit: 'jars', price: 12.00, deliveryCost: 4.50, image: 'https://images.unsplash.com/photo-1627076465492-c2084c8d5789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTY5fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=1080' },
];

const InputField = ({ label, name, type = 'text', value, onChange, min }) => (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                min={min}
                step={type === 'number' && name !== 'quantity' ? "0.01" : "1"}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#bd9476] focus:border-[#bd9476] transition text-[#4f3d2a]"
            />
        </div>
    );

// 2.1. Stock List Component
const StockList = ({ stock, onViewDetails }) => (
    <div className="space-y-4">
        {stock.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-xl shadow-md">
                <p className="text-xl font-medium text-gray-600">Your stock is currently empty. Start adding products! 🛒</p>
            </div>
        ) : (
            stock.map(product => (
                <div 
                    key={product.id}
                    onClick={() => onViewDetails(product)}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-[#fcfaf8] cursor-pointer transition duration-200"
                >
                    <div className="flex items-center space-x-4">
                        <img 
                            src={product.image || 'https://via.placeholder.com/50'} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                            <p className="font-bold text-[#4f3d2a]">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-green-700">{product.quantity} {product.unit}</p>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)} / {product.unit}</p>
                    </div>
                </div>
            ))
        )}
    </div>
);

// 2.2. Add Product Form Component
const AddProductForm = ({ onAddProduct }) => {
    const email = localStorage.getItem("email");
    const [formData, setFormData] = useState({
        name: 'Select Crop',
        quantity: 1,
        unit: 'units',
        price: 0.01,
        deliveryCost: 0.00,
    });

    // Update the unit whenever a crop name is selected
    const handleCropChange = (e) => {
        const selectedCrop = CropData.find(crop => crop.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            name: e.target.value,
            unit: selectedCrop ? selectedCrop.defaultUnit : 'units'
        }));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (formData.name === 'Select Crop' || formData.quantity <= 0 || formData.price <= 0) {
    //         alert('Please fill out all fields with valid values.');
    //         return;
    //     }
        
    //     // Simulating the addition logic
    //     const newProduct = {
    //         ...formData,
    //         id: Date.now(), // Unique ID
    //         // In a real app, you would fetch the image and category based on the name
    //         image: 'https://via.placeholder.com/150?text=New+Crop', 
    //         category: CropData.find(c => c.name === formData.name)?.category || 'Unknown',
    //     };
    //     onAddProduct(newProduct);
    //     alert(`${newProduct.name} added to stock!`);
    // };

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.name === 'Select Crop' || formData.quantity <= 0 || formData.price <= 0) {
    alert('Please fill out all fields with valid values.');
    return;
  }

  const email = localStorage.getItem("email"); // 👈 get farmer’s email
  if (!email) {
    alert("Farmer email not found. Please login again.");
    return;
  }

  const newProduct = {
    name: formData.name,
    farmer: email, // 👈 attach farmer email here
    quantity: formData.quantity,
    unit: formData.unit,
    market_price: formData.price,
    delivery_charge: formData.deliveryCost,
  };

  try {
    const response = await fetch("http://localhost:5000/api/crops/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`${data.crop.name} added successfully!`);
      onAddProduct({
        ...formData,
        id: Date.now(),
        farmer: email,
        image: 'https://via.placeholder.com/150?text=New+Crop',
        category: CropData.find(c => c.name === formData.name)?.category || 'Unknown',
      });
    } else {
      alert(data.message || "Failed to add crop. Try again.");
    }
  } catch (err) {
    console.error("Error adding crop:", err);
    alert("Something went wrong while adding the crop.");
  }
};


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-[#efebe7] max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#4f3d2a] mb-6 border-b pb-3">List New Produce</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name (Dropdown Select) */}
                <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Crop Name
                    </label>
                    <select
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleCropChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-[#bd9476] focus:border-[#bd9476] transition text-[#4f3d2a]"
                    >
                        {CropData.map(crop => (
                            <option 
                                key={crop.name} 
                                value={crop.name} 
                                disabled={crop.name === 'Select Crop'}
                            >
                                {crop.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity and Unit */}
                <InputField label="Quantity in Stock" name="quantity" type="number" value={formData.quantity} min={1} />
                <InputField label="Unit (e.g., lbs, kg, dozen)" name="unit" value={formData.unit} onChange={handleChange} />
                
                {/* Price and Delivery Cost */}
                <InputField
                label="Market Price (Rs)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                min={0.01}
                readOnly
                />
                <InputField label="Delivery Cost (Rs)" name="deliveryCost" type="number" value={formData.deliveryCost} onChange={handleChange} min={0.00} />
            </div>
           
            <div className="flex justify-center">
        <button
            type="submit"
            className="mt-8 w-72 py-3 h-10 bg-[#4f3d2a] text-white text-center text-lg font-bold rounded-lg hover:bg-green-700 transition duration-150 shadow-md flex items-center justify-center"
        >
            <Plus className="w-5 h-5 mr-2" />
            Add Product to Stock
        </button>
    </div>
        </form>
    );
};

// 2.3. Product Details/Edit View
const ProductDetailsView = ({ product, onEdit, onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(product);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSave = () => {
        onEdit(editData);
        setIsEditing(false);
        alert(`${editData.name} updated successfully!`);
    };

    const InputField = ({ label, name, type = 'text', value, onChange, disabled, min }) => (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                min={min}
                step={type === 'number' && name !== 'quantity' ? "0.01" : "1"}
                disabled={disabled}
                className={`w-full p-3 border rounded-lg transition text-[#4f3d2a] ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white border-gray-300 focus:ring-[#bd9476] focus:border-[#bd9476]'}`}
            />
        </div>
    );


    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10 border border-[#efebe7] max-w-4xl mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center text-[#4f3d2a] hover:text-[#bd9476] mb-6 font-semibold transition"
            >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Stock List
            </button>

            <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                {/* Left: Image and Core Info */}
                <div>
                    <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                        <img 
                            src={product.image || 'https://via.placeholder.com/400'} 
                            alt={product.name} 
                            className="w-full h-64 object-cover" 
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-[#4f3d2a] mb-2">{product.name}</h1>
                    <p className="text-xl font-extrabold text-green-700 mb-4">
                        ${product.price.toFixed(2)} <span className="text-lg font-normal text-gray-500">/{product.unit}</span>
                    </p>
                    <p className="text-sm text-gray-500">Category: {product.category}</p>
                </div>

                {/* Right: Details and Edit Form */}
                <div className="mt-8 lg:mt-0 lg:border-l lg:pl-10 pt-4 border-t lg:border-t-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#4f3d2a]">Product Management</h2>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 font-bold rounded-lg transition ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#bd9476] text-white hover:bg-[#a68269]'}`}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Details'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <InputField label="Crop Name" name="name" value={editData.name} disabled={true} />
                        <InputField label="Category" name="category" value={editData.category} disabled={true} />
                        
                        <div className="flex space-x-4">
                            <InputField label={`Quantity in Stock (${editData.unit})`} name="quantity" type="number" value={editData.quantity} onChange={handleChange} disabled={!isEditing} min={0} />
                            <InputField label="Unit" name="unit" value={editData.unit} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        
                        <div className="flex space-x-4">
                            <InputField label="Market Price ($)" name="price" type="number" value={editData.price} onChange={handleChange} disabled={!isEditing} min={0.01} />
                            <InputField label="Delivery Cost ($)" name="deliveryCost" type="number" value={editData.deliveryCost} onChange={handleChange} disabled={!isEditing} min={0.00} />
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};


// 3. Main Dashboard Component
const MyProductsPage = () => {
    // 'stock' or 'add'
    const [activeView, setActiveView] = useState('stock'); 
    const [stockData, setStockData] = useState(FARMER_STOCK); // State for the editable product list
    const [selectedProduct, setSelectedProduct] = useState(null); // Product selected for details view

    const handleAddProduct = (newProduct) => {
        setStockData(prevStock => [newProduct, ...prevStock]);
        setActiveView('stock'); // Switch back to stock list after adding
    };

    const handleEditProduct = (updatedProduct) => {
        setStockData(prevStock => 
            prevStock.map(p => p.id === updatedProduct.id ? updatedProduct : p)
        );
        setSelectedProduct(updatedProduct); // Update the currently selected product view
    };

    // If a product is selected, show the details view
    if (selectedProduct) {
        return (
            <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
                <ProductDetailsView 
                    product={selectedProduct} 
                    onEdit={handleEditProduct} 
                    onBack={() => setSelectedProduct(null)} 
                />
            </div>
        );
    }
    
    // Otherwise, show the main dashboard
    return (
        <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#4f3d2a] mb-2">
                        Farmer Dashboard
                    </h1>
                    <p className="text-xl text-gray-500">
                        Manage your inventory and list new produce.
                    </p>
                </header>

                {/* Toggle Bar */}
                <div className="flex justify-center mb-10 p-1 bg-white rounded-xl shadow-lg border border-[#efebe7] max-w-sm mx-auto">
                    <button
                        onClick={() => setActiveView('stock')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                            activeView === 'stock' ? 'bg-[#bd9476] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Archive className="w-5 h-5" />
                        <span>Stock Products</span>
                    </button>
                    <button
                        onClick={() => setActiveView('add')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                            activeView === 'add' ? 'bg-[#bd9476] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Products</span>
                    </button>
                </div>

                {/* Content View */}
                {activeView === 'stock' ? (
                    <StockList stock={stockData} onViewDetails={setSelectedProduct} />
                ) : (
                    <AddProductForm onAddProduct={handleAddProduct} />
                )}

            </div>
        </div>
    );
};

export default MyProductsPage;