import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Upload,
  MoreVertical,
  ArrowLeft,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Package2,
  Zap,
  Keyboard,
  X
} from 'lucide-react';

// Sample inventory data
const initialInventoryData = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    category: 'Electronics',
    supplier: 'TechCorp Ltd',
    costPrice: 45.00,
    sellingPrice: 89.99,
    stock: 25,
    minStock: 10,
    maxStock: 100,
    status: 'In Stock',
    lastUpdated: '2024-08-15',
    description: 'Premium wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Organic Green Tea',
    sku: 'OGT-002',
    category: 'Beverages',
    supplier: 'Nature\'s Best',
    costPrice: 8.50,
    sellingPrice: 15.99,
    stock: 150,
    minStock: 50,
    maxStock: 300,
    status: 'In Stock',
    lastUpdated: '2024-08-14',
    description: 'Premium organic green tea leaves'
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    sku: 'CTS-003',
    category: 'Clothing',
    supplier: 'Fashion Forward',
    costPrice: 12.00,
    sellingPrice: 29.99,
    stock: 8,
    minStock: 15,
    maxStock: 75,
    status: 'Low Stock',
    lastUpdated: '2024-08-13',
    description: '100% cotton comfortable t-shirt'
  },
  {
    id: 4,
    name: 'Smartphone Case',
    sku: 'SPC-004',
    category: 'Electronics',
    supplier: 'MobileTech',
    costPrice: 5.00,
    sellingPrice: 19.99,
    stock: 0,
    minStock: 20,
    maxStock: 100,
    status: 'Out of Stock',
    lastUpdated: '2024-08-12',
    description: 'Protective smartphone case with drop protection'
  },
  {
    id: 5,
    name: 'Stainless Steel Water Bottle',
    sku: 'SSWB-005',
    category: 'Home & Garden',
    supplier: 'EcoLife',
    costPrice: 15.00,
    sellingPrice: 34.99,
    stock: 42,
    minStock: 25,
    maxStock: 80,
    status: 'In Stock',
    lastUpdated: '2024-08-16',
    description: 'Insulated stainless steel water bottle'
  },
  {
    id: 6,
    name: 'Gaming Mouse',
    sku: 'GM-006',
    category: 'Electronics',
    supplier: 'GameTech',
    costPrice: 25.00,
    sellingPrice: 59.99,
    stock: 18,
    minStock: 12,
    maxStock: 60,
    status: 'In Stock',
    lastUpdated: '2024-08-17',
    description: 'High precision gaming mouse with RGB lighting'
  }
];

