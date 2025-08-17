import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  MapPin,
  MoreHorizontal,
  ArrowLeft,
  Package,
  Plus,
  Minus,
  Edit
} from 'lucide-react';

const SalesmanDashboard = () => {
  // Random shop data with different colors and inventory
  const shops = [
    {
      id: 1,
      name: "Metro Mart",
      location: "Downtown",
      status: "Active",
      type: "Supermarket",
      color: "from-pink-500 to-rose-500",
      icon: Store,
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-500",
      items: [
        { 
          name: "Biscuits", 
          color: "bg-gradient-to-r from-red-400 to-red-600",
          stock: "Low Stock",
          stockColor: "text-white",
          details: [
            { name: "Oreo Cookies", availableQty: 15, requestQty: 0, price: 2.50 },
            { name: "Digestive Biscuits", availableQty: 8, requestQty: 0, price: 3.00 },
            { name: "Chocolate Chips", availableQty: 12, requestQty: 0, price: 4.00 }
          ]
        },
        { 
          name: "Milk", 
          color: "bg-gradient-to-r from-blue-400 to-blue-600",
          stock: "High Stock",
          stockColor: "text-white",
          details: [
            { name: "Full Fat Milk 1L", availableQty: 45, requestQty: 0, price: 1.20 },
            { name: "Skimmed Milk 1L", availableQty: 38, requestQty: 0, price: 1.15 },
            { name: "Chocolate Milk", availableQty: 22, requestQty: 0, price: 1.80 }
          ]
        },
        { 
          name: "Bread", 
          color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
          stock: "Medium Stock",
          stockColor: "text-white",
          details: [
            { name: "White Bread", availableQty: 25, requestQty: 0, price: 1.50 },
            { name: "Brown Bread", availableQty: 18, requestQty: 0, price: 1.80 },
            { name: "Whole Wheat", availableQty: 15, requestQty: 0, price: 2.00 }
          ]
        },
        { 
          name: "Rice", 
          color: "bg-gradient-to-r from-green-400 to-green-600",
          stock: "High Stock",
          stockColor: "text-white",
          details: [
            { name: "Basmati Rice 5kg", availableQty: 30, requestQty: 0, price: 12.00 },
            { name: "Jasmine Rice 2kg", availableQty: 25, requestQty: 0, price: 6.50 },
            { name: "Brown Rice 1kg", availableQty: 20, requestQty: 0, price: 4.00 }
          ]
        },
        { 
          name: "Oil", 
          color: "bg-gradient-to-r from-orange-400 to-orange-600",
          stock: "Low Stock",
          stockColor: "text-white",
          details: [
            { name: "Sunflower Oil 1L", availableQty: 8, requestQty: 0, price: 3.50 },
            { name: "Olive Oil 500ml", availableQty: 5, requestQty: 0, price: 8.00 },
            { name: "Coconut Oil 750ml", availableQty: 12, requestQty: 0, price: 5.50 }
          ]
        },
        { 
          name: "Sugar", 
          color: "bg-gradient-to-r from-pink-400 to-pink-600",
          stock: "Medium Stock",
          stockColor: "text-white",
          details: [
            { name: "White Sugar 1kg", availableQty: 20, requestQty: 0, price: 1.20 },
            { name: "Brown Sugar 500g", availableQty: 15, requestQty: 0, price: 2.00 },
            { name: "Caster Sugar 1kg", availableQty: 10, requestQty: 0, price: 1.50 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Green Valley Store", 
      location: "Suburbs",
      status: "Active",
      type: "Grocery",
      color: "from-emerald-500 to-green-500",
      icon: ShoppingBag,
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-500",
      items: [
        { 
          name: "Vegetables", 
          color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
          stock: "High Stock",
          stockColor: "text-white",
          details: [
            { name: "Tomatoes", availableQty: 50, requestQty: 0, price: 2.00 },
            { name: "Onions", availableQty: 45, requestQty: 0, price: 1.50 },
            { name: "Carrots", availableQty: 35, requestQty: 0, price: 1.80 }
          ]
        },
        { 
          name: "Fruits", 
          color: "bg-gradient-to-r from-orange-400 to-orange-600",
          stock: "Medium Stock",
          stockColor: "text-white",
          details: [
            { name: "Apples", availableQty: 25, requestQty: 0, price: 3.00 },
            { name: "Bananas", availableQty: 30, requestQty: 0, price: 1.20 },
            { name: "Oranges", availableQty: 20, requestQty: 0, price: 2.50 }
          ]
        },
        { 
          name: "Dairy", 
          color: "bg-gradient-to-r from-blue-400 to-blue-600",
          stock: "Low Stock",
          stockColor: "text-white",
          details: [
            { name: "Cheese", availableQty: 8, requestQty: 0, price: 4.50 },
            { name: "Yogurt", availableQty: 12, requestQty: 0, price: 1.80 },
            { name: "Butter", availableQty: 6, requestQty: 0, price: 3.20 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "City Electronics",
      location: "Mall District", 
      status: "Active",
      type: "Electronics",
      color: "from-blue-500 to-cyan-500",
      icon: TrendingUp,
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
      items: [
        { 
          name: "Smartphones", 
          color: "bg-gradient-to-r from-slate-400 to-slate-600",
          stock: "Medium Stock",
          stockColor: "text-white",
          details: [
            { name: "iPhone 15", availableQty: 15, requestQty: 0, price: 999.00 },
            { name: "Samsung Galaxy S24", availableQty: 12, requestQty: 0, price: 849.00 },
            { name: "Google Pixel 8", availableQty: 8, requestQty: 0, price: 699.00 }
          ]
        },
        { 
          name: "Laptops", 
          color: "bg-gradient-to-r from-gray-400 to-gray-600",
          stock: "Low Stock",
          stockColor: "text-white",
          details: [
            { name: "MacBook Air", availableQty: 5, requestQty: 0, price: 1299.00 },
            { name: "Dell XPS 13", availableQty: 3, requestQty: 0, price: 1099.00 },
            { name: "HP Pavilion", availableQty: 7, requestQty: 0, price: 799.00 }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Fashion Hub",
      location: "Shopping Center",
      status: "Active",
      type: "Fashion",
      color: "from-purple-500 to-violet-500",
      icon: Users,
      bgColor: "bg-gradient-to-br from-purple-500 to-violet-500",
      items: [
        { 
          name: "T-Shirts", 
          color: "bg-gradient-to-r from-pink-400 to-pink-600",
          stock: "High Stock",
          stockColor: "text-white",
          details: [
            { name: "Cotton T-Shirt M", availableQty: 40, requestQty: 0, price: 15.00 },
            { name: "V-Neck T-Shirt L", availableQty: 35, requestQty: 0, price: 18.00 },
            { name: "Graphic Tee XL", availableQty: 25, requestQty: 0, price: 22.00 }
          ]
        },
        { 
          name: "Jeans", 
          color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
          stock: "Medium Stock",
          stockColor: "text-white",
          details: [
            { name: "Slim Fit Jeans 32", availableQty: 18, requestQty: 0, price: 45.00 },
            { name: "Straight Leg 34", availableQty: 22, requestQty: 0, price: 40.00 },
            { name: "Skinny Jeans 30", availableQty: 15, requestQty: 0, price: 50.00 }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Corner Grocery",
      location: "Residential",
      status: "Active",
      type: "Mini Market",
      color: "from-orange-500 to-amber-500", 
      icon: MapPin,
      bgColor: "bg-gradient-to-br from-orange-500 to-amber-500",
      items: [
        { 
          name: "Chips", 
          color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
          stock: "High Stock",
          stockColor: "text-white",
          details: [
            { name: "Lays Classic", availableQty: 30, requestQty: 0, price: 1.50 },
            { name: "Doritos", availableQty: 25, requestQty: 0, price: 2.00 },
            { name: "Pringles", availableQty: 20, requestQty: 0, price: 2.50 }
          ]
        },
        { 
          name: "Cold Drinks", 
          color: "bg-gradient-to-r from-blue-400 to-blue-600",
          stock: "Low Stock",
          stockColor: "text-white",
          details: [
            { name: "Coca Cola", availableQty: 8, requestQty: 0, price: 1.25 },
            { name: "Pepsi", availableQty: 6, requestQty: 0, price: 1.25 },
            { name: "Sprite", availableQty: 10, requestQty: 0, price: 1.20 }
          ]
        }
      ]
    }
  ];

  const [selectedShop, setSelectedShop] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setShowInventory(true);
  };

  const handleBackToShops = () => {
    setShowInventory(false);
    setSelectedShop(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setItemDetails(item.details);
    setShowItemDetails(true);
  };

  const handleBackToItems = () => {
    setShowItemDetails(false);
    setSelectedItem(null);
  };

  const updateRequestQuantity = (index, newQuantity) => {
    const updatedDetails = [...itemDetails];
    if (newQuantity >= 0 && newQuantity <= updatedDetails[index].availableQty) {
      updatedDetails[index].requestQty = newQuantity;
      setItemDetails(updatedDetails);
    }
  };

  const addNewItem = () => {
    const newItem = {
      name: "New Item",
      availableQty: 0,
      requestQty: 0,
      price: 0.00
    };
    setItemDetails([...itemDetails, newItem]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {!showInventory && !showItemDetails ? (
        <>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Salesman Shop</h1>
            <p className="text-blue-200 text-lg">Manage your assigned shops</p>
          </div>

          {/* Shop Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => {
                const IconComponent = shop.icon;
                return (
                  <div
                    key={shop.id}
                    onClick={() => handleShopClick(shop)}
                    className={`${shop.bgColor} rounded-3xl p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <MoreHorizontal size={24} />
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="bg-white/20 rounded-2xl p-4 w-fit backdrop-blur-sm">
                        <IconComponent size={32} />
                      </div>
                    </div>
                    
                    {/* Shop Info */}
                    <div>
                      <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                      <p className="text-white/80 text-sm mb-1">{shop.location}</p>
                      <p className="text-white/70 text-xs mb-1">{shop.type}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{shop.status}</span>
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : showInventory && !showItemDetails ? (
        /* Shop Items View */
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBackToShops}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl p-3 mr-4 text-white transition-all duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Shop Items</h1>
              <p className="text-blue-200">Browse available categories</p>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedShop?.items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`${item.color} rounded-2xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
              >
                <div className="text-center">
                  <div className="bg-white/20 rounded-xl p-3 w-fit mx-auto mb-3 backdrop-blur-sm">
                    <Package size={24} />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                  <p className={`text-sm font-medium ${item.stockColor}`}>{item.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Item Details Table View */
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={handleBackToItems}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl p-3 mr-4 text-white transition-all duration-300"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedItem?.name}</h1>
                <p className={`text-lg ${selectedItem?.stockColor}`}>{selectedItem?.stock}</p>
              </div>
            </div>
            <button
              onClick={addNewItem}
              className="bg-green-500 hover:bg-green-600 rounded-2xl px-6 py-3 text-white font-medium transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Item
            </button>
          </div>

          {/* Items Table */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left text-white font-semibold p-4 border-b border-white/10">Item Name</th>
                    <th className="text-left text-white font-semibold p-4 border-b border-white/10">Available in Shop</th>
                    <th className="text-left text-white font-semibold p-4 border-b border-white/10">Salesman Request</th>
                    <th className="text-left text-white font-semibold p-4 border-b border-white/10">Price ($)</th>
                    <th className="text-left text-white font-semibold p-4 border-b border-white/10">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {itemDetails.map((detail, index) => (
                    <tr key={index} className="hover:bg-white/5">
                      <td className="text-white p-4 border-b border-white/5">
                        <input
                          type="text"
                          value={detail.name}
                          onChange={(e) => {
                            const updated = [...itemDetails];
                            updated[index].name = e.target.value;
                            setItemDetails(updated);
                          }}
                          className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/20 focus:border-white/40 focus:outline-none"
                        />
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <span className="text-blue-400 font-medium">{detail.availableQty}</span>
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateRequestQuantity(index, detail.requestQty - 1)}
                            className="bg-red-500/20 hover:bg-red-500/30 rounded-lg p-2 text-red-400 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-3 font-medium min-w-[3ch] text-center text-yellow-400">{detail.requestQty}</span>
                          <button
                            onClick={() => updateRequestQuantity(index, detail.requestQty + 1)}
                            className="bg-green-500/20 hover:bg-green-500/30 rounded-lg p-2 text-green-400 transition-colors"
                            disabled={detail.requestQty >= detail.availableQty}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        {detail.requestQty >= detail.availableQty && detail.availableQty > 0 && (
                          <p className="text-xs text-red-400 mt-1">Max limit reached</p>
                        )}
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <input
                          type="number"
                          step="0.01"
                          value={detail.price}
                          onChange={(e) => {
                            const updated = [...itemDetails];
                            updated[index].price = parseFloat(e.target.value) || 0;
                            setItemDetails(updated);
                          }}
                          className="bg-white/10 text-white rounded-lg px-3 py-2 w-24 border border-white/20 focus:border-white/40 focus:outline-none"
                        />
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <button
                          onClick={() => {
                            const updated = itemDetails.filter((_, i) => i !== index);
                            setItemDetails(updated);
                          }}
                          className="bg-red-500/20 hover:bg-red-500/30 rounded-lg px-4 py-2 text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
              <h4 className="font-semibold mb-2">Requested Items</h4>
              <p className="text-2xl font-bold text-yellow-400">
                {itemDetails.reduce((sum, item) => sum + item.requestQty, 0)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
              <h4 className="font-semibold mb-2">Request Value</h4>
              <p className="text-2xl font-bold text-purple-400">
                ${itemDetails.reduce((sum, item) => sum + (item.requestQty * item.price), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesmanDashboard;