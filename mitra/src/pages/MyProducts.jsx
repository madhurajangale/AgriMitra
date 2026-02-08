import React, { useState, useEffect } from 'react';
import { Plus, Archive } from 'lucide-react';
import CropData from '../../CropData';

/* Generic Input Field */
const InputField = ({ label, name, type = 'text', value, onChange, min, disabled, readOnly }) => (
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
      readOnly={readOnly}
      disabled={disabled}
      step={type === 'number' && name !== 'quantity' ? '0.01' : '1'}
      required
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#bd9476] focus:border-[#bd9476] transition text-[#4f3d2a]"
    />
  </div>
);

/* Stock List */
const StockList = ({ stock = [], onViewDetails }) => (
  <div className="space-y-4">
    {stock.length === 0 ? (
      <div className="text-center p-12 bg-white rounded-xl shadow-md">
        <p className="text-xl font-medium text-gray-600">Your stock is currently empty. Start adding products! 🛒</p>
      </div>
    ) : (
      stock.map((product) => {
        const qty = Number(product.quantity ?? 0);
        const unitPrice = Number(product.market_price ?? product.price ?? product.marketPrice ?? 0);
        const delivery = Number(product.delivery_charge ?? product.deliveryCost ?? 0);
        const totalPrice = qty * unitPrice + delivery;

        return (
          <div
            key={product._id || product.id}
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-[#fefaf7] cursor-pointer transition duration-200"
          >
            <div className="flex items-center space-x-4">
              
              <div>
                <p className="font-bold text-[#3b2f1e] capitalize">{product.name || 'Unnamed Crop'}</p>
                <p className="text-sm text-gray-500">
                  {qty} {product.unit || 'units'} • ₹{unitPrice.toFixed(2)} / {product.unit || 'unit'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-green-700">₹{totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Delivery: ₹{delivery.toFixed(2)}</p>
            </div>
          </div>
        );
      })
    )}
  </div>
);

/* Add Product Form */
const AddProductForm = ({ onAddProduct }) => {
  const email = localStorage.getItem('email') || '';
  const [formData, setFormData] = useState({
    name: 'Select Crop',
    quantity: 1,
    unit: 'units',
    price: 0,
    deliveryCost: 0.0,
  });

  const [localStock, setLocalStock] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!email) {
        setErrorLocal('Farmer not logged in.');
        return;
      }
      try {
        setLoadingLocal(true);
        const response = await fetch(`http://localhost:5000/api/crops?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setLocalStock(data);
        } else {
          setLocalStock([]);
          setErrorLocal(data.message || 'Failed to fetch products.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setErrorLocal('');
      } finally {
        setLoadingLocal(false);
      }
    };

    fetchProducts();
  }, [email]);

  const handleCropChange = (e) => {
    const selectedName = e.target.value;
    const selectedCrop = Array.isArray(CropData) ? CropData.find((c) => c.name === selectedName) : null;
    setFormData((prev) => ({
      ...prev,
      name: selectedName,
      unit: selectedCrop ? selectedCrop.defaultUnit || 'units' : 'units',
      price: selectedCrop ? selectedCrop.price ?? prev.price : prev.price,
    }));
  };

const handleChange = (e) => {
  const { name, value, type } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "number"
        ? value === ""
          ? ""
          : parseInt(value, 10)
        : value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === 'Select Crop' || formData.quantity <= 0 || formData.price <= 0) {
      alert('Please fill out all fields with valid values.');
      return;
    }
    if (!email) {
      alert('Farmer email not found. Please login again.');
      return;
    }

    

    const newProduct = {
      name: formData.name,
      farmer: email,
      quantity: formData.quantity,
      unit: formData.unit,
      market_price: formData.price,
      delivery_charge: formData.deliveryCost,
     
      category: CropData.find((c) => c.name === formData.name)?.category || 'Unknown',
    };

    try {
      const response = await fetch('http://localhost:5000/api/crops/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`${data.crop?.name || newProduct.name} added successfully!`);
        onAddProduct({ ...newProduct, id: data.crop?._id ?? Date.now() });
        // reset form
        setFormData((prev) => ({ ...prev, name: 'Select Crop', quantity: 1, price: 0, deliveryCost: 0}));
      } else {
        alert(data.message || 'Failed to add crop. Try again.');
      }
    } catch (err) {
      console.error('Error adding crop:', err);
      alert('Something went wrong while adding the crop.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-[#efebe7] max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4f3d2a] mb-6 border-b pb-3">List New Produce</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <option value="Select Crop">Select Crop</option>
            {Array.isArray(CropData) &&
              CropData.map((crop) => (
                <option key={crop.name} value={crop.name}>
                  {crop.name}
                </option>
              ))}
          </select>
        </div>

        <InputField label="Quantity in Stock" name="quantity" type="number" value={formData.quantity} onChange={handleChange} min={1} />
        <InputField label="Unit (e.g., lbs, kg, dozen)" name="unit" value={formData.unit} onChange={handleChange} />

        <InputField label="Market Price (Rs)" name="price" type="number" value={formData.price} onChange={handleChange} min={1} />
        <InputField label="Delivery Cost (Rs)" name="deliveryCost" type="number" value={formData.deliveryCost} onChange={handleChange} min={1} />
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
      {errorLocal && <p className="mt-3 text-red-500 text-sm">{errorLocal}</p>}
      {loadingLocal && <p className="mt-3 text-gray-500 text-sm">Loading your existing products...</p>}
    </form>
  );
};

/* Product Details / Edit View */
const ProductDetailsView = ({ product, onEdit, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...product });

  useEffect(() => {
    setEditData({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setEditData((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };

const handleSave = async () => {
  try {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Farmer not logged in");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/crops/update/${encodeURIComponent(email)}/${encodeURIComponent(editData.name)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: editData.quantity,
          unit: editData.unit,
          market_price: editData.market_price,
          delivery_charge: editData.delivery_charge,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      onEdit(data.crop);   // update UI state
      setIsEditing(false);
      alert("Crop updated successfully!");
    } else {
      alert(data.message || "Failed to update crop");
    }
  } catch (error) {
    console.error("Update crop error:", error);
    alert("Something went wrong while updating crop");
  }
};



  const DetailInput = ({ label, name, type = 'text', value, onChange, disabled, min }) => (
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
        step={type === 'number' && name !== 'quantity' ? '0.01' : '1'}
        disabled={disabled}
        className={`w-full p-3 border rounded-lg transition text-[#4f3d2a] ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white border-gray-300 focus:ring-[#bd9476] focus:border-[#bd9476]'}`}
      />
    </div>
  );

  const displayPrice = (editData.market_price ?? editData.price ?? editData.marketPrice ?? 0);

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10 border border-[#efebe7] max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center text-[#4f3d2a] hover:text-[#bd9476] mb-6 font-semibold transition">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Stock List
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="rounded-lg overflow-hidden shadow-xl mb-6">
            
          </div>
          <h1 className="text-3xl font-bold text-[#4f3d2a] mb-2">{editData.name}</h1>
          <p className="text-xl font-extrabold text-green-700 mb-4">₹{displayPrice.toFixed(2)} <span className="text-lg font-normal text-gray-500">/{editData.unit}</span></p>
          <p className="text-sm text-gray-500">Category: {editData.category}</p>
        </div>

        <div className="mt-8 lg:mt-0 lg:border-l lg:pl-10 pt-4 border-t lg:border-t-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#4f3d2a]">Product Management</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-4 py-2 font-bold rounded-lg transition ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-[#bd9476] text-white hover:bg-[#a68269]'}`}
            >
              {isEditing ? 'Save Changes' : 'Edit Details'}
            </button>
          </div>

          <div className="space-y-4">
            <DetailInput label="Crop Name" name="name" value={editData.name} disabled={true} />
            <DetailInput label="Category" name="category" value={editData.category} disabled={true} />

            <div className="flex space-x-4">
              <DetailInput label={`Quantity in Stock (${editData.unit})`} name="quantity" type="number" value={editData.quantity} onChange={handleChange} disabled={!isEditing} min={0} />
              <DetailInput label="Unit" name="unit" value={editData.unit} onChange={handleChange} disabled={!isEditing} />
            </div>

            <div className="flex space-x-4">
              <DetailInput label="Market Price (₹)" name="market_price" type="number" value={editData.market_price ?? editData.price ?? 0} onChange={handleChange} disabled={!isEditing} min={0} />
              <DetailInput label="Delivery Cost (₹)" name="delivery_charge" type="number" value={editData.delivery_charge ?? editData.deliveryCost ?? 0} onChange={handleChange} disabled={!isEditing} min={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyProductsPage = () => {
  const [activeView, setActiveView] = useState('stock');
  const [stockData, setStockData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const email = localStorage.getItem('email') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      if (!email) {
        setError('Farmer not logged in.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/crops/get_All?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setStockData(data);
        } else {
          setStockData([]);
          setError(data.message || 'Failed to fetch products.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Something went wrong while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [email]);

  const handleAddProduct = (newProduct) => {
    setStockData((prevStock) => [newProduct, ...prevStock]);
    setActiveView('stock');
  };

  const handleEditProduct = (updatedProduct) => {
    setStockData((prevStock) => prevStock.map((p) => (p._id === updatedProduct._id || p.id === updatedProduct.id ? updatedProduct : p)));
    setSelectedProduct(updatedProduct);
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
        <ProductDetailsView product={selectedProduct} onEdit={handleEditProduct} onBack={() => setSelectedProduct(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4f1] font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#4f3d2a] mb-2">Farmer Dashboard</h1>
          <p className="text-xl text-gray-500">Manage your inventory and list new produce.</p>
        </header>

        <div className="flex justify-center mb-10 p-1 bg-white rounded-xl shadow-lg border border-[#efebe7] max-w-sm mx-auto">
          <button
            onClick={() => setActiveView('stock')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${activeView === 'stock' ? 'bg-[#bd9476] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Archive className="w-5 h-5" />
            <span>Stock Products</span>
          </button>
          <button
            onClick={() => setActiveView('add')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${activeView === 'add' ? 'bg-[#bd9476] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Products</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">Loading...</div>
        ) : error ? (
          <div className="text-center py-6 bg-red-50 border border-red-200 rounded-xl text-red-600">{error}</div>
        ) : activeView === 'stock' ? (
          <StockList stock={stockData} onViewDetails={setSelectedProduct} />
        ) : (
          <AddProductForm onAddProduct={handleAddProduct} />
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;