const categories = ['All Categories', 'Electronics', 'Beverages', 'Clothing', 'Home & Garden'];
const suppliers = ['All Suppliers', 'TechCorp Ltd', 'Nature\'s Best', 'Fashion Forward', 'MobileTech', 'EcoLife', 'GameTech'];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const searchInputRef = useRef(null);

  // Filter inventory - moved before useEffect that uses it
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      const matchesSupplier = selectedSupplier === 'All Suppliers' || item.supplier === selectedSupplier;
      const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesSupplier && matchesStatus;
    });
  }, [inventory, searchTerm, selectedCategory, selectedSupplier, statusFilter]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  // Function to navigate to previous page
  const navigateToPreviousPage = () => {
    // In a real application, you would use router.back() or navigate(-1)
    // For this demo, we'll show an alert
    alert('Navigating to previous page... (In a real app, this would use router.back() or history.back())');
    
    // Example implementations for different routing libraries:
    // React Router: navigate(-1)
    // Next.js: router.back()
    // Browser API: window.history.back()
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle shortcuts if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        // Allow ESC to blur input fields
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          // Check if any modal is open first
          if (showKeyboardShortcuts) {
            setShowKeyboardShortcuts(false);
            return;
          }
          
          // Check if any filters are active
          const hasActiveFilters = searchTerm || selectedCategory !== 'All Categories' || 
                                 selectedSupplier !== 'All Suppliers' || statusFilter !== 'All Status';
          
          if (hasActiveFilters) {
            // Clear all filters and search
            setSearchTerm('');
            setSelectedCategory('All Categories');
            setSelectedSupplier('All Suppliers');
            setStatusFilter('All Status');
          } else {
            // Navigate to previous page if no filters are active
            navigateToPreviousPage();
          }
          break;
        
        case '/':
        case 'f':
          // Focus search input
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
        
        case 'n':
        case '+':
          // Add new product (simulate button click)
          e.preventDefault();
          alert('Add New Product dialog would open here');
          break;
        
        case 'e':
          // Export data
          e.preventDefault();
          alert('Export functionality would trigger here');
          break;
        
        case 'i':
          // Import data
          e.preventDefault();
          alert('Import functionality would trigger here');
          break;
        
        case '?':
          // Toggle keyboard shortcuts help
          e.preventDefault();
          setShowKeyboardShortcuts(!showKeyboardShortcuts);
          break;
        
        case '1':
          setStatusFilter('In Stock');
          break;
        case '2':
          setStatusFilter('Low Stock');
          break;
        case '3':
          setStatusFilter('Out of Stock');
          break;
        case '0':
          setStatusFilter('All Status');
          break;
        
        case 'ArrowRight':
          if (filteredInventory.length > 0) {
            e.preventDefault();
            setSelectedCardIndex((prev) => 
              prev < filteredInventory.length - 1 ? prev + 1 : 0
            );
          }
          break;
        
        case 'ArrowLeft':
          if (filteredInventory.length > 0) {
            e.preventDefault();
            setSelectedCardIndex((prev) => 
              prev > 0 ? prev - 1 : filteredInventory.length - 1
            );
          }
          break;
        
        case 'Enter':
          if (filteredInventory.length > 0) {
            e.preventDefault();
            const selectedItem = filteredInventory[selectedCardIndex];
            alert(`Editing ${selectedItem.name}`);
          }
          break;
        
        case 'Delete':
        case 'Backspace':
          if (filteredInventory.length > 0) {
            e.preventDefault();
            const selectedItem = filteredInventory[selectedCardIndex];
            handleDelete(selectedItem.id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredInventory, selectedCardIndex, showKeyboardShortcuts, searchTerm, selectedCategory, selectedSupplier, statusFilter]);

  // Reset selected card index when filters change
  useEffect(() => {
    setSelectedCardIndex(0);
  }, [filteredInventory]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.sellingPrice), 0);
    const lowStockItems = inventory.filter(item => item.stock <= item.minStock).length;
    const outOfStockItems = inventory.filter(item => item.stock === 0).length;
    
    return { totalItems, totalValue, lowStockItems, outOfStockItems };
  }, [inventory]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock': 
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            {status}
          </div>
        );
      case 'Low Stock': 
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            {status}
          </div>
        );
      case 'Out of Stock': 
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            <AlertTriangle className="w-3 h-3" />
            {status}
          </div>
        );
      default: 
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
          </div>
        );
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'Electronics': return 'from-blue-500 to-indigo-600';
      case 'Beverages': return 'from-green-500 to-emerald-600';
      case 'Clothing': return 'from-purple-500 to-pink-600';
      case 'Home & Garden': return 'from-orange-500 to-red-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Keyboard Shortcuts Help Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Keyboard className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Navigation</h4>
                  <div className="flex justify-between"><span>Search</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">/ or F</kbd></div>
                  <div className="flex justify-between"><span>Clear Filters</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd></div>
                  <div className="flex justify-between"><span>Go Back</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd></div>
                  <div className="flex justify-between"><span>Help</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">?</kbd></div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Actions</h4>
                  <div className="flex justify-between"><span>Add Product</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">N or +</kbd></div>
                  <div className="flex justify-between"><span>Export</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">E</kbd></div>
                  <div className="flex justify-between"><span>Import</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">I</kbd></div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Filters</h4>
                  <div className="flex justify-between"><span>All Items</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">0</kbd></div>
                  <div className="flex justify-between"><span>In Stock</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">1</kbd></div>
                  <div className="flex justify-between"><span>Low Stock</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">2</kbd></div>
                  <div className="flex justify-between"><span>Out of Stock</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">3</kbd></div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Card Navigation</h4>
                  <div className="flex justify-between"><span>Next Card</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd></div>
                  <div className="flex justify-between"><span>Prev Card</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd></div>
                  <div className="flex justify-between"><span>Edit Selected</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd></div>
                  <div className="flex justify-between"><span>Delete Selected</span><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Del</kbd></div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">
                  <strong>ESC Key Behavior:</strong> First press clears active filters, second press navigates back to previous page
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-6 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={navigateToPreviousPage}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
              title="Go back (ESC)"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Inventory Management
              </h1>
              <p className="text-gray-600 text-sm font-medium">Manage your stock and products efficiently</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
              className="px-4 py-2.5 text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium hover:scale-105 hover:shadow-lg"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden sm:inline">Shortcuts</span>
            </button>
            <button className="px-5 py-2.5 text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium hover:scale-105 hover:shadow-lg">
              <Upload className="w-4 h-4" />
              Import <kbd className="hidden lg:inline-block ml-1 px-1 py-0.5 bg-white/60 rounded text-xs">I</kbd>
            </button>
            <button className="px-5 py-2.5 text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium hover:scale-105 hover:shadow-lg">
              <Download className="w-4 h-4" />
              Export <kbd className="hidden lg:inline-block ml-1 px-1 py-0.5 bg-white/60 rounded text-xs">E</kbd>
            </button>
            
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/80 text-right">
                  <p className="text-sm font-medium">Total Products</p>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{stats.totalItems}</p>
                <p className="text-white/80 text-sm">Active inventory items</p>
              </div>
            </div>
          </div>

          {/* Inventory Value Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/80 text-right">
                  <p className="text-sm font-medium">Inventory Value</p>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">${stats.totalValue.toLocaleString()}</p>
                <p className="text-white/80 text-sm">Total stock worth</p>
              </div>
            </div>
          </div>

          {/* Low Stock Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/80 text-right">
                  <p className="text-sm font-medium">Low Stock Items</p>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{stats.lowStockItems}</p>
                <p className="text-white/80 text-sm">Needs restocking</p>
              </div>
            </div>
          </div>

          {/* Out of Stock Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/80 text-right">
                  <p className="text-sm font-medium">Out of Stock</p>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{stats.outOfStockItems}</p>
                <p className="text-white/80 text-sm">Critical items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative min-w-80">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products... (Press / to focus)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-medium placeholder-gray-500"
              />
              <kbd className="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
                /
              </kbd>
            </div>

            {/* Status Filter with Keyboard Shortcuts */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/80 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-gray-700 pr-16"
              >
                <option value="All Status">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs text-gray-500">0-3</kbd>
              </div>
            </div>

            {/* Other Filters */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/80 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-gray-700"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="px-4 py-3 bg-white/80 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-gray-700"
            >
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>{supplier}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'All Categories' || selectedSupplier !== 'All Suppliers' || statusFilter !== 'All Status') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedSupplier('All Suppliers');
                  setStatusFilter('All Status');
                }}
                className="px-4 py-3 text-gray-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <X className="w-4 h-4" />
                Clear <kbd className="px-1 py-0.5 bg-white/60 rounded text-xs">ESC</kbd>
              </button>
            )}
          </div>
          
          {/* Quick Status Filters */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200/50">
            <span className="text-sm text-gray-600 font-medium mr-2">Quick filters:</span>
            <button 
              onClick={() => setStatusFilter('All Status')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${statusFilter === 'All Status' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All <kbd className="ml-1 px-1 bg-white/60 rounded">0</kbd>
            </button>
            <button 
              onClick={() => setStatusFilter('In Stock')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${statusFilter === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              In Stock <kbd className="ml-1 px-1 bg-white/60 rounded">1</kbd>
            </button>
            <button 
              onClick={() => setStatusFilter('Low Stock')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${statusFilter === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Low Stock <kbd className="ml-1 px-1 bg-white/60 rounded">2</kbd>
            </button>
            <button 
              onClick={() => setStatusFilter('Out of Stock')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${statusFilter === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Out of Stock <kbd className="ml-1 px-1 bg-white/60 rounded">3</kbd>
            </button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInventory.map((item, index) => (
            <div 
              key={item.id} 
              className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border overflow-hidden ${
                index === selectedCardIndex ? 'border-indigo-400 ring-2 ring-indigo-200 bg-white/90' : 'border-gray-200/50'
              }`}
            >
              {/* Selected Card Indicator */}
              {index === selectedCardIndex && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-1 px-2 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    <Zap className="w-3 h-3" />
                    Selected
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${getCategoryGradient(item.category)} rounded-xl shadow-lg`}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-1 bg-gray-100 rounded-lg font-medium text-gray-600">
                    {item.sku}
                  </span>
                  <span className="px-2 py-1 bg-indigo-100 rounded-lg font-medium text-indigo-700">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Stock Progress */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Stock Level</span>
                  <span className="text-lg font-bold text-gray-900">{item.stock}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      item.stock === 0 ? 'bg-red-500' :
                      item.stock <= item.minStock ? 'bg-amber-500' : 
                      'bg-emerald-500'
                    }`}
                    style={{ 
                      width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%`,
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                  <span>Min: {item.minStock}</span>
                  <span>Max: {item.maxStock}</span>
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200/50">
                    <p className="text-xs font-medium text-gray-500 mb-1">Cost Price</p>
                    <p className="text-sm font-bold text-gray-900">${item.costPrice}</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-200/50">
                    <p className="text-xs font-medium text-indigo-600 mb-1">Selling Price</p>
                    <p className="text-sm font-bold text-indigo-700">${item.sellingPrice}</p>
                  </div>
                </div>
              </div>

              {/* Profit Margin */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50">
                  <span className="text-sm font-medium text-gray-700">Profit Margin</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-600">
                      {((item.sellingPrice - item.costPrice) / item.costPrice * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Supplier Info */}
              <div className="px-6 pb-6">
                <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-200/50">
                  <p className="text-xs font-medium text-gray-500 mb-1">Supplier</p>
                  <p className="text-sm font-semibold text-gray-900">{item.supplier}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                    <Edit className="w-4 h-4" />
                    Edit
                    {index === selectedCardIndex && <kbd className="px-1 py-0.5 bg-indigo-100 rounded text-xs">↵</kbd>}
                  </button>
                  <button className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 hover:scale-105">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                    {index === selectedCardIndex && <kbd className="ml-1 px-1 py-0.5 bg-red-100 rounded text-xs">Del</kbd>}
                  </button>
                </div>
              </div>

              {/* Last Updated Footer */}
              <div className="px-6 pb-4">
                <p className="text-xs text-gray-500 text-center">
                  Updated {new Date(item.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Help */}
        {filteredInventory.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Navigate:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Actions:</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
                <span className="text-xs">Edit</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Del</kbd>
                <span className="text-xs">Delete</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <button 
                onClick={() => setShowKeyboardShortcuts(true)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                All shortcuts <kbd className="ml-1 px-2 py-1 bg-indigo-100 rounded text-xs">?</kbd>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;