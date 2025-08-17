import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  MapPin,
  MoreHorizontal,
  ArrowLeft,
  Plus,
  Minus,
  X,
  Edit
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        { name: "Oreo Cookies", availableQty: 15, requestQty: 0, price: 2.50 },
        { name: "Digestive Biscuits", availableQty: 8, requestQty: 0, price: 3.00 },
        { name: "Chocolate Chips", availableQty: 12, requestQty: 0, price: 4.00 }
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
        { name: "Tomatoes", availableQty: 50, requestQty: 0, price: 2.00 },
        { name: "Onions", availableQty: 45, requestQty: 0, price: 1.50 },
        { name: "Carrots", availableQty: 35, requestQty: 0, price: 1.80 },
        { name: "Apples", availableQty: 25, requestQty: 0, price: 3.00 },
        { name: "Bananas", availableQty: 30, requestQty: 0, price: 1.20 },
        { name: "Cheese", availableQty: 8, requestQty: 0, price: 4.50 }
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
        { name: "iPhone 15", availableQty: 15, requestQty: 0, price: 999.00 },
        { name: "Samsung Galaxy S24", availableQty: 12, requestQty: 0, price: 849.00 },
        { name: "MacBook Air", availableQty: 5, requestQty: 0, price: 1299.00 },
        { name: "Dell XPS 13", availableQty: 3, requestQty: 0, price: 1099.00 }
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
        { name: "Cotton T-Shirt M", availableQty: 40, requestQty: 0, price: 15.00 },
        { name: "V-Neck T-Shirt L", availableQty: 35, requestQty: 0, price: 18.00 },
        { name: "Slim Fit Jeans 32", availableQty: 18, requestQty: 0, price: 45.00 },
        { name: "Straight Leg 34", availableQty: 22, requestQty: 0, price: 40.00 }
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
        { name: "Lays Classic", availableQty: 30, requestQty: 0, price: 1.50 },
        { name: "Doritos", availableQty: 25, requestQty: 0, price: 2.00 },
        { name: "Coca Cola", availableQty: 8, requestQty: 0, price: 1.25 },
        { name: "Pepsi", availableQty: 6, requestQty: 0, price: 1.25 }
      ]
    }
  ];

  const [selectedShop, setSelectedShop] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [selectedItemForMobile, setSelectedItemForMobile] = useState(null);
  const [showMobileDialog, setShowMobileDialog] = useState(false);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    setItemDetails([...shop.items]);
    setShowInventory(true);
  };

  const handleBackToShops = () => {
    setShowInventory(false);
    setSelectedShop(null);
    setItemDetails([]);
  };

  const updateRequestQuantity = (index, newQuantity) => {
    const updatedDetails = [...itemDetails];
    if (newQuantity >= 0 && newQuantity <= updatedDetails[index].availableQty) {
      updatedDetails[index].requestQty = newQuantity;
      setItemDetails(updatedDetails);
    }
  };

  const updateItemField = (index, field, value) => {
    const updatedDetails = [...itemDetails];
    updatedDetails[index][field] = value;
    setItemDetails(updatedDetails);
  };

  const deleteItem = (index) => {
    const updatedDetails = itemDetails.filter((_, i) => i !== index);
    setItemDetails(updatedDetails);
    setShowMobileDialog(false);
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

  const handleMobileItemClick = (item, index) => {
    setSelectedItemForMobile({ ...item, index });
    setShowMobileDialog(true);
  };

  const updateMobileItem = (field, value) => {
    const updatedItem = { ...selectedItemForMobile, [field]: value };
    setSelectedItemForMobile(updatedItem);
    
    // Update the main items array
    const updatedDetails = [...itemDetails];
    updatedDetails[selectedItemForMobile.index] = { ...updatedItem };
    delete updatedDetails[selectedItemForMobile.index].index;
    setItemDetails(updatedDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-6">
      {!showInventory ? (
        <>
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Salesman Shop</h1>
            <p className="text-blue-200 text-base md:text-lg">Manage your assigned shops</p>
          </div>

          {/* Shop Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {shops.map((shop) => {
                const IconComponent = shop.icon;
                return (
                  <div
                    key={shop.id}
                    onClick={() => handleShopClick(shop)}
                    className={`${shop.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden group`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <MoreHorizontal size={24} />
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-4 md:mb-6">
                      <div className="bg-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 w-fit backdrop-blur-sm">
                        <IconComponent size={28} className="md:w-8 md:h-8" />
                      </div>
                    </div>
                    
                    {/* Shop Info */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{shop.name}</h3>
                      <p className="text-white/80 text-sm mb-1">{shop.location}</p>
                      <p className="text-white/70 text-xs mb-1">{shop.type}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">{shop.status}</span>
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl md:rounded-3xl"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Inventory Table View */
        <div className="max-w-6xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center">
              <button
                onClick={handleBackToShops}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-2 md:p-3 mr-3 md:mr-4 text-white transition-all duration-300"
              >
                <ArrowLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{selectedShop?.name}</h1>
                <p className="text-blue-200 text-sm md:text-base">Low Stock</p>
              </div>
            </div>
            <Button
              onClick={addNewItem}
              className="bg-green-500 hover:bg-green-600 rounded-xl md:rounded-2xl px-4 md:px-6 py-2 md:py-3 text-white font-medium transition-colors text-sm md:text-base"
            >
              <Plus size={16} className="mr-1 md:mr-2 md:w-5 md:h-5" />
              Add Item
            </Button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
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
                        <Input
                          type="text"
                          value={detail.name}
                          onChange={(e) => updateItemField(index, 'name', e.target.value)}
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
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <Input
                          type="number"
                          step="0.01"
                          value={detail.price}
                          onChange={(e) => updateItemField(index, 'price', parseFloat(e.target.value) || 0)}
                          className="bg-white/10 text-white rounded-lg px-3 py-2 w-24 border border-white/20 focus:border-white/40 focus:outline-none"
                        />
                      </td>
                      <td className="text-white p-4 border-b border-white/5">
                        <Button
                          onClick={() => deleteItem(index)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile List View */}
          <div className="md:hidden space-y-3">
            {itemDetails.map((detail, index) => (
              <div
                key={index}
                onClick={() => handleMobileItemClick(detail, index)}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium text-lg">{detail.name}</h3>
                    <p className="text-blue-400 text-sm">Available: {detail.availableQty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-medium">Request: {detail.requestQty}</p>
                    <p className="text-white text-sm">${detail.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-white border border-white/20">
              <h4 className="font-semibold mb-2">Requested Items</h4>
              <p className="text-xl md:text-2xl font-bold text-yellow-400">
                {itemDetails.reduce((sum, item) => sum + item.requestQty, 0)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 text-white border border-white/20">
              <h4 className="font-semibold mb-2">Request Value</h4>
              <p className="text-xl md:text-2xl font-bold text-purple-400">
                ${itemDetails.reduce((sum, item) => sum + (item.requestQty * item.price), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Item Edit Dialog */}
      <Dialog open={showMobileDialog} onOpenChange={setShowMobileDialog}>
        <DialogContent className="bg-slate-900 border-white/20 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Item</DialogTitle>
          </DialogHeader>
          {selectedItemForMobile && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">Item Name</label>
                <Input
                  value={selectedItemForMobile.name}
                  onChange={(e) => updateMobileItem('name', e.target.value)}
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">Available in Shop</label>
                <p className="text-blue-400 font-medium text-lg">{selectedItemForMobile.availableQty}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">Salesman Request</label>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => updateMobileItem('requestQty', Math.max(0, selectedItemForMobile.requestQty - 1))}
                    variant="destructive"
                    size="sm"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-yellow-400 font-medium text-lg min-w-[3ch] text-center">
                    {selectedItemForMobile.requestQty}
                  </span>
                  <Button
                    onClick={() => updateMobileItem('requestQty', Math.min(selectedItemForMobile.availableQty, selectedItemForMobile.requestQty + 1))}
                    variant="default"
                    size="sm"
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400"
                    disabled={selectedItemForMobile.requestQty >= selectedItemForMobile.availableQty}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={selectedItemForMobile.price}
                  onChange={(e) => updateMobileItem('price', parseFloat(e.target.value) || 0)}
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => deleteItem(selectedItemForMobile.index)}
                  variant="destructive"
                  className="flex-1"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setShowMobileDialog(false)}
                  variant="default"
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesmanDashboard;