import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Pause, 
  Play, 
  Receipt,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  Home,
  Keyboard
} from 'lucide-react';

// Mock data structure with categories, brands, and items
const mockData = {
  categories: [
    {
      id: 'beverages',
      name: 'Beverages',
      brands: [
        {
          id: 'coca-cola',
          name: 'Coca-Cola',
          items: [
            { id: 'cc-001', name: 'Coke Classic 500ml', price: 2.50, stock: 45 },
            { id: 'cc-002', name: 'Coke Zero 500ml', price: 2.50, stock: 32 },
            { id: 'cc-003', name: 'Sprite 500ml', price: 2.50, stock: 28 },
            { id: 'cc-004', name: 'Fanta Orange 500ml', price: 2.50, stock: 15 }
          ]
        },
        {
          id: 'pepsi',
          name: 'Pepsi',
          items: [
            { id: 'pp-001', name: 'Pepsi Classic 500ml', price: 2.45, stock: 38 },
            { id: 'pp-002', name: 'Pepsi Zero 500ml', price: 2.45, stock: 22 },
            { id: 'pp-003', name: '7UP 500ml', price: 2.45, stock: 19 }
          ]
        },
        {
          id: 'local-juices',
          name: 'Local Juices',
          items: [
            { id: 'lj-001', name: 'Fresh Orange Juice 300ml', price: 3.50, stock: 12 },
            { id: 'lj-002', name: 'Apple Juice 300ml', price: 3.25, stock: 8 }
          ]
        }
      ]
    },
    {
      id: 'snacks',
      name: 'Snacks',
      brands: [
        {
          id: 'lays',
          name: 'Lay\'s',
          items: [
            { id: 'ly-001', name: 'Classic Potato Chips 50g', price: 1.25, stock: 67 },
            { id: 'ly-002', name: 'BBQ Chips 50g', price: 1.25, stock: 43 },
            { id: 'ly-003', name: 'Sour Cream & Onion 50g', price: 1.25, stock: 29 }
          ]
        },
        {
          id: 'pringles',
          name: 'Pringles',
          items: [
            { id: 'pr-001', name: 'Original 150g', price: 3.99, stock: 24 },
            { id: 'pr-002', name: 'Sour Cream & Onion 150g', price: 3.99, stock: 18 },
            { id: 'pr-003', name: 'BBQ 150g', price: 3.99, stock: 21 }
          ]
        }
      ]
    },
    {
      id: 'dairy',
      name: 'Dairy Products',
      brands: [
        {
          id: 'nestle',
          name: 'Nestlé',
          items: [
            { id: 'ns-001', name: 'Fresh Milk 1L', price: 2.89, stock: 34 },
            { id: 'ns-002', name: 'Yogurt Strawberry 200g', price: 1.50, stock: 28 },
            { id: 'ns-003', name: 'Cheese Slices 200g', price: 4.25, stock: 16 }
          ]
        },
        {
          id: 'local-dairy',
          name: 'Local Dairy',
          items: [
            { id: 'ld-001', name: 'Farm Fresh Eggs (12pc)', price: 3.50, stock: 22 },
            { id: 'ld-002', name: 'Butter 250g', price: 2.75, stock: 19 }
          ]
        }
      ]
    }
  ]
};

const dummyBills = [];

const generateInvoiceId = () => {
  return 'INV-' + Date.now().toString().slice(-6);
};

// Mock user context
const user = { id: '1', name: 'John Cashier' };

// Mock toast function
const toast = ({ title, description }) => {
  console.log(`Toast: ${title} - ${description}`);
};

const POSInterface = () => {
  const [currentBill, setCurrentBill] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showPausedBills, setShowPausedBills] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [pausedBills, setPausedBills] = useState(dummyBills);
  const [itemQuantities, setItemQuantities] = useState({});
  
  // Navigation state
  const [currentPage, setCurrentPage] = useState('categories'); // 'categories' | 'brands' | 'items'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Keyboard navigation state
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Quick add item state
  const [quickItem, setQuickItem] = useState({
    name: '',
    price: '',
    quantity: '1'
  });

  // Get current items based on page
  const getCurrentItems = () => {
    if (currentPage === 'categories') {
      return filterBySearch(mockData.categories, 'name');
    } else if (currentPage === 'brands') {
      return filterBySearch(selectedCategory.brands, 'name');
    } else if (currentPage === 'items') {
      return filterBySearch(selectedBrand.items, 'name');
    }
    return [];
  };

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    // Don't handle keys when dialogs are open or search is focused
    if (showPayment || showPausedBills || showQuickAdd || isSearchFocused) {
      if (event.key === 'Escape') {
        if (showPayment) setShowPayment(false);
        if (showPausedBills) setShowPausedBills(false);
        if (showQuickAdd) setShowQuickAdd(false);
        if (isSearchFocused) {
          document.activeElement.blur();
          setIsSearchFocused(false);
        }
      }
      return;
    }

    const currentItems = getCurrentItems();
    const maxIndex = currentItems.length - 1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
        break;
      
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      
      case 'Enter':
        event.preventDefault();
        if (currentItems[selectedIndex]) {
          handleEnterAction(currentItems[selectedIndex]);
        }
        break;
      
      case 'Escape':
        event.preventDefault();
        navigateBack();
        break;
      
      case 'Home':
        event.preventDefault();
        navigateToCategories();
        break;
      
      case '/':
        event.preventDefault();
        document.querySelector('input[placeholder*="Search"]')?.focus();
        setIsSearchFocused(true);
        break;

      // Number keys for quick quantity selection (only on items page)
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (currentPage === 'items' && currentItems[selectedIndex]) {
          event.preventDefault();
          const quantity = parseInt(event.key);
          const item = currentItems[selectedIndex];
          updateItemQuantity(item.id, quantity);
        }
        break;

      // Quick add to bill with 'a' key
      case 'a':
      case 'A':
        if (currentPage === 'items' && currentItems[selectedIndex]) {
          event.preventDefault();
          const item = currentItems[selectedIndex];
          addItemToBill(item, getItemQuantity(item.id));
        }
        break;

      // Quick quantity adjustment
      case '+':
      case '=':
        if (currentPage === 'items' && currentItems[selectedIndex]) {
          event.preventDefault();
          const item = currentItems[selectedIndex];
          updateItemQuantity(item.id, getItemQuantity(item.id) + 1);
        }
        break;
      
      case '-':
        if (currentPage === 'items' && currentItems[selectedIndex]) {
          event.preventDefault();
          const item = currentItems[selectedIndex];
          updateItemQuantity(item.id, Math.max(1, getItemQuantity(item.id) - 1));
        }
        break;
    }
  }, [currentPage, selectedIndex, selectedCategory, selectedBrand, showPayment, showPausedBills, showQuickAdd, isSearchFocused]);

  // Handle Enter key action based on current page
  const handleEnterAction = (item) => {
    if (currentPage === 'categories') {
      navigateToBrands(item);
    } else if (currentPage === 'brands') {
      navigateToItems(item);
    } else if (currentPage === 'items') {
      addItemToBill(item, getItemQuantity(item.id));
    }
  };

  // Reset selected index when page changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [currentPage, selectedCategory, selectedBrand, searchTerm]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const updateItemQuantity = (itemId, quantity) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, quantity)
    }));
  };

  const getItemQuantity = (itemId) => {
    return itemQuantities[itemId] || 1;
  };

  const navigateToCategories = () => {
    setCurrentPage('categories');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchTerm('');
    setSelectedIndex(0);
  };

  const navigateToBrands = (category) => {
    setSelectedCategory(category);
    setCurrentPage('brands');
    setSearchTerm('');
    setSelectedIndex(0);
  };

  const navigateToItems = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage('items');
    setSearchTerm('');
    setSelectedIndex(0);
  };

  const navigateBack = () => {
    if (currentPage === 'items') {
      setCurrentPage('brands');
      setSelectedBrand(null);
      setSelectedIndex(0);
    } else if (currentPage === 'brands') {
      navigateToCategories();
    }
    setSearchTerm('');
  };

  const addItemToBill = (item, quantity) => {
    if (quantity <= 0) return;
    
    const existingItem = currentBill.find(billItem => billItem.itemId === item.id);
    
    if (existingItem) {
      setCurrentBill(prev => prev.map(billItem => 
        billItem.itemId === item.id 
          ? { ...billItem, quantity: billItem.quantity + quantity, total: (billItem.quantity + quantity) * billItem.price }
          : billItem
      ));
    } else {
      const newItem = {
        itemId: item.id,
        itemName: item.name,
        quantity,
        price: item.price,
        total: item.price * quantity
      };
      setCurrentBill(prev => [...prev, newItem]);
    }
    
    // Reset quantity to 1 after adding
    setItemQuantities(prev => ({
      ...prev,
      [item.id]: 1
    }));
    
    toast({
      title: "Item Added",
      description: `${item.name} x${quantity} added to bill`,
    });

    // Navigate back to categories page after adding item
    navigateToCategories();
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBill(itemId);
      return;
    }
    
    setCurrentBill(prev => prev.map(item => 
      item.itemId === itemId 
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeFromBill = (itemId) => {
    setCurrentBill(prev => prev.filter(item => item.itemId !== itemId));
  };

  const getBillTotal = () => {
    return currentBill.reduce((sum, item) => sum + item.total, 0);
  };

  const pauseBill = () => {
    if (currentBill.length === 0) return;
    
    const newBill = {
      id: Date.now().toString(),
      items: [...currentBill],
      total: getBillTotal(),
      isPaused: true,
      createdAt: new Date(),
      cashierId: user?.id || ''
    };
    
    setPausedBills(prev => [...prev, newBill]);
    setCurrentBill([]);
    
    toast({
      title: "Bill Paused",
      description: "Current bill has been saved",
    });
  };

  const resumeBill = (bill) => {
    setCurrentBill(bill.items);
    setPausedBills(prev => prev.filter(b => b.id !== bill.id));
    setShowPausedBills(false);
    
    toast({
      title: "Bill Resumed",
      description: "Bill has been restored",
    });
  };

  const addQuickItem = () => {
    if (!quickItem.price || !quickItem.quantity) return;
    
    const itemName = quickItem.name || `Item${Date.now()}`;
    const price = parseFloat(quickItem.price);
    const quantity = parseInt(quickItem.quantity);
    
    const newItem = {
      itemId: `quick-${Date.now()}`,
      itemName,
      quantity,
      price,
      total: price * quantity
    };
    
    setCurrentBill(prev => [...prev, newItem]);
    setQuickItem({ name: '', price: '', quantity: '1' });
    setShowQuickAdd(false);
    
    toast({
      title: "Quick Item Added",
      description: `${itemName} added to bill`,
    });
  };

  const processPayment = (method) => {
    if (currentBill.length === 0) return;
    
    const invoiceId = generateInvoiceId();
    
    toast({
      title: "Payment Processed",
      description: `Invoice ${invoiceId} - $${getBillTotal().toFixed(2)}`,
    });
    
    // Print receipt (simulated)
    printReceipt(invoiceId, method);
    
    // Clear current bill
    setCurrentBill([]);
    setShowPayment(false);
  };

  const printReceipt = (invoiceId, paymentMethod) => {
    const receipt = `
      =============================
      POS SYSTEM RECEIPT
      =============================
      Invoice: ${invoiceId}
      Date: ${new Date().toLocaleString()}
      Cashier: ${user?.name}
      =============================
      ${currentBill.map(item => 
        `${item.itemName} x${item.quantity} - $${item.total.toFixed(2)}`
      ).join('\n')}
      =============================
      Total: $${getBillTotal().toFixed(2)}
      Payment: ${paymentMethod.toUpperCase()}
      =============================
      Thank you for your purchase!
    `;
    
    console.log('Receipt:', receipt);
  };

  // Filter function for search
  const filterBySearch = (items, searchField) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item[searchField].toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.id && item.id.includes(searchTerm))
    );
  };

  // Render Categories Page
  const renderCategoriesPage = () => {
    const filteredCategories = filterBySearch(mockData.categories, 'name');
    
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Select Category</h2>
          <p className="text-muted-foreground">Choose a product category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((category, index) => {
            const colors = [
              { bg: 'bg-emerald-500', gradient: 'from-emerald-400 to-emerald-600', text: 'text-white' },
              { bg: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600', text: 'text-white' },
              { bg: 'bg-purple-500', gradient: 'from-purple-400 to-purple-600', text: 'text-white' },
              { bg: 'bg-rose-500', gradient: 'from-rose-400 to-rose-600', text: 'text-white' },
              { bg: 'bg-cyan-500', gradient: 'from-cyan-400 to-cyan-600', text: 'text-white' }
            ];
            const colorSet = colors[index % colors.length];
            const isSelected = selectedIndex === index;
            
            return (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 shadow-xl scale-105' : 'hover:shadow-lg'
                }`}
                onClick={() => navigateToBrands(category)}
              >
                <CardContent className={`p-6 bg-gradient-to-br ${colorSet.gradient} ${colorSet.text} rounded-lg`}>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {category.brands.reduce((total, brand) => total + brand.items.length, 0)} items
                    </Badge>
                    <p className="text-sm opacity-90">
                      {category.brands.length} brands available
                    </p>
                    {isSelected && (
                      <div className="text-xs opacity-75 mt-2">Press Enter to select</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Brands Page
  const renderBrandsPage = () => {
    const filteredBrands = filterBySearch(selectedCategory.brands, 'name');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedCategory.name} - Select Brand</h2>
            <p className="text-muted-foreground">Choose a brand from {selectedCategory.name}</p>
          </div>
          <Button variant="outline" onClick={navigateBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBrands.map((brand, index) => {
            const colors = [
              { bg: 'bg-blue-500', gradient: 'from-blue-400 to-blue-600' },
              { bg: 'bg-green-500', gradient: 'from-green-400 to-green-600' },
              { bg: 'bg-yellow-500', gradient: 'from-yellow-400 to-yellow-600' },
              { bg: 'bg-red-500', gradient: 'from-red-400 to-red-600' },
              { bg: 'bg-indigo-500', gradient: 'from-indigo-400 to-indigo-600' }
            ];
            const colorSet = colors[index % colors.length];
            const isSelected = selectedIndex === index;
            
            return (
              <Card 
                key={brand.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 shadow-xl scale-105' : 'hover:shadow-lg'
                }`}
                onClick={() => navigateToItems(brand)}
              >
                <CardContent className={`p-6 bg-gradient-to-br ${colorSet.gradient} text-white rounded-lg`}>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-bold">{brand.name}</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {brand.items.length} items
                    </Badge>
                    <p className="text-sm opacity-90">
                      Click to view products
                    </p>
                    {isSelected && (
                      <div className="text-xs opacity-75 mt-2">Press Enter to select</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Items Page
  const renderItemsPage = () => {
    const filteredItems = filterBySearch(selectedBrand.items, 'name');
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedBrand.name} - Select Items</h2>
            <p className="text-muted-foreground">Choose items from {selectedBrand.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigateToCategories()}>
              <Home className="w-4 h-4 mr-2" />
              Categories
            </Button>
            <Button variant="outline" onClick={navigateBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Brands
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            
            return (
              <Card 
                key={item.id} 
                className={`transition-all ${
                  isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 shadow-xl scale-105' : 'hover:shadow-md'
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold text-primary">${item.price}</span>
                        <Badge variant={item.stock <= 10 ? 'destructive' : 'secondary'}>
                          {item.stock} in stock
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Quantity selector and Add button */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => updateItemQuantity(item.id, getItemQuantity(item.id) - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{getItemQuantity(item.id)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => updateItemQuantity(item.id, getItemQuantity(item.id) + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        className="flex-1"
                        onClick={() => addItemToBill(item, getItemQuantity(item.id))}
                        disabled={item.stock === 0}
                      >
                        Add to Bill
                      </Button>
                    </div>
                    
                    {isSelected && (
                      <div className="text-xs text-muted-foreground text-center pt-2 space-y-1">
                        <div>Press 1-9 for quantity • + / - to adjust • Enter or A to add</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // Keyboard shortcuts help
  const KeyboardHelp = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
            <Keyboard className="w-4 h-4 mr-2" />
            Keys
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div><strong>Arrow Keys:</strong> Navigate through items</div>
            <div><strong>Enter:</strong> Select highlighted item</div>
            <div><strong>Escape:</strong> Go back / Close dialogs</div>
            <div><strong>Home:</strong> Go to categories</div>
            <div><strong>/:</strong> Focus search</div>
            {currentPage === 'items' && (
              <>
                <div><strong>1-9:</strong> Set quantity</div>
                <div><strong>+ / -:</strong> Adjust quantity</div>
                <div><strong>A:</strong> Add to bill</div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="h-full flex gap-6">
      {/* Left Panel - Navigation based content */}
      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Point of Sale</h1>
          <p className="text-muted-foreground">
            {currentPage === 'categories' && 'Select items to add to bill'}
            {currentPage === 'brands' && `Browse ${selectedCategory?.name} brands`}
            {currentPage === 'items' && `Add ${selectedBrand?.name} items to bill`}
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={
              currentPage === 'categories' ? 'Search categories... (Press / to focus)' :
              currentPage === 'brands' ? 'Search brands...' : 
              'Search items...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10"
          />
        </div>

        {/* Dynamic content based on current page */}
        <div className="max-h-[500px] overflow-y-auto">
          {currentPage === 'categories' && renderCategoriesPage()}
          {currentPage === 'brands' && renderBrandsPage()}
          {currentPage === 'items' && renderItemsPage()}
        </div>
      </div>

      {/* Right Panel - Bill (unchanged) */}
      <div className="w-96 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Bill</h2>
          <div className="flex gap-2">
            <Dialog open={showQuickAdd} onOpenChange={setShowQuickAdd}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quick Add Item</DialogTitle>
                  <DialogDescription>Add an item not in the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Item name (optional)"
                    value={quickItem.name}
                    onChange={(e) => setQuickItem(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={quickItem.price}
                    onChange={(e) => setQuickItem(prev => ({ ...prev, price: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={quickItem.quantity}
                    onChange={(e) => setQuickItem(prev => ({ ...prev, quantity: e.target.value }))}
                  />
                  <Button onClick={addQuickItem} className="w-full">Add to Bill</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={pauseBill}>
              <Pause className="w-4 h-4" />
            </Button>
            
            <Dialog open={showPausedBills} onOpenChange={setShowPausedBills}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4" />
                  {pausedBills.length > 0 && (
                    <Badge className="ml-2 h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {pausedBills.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Paused Bills</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {pausedBills.map(bill => (
                    <div 
                      key={bill.id}
                      className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-muted"
                      onClick={() => resumeBill(bill)}
                    >
                      <div>
                        <p className="font-medium">${bill.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{bill.items.length} items</p>
                      </div>
                      <Badge variant="outline">Resume</Badge>
                    </div>
                  ))}
                  {pausedBills.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No paused bills</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="h-96">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2">
              {currentBill.map(item => (
                <div key={item.itemId} className="flex justify-between items-center p-2 border rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.itemName}</p>
                    <p className="text-xs text-muted-foreground">${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeFromBill(item.itemId)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {currentBill.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No items in bill
                </div>
              )}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${getBillTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogTrigger asChild>
            <Button 
              className="w-full" 
              size="lg"
              disabled={currentBill.length === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Payment</DialogTitle>
              <DialogDescription>
                Total Amount: ${getBillTotal().toFixed(2)}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                className="h-20 flex-col"
                onClick={() => processPayment('cash')}
              >
                <Banknote className="w-6 h-6 mb-2" />
                Cash
              </Button>
              <Button 
                className="h-20 flex-col"
                onClick={() => processPayment('card')}
              >
                <CreditCard className="w-6 h-6 mb-2" />
                Card
              </Button>
              <Button 
                className="h-20 flex-col"
                onClick={() => processPayment('upi')}
              >
                <Smartphone className="w-6 h-6 mb-2" />
                UPI
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Keyboard Help */}
      <KeyboardHelp />
    </div>
  );
};

export default POSInterface;