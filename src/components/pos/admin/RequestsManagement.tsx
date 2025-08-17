import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Package,
  User,
  Calendar,
  MessageSquare,
  Plus,
  Minus,
  Edit,
  Building2,
  Phone,
  Mail
} from 'lucide-react';

// Dummy data for suppliers and requests
const dummySuppliers = [
  { id: '1', name: 'ABC Electronics Co.', email: 'contact@abcelectronics.com', phone: '+1-234-567-8901', category: 'Electronics', rating: 4.8, status: 'active' },
  { id: '2', name: 'Fresh Foods Ltd.', email: 'orders@freshfoods.com', phone: '+1-234-567-8902', category: 'Food & Beverages', rating: 4.6, status: 'active' },
  { id: '3', name: 'Office Supplies Pro', email: 'sales@officesupplies.com', phone: '+1-234-567-8903', category: 'Office Supplies', rating: 4.7, status: 'active' },
  { id: '4', name: 'Tech Components Inc.', email: 'info@techcomponents.com', phone: '+1-234-567-8904', category: 'Electronics', rating: 4.9, status: 'active' },
  { id: '5', name: 'Green Garden Supplies', email: 'help@greengarden.com', phone: '+1-234-567-8905', category: 'Garden & Tools', rating: 4.5, status: 'active' }
];

const dummySupplierRequests = [
  {
    id: 'req1',
    supplierId: '1',
    supplierName: 'ABC Electronics Co.',
    items: [
      { id: '1', name: 'Laptop Dell XPS 13', quantity: 50, unitPrice: 999, totalPrice: 49950, category: 'Electronics' },
      { id: '2', name: 'Wireless Mouse', quantity: 100, unitPrice: 25, totalPrice: 2500, category: 'Electronics' },
      { id: '3', name: 'USB-C Cable', quantity: 200, unitPrice: 12, totalPrice: 2400, category: 'Electronics' }
    ],
    totalAmount: 54850,
    requestDate: new Date('2024-03-15'),
    status: 'pending',
    message: 'Special bulk pricing for Q2 orders. Free shipping included.',
    validUntil: new Date('2024-04-15')
  },
  {
    id: 'req2',
    supplierId: '2',
    supplierName: 'Fresh Foods Ltd.',
    items: [
      { id: '4', name: 'Organic Coffee Beans', quantity: 20, unitPrice: 35, totalPrice: 700, category: 'Food & Beverages' },
      { id: '5', name: 'Premium Tea Selection', quantity: 15, unitPrice: 28, totalPrice: 420, category: 'Food & Beverages' }
    ],
    totalAmount: 1120,
    requestDate: new Date('2024-03-14'),
    status: 'pending',
    message: 'Fresh stock from our latest harvest. Limited time offer.',
    validUntil: new Date('2024-03-30')
  },
  {
    id: 'req3',
    supplierId: '3',
    supplierName: 'Office Supplies Pro',
    items: [
      { id: '6', name: 'A4 Paper Ream', quantity: 100, unitPrice: 8, totalPrice: 800, category: 'Office Supplies' },
      { id: '7', name: 'Blue Pens Pack', quantity: 50, unitPrice: 5, totalPrice: 250, category: 'Office Supplies' },
      { id: '8', name: 'Staplers', quantity: 25, unitPrice: 15, totalPrice: 375, category: 'Office Supplies' }
    ],
    totalAmount: 1425,
    requestDate: new Date('2024-03-13'),
    status: 'approved',
    message: 'Bulk discount applied. Ready for immediate delivery.',
    validUntil: new Date('2024-04-10'),
    processedDate: new Date('2024-03-14')
  },
  {
    id: 'req5',
    supplierId: '5',
    supplierName: 'Green Garden Supplies',
    items: [
      { id: '10', name: 'Garden Hose 50ft', quantity: 10, unitPrice: 45, totalPrice: 450, category: 'Garden & Tools' },
      { id: '11', name: 'Pruning Shears', quantity: 20, unitPrice: 25, totalPrice: 500, category: 'Garden & Tools' }
    ],
    totalAmount: 950,
    requestDate: new Date('2024-03-16'),
    status: 'pending',
    message: 'Spring season special pricing. High quality tools.',
    validUntil: new Date('2024-04-20')
  }
];

const SuppliersManagement = () => {
  const [activeTab, setActiveTab] = useState('');
  const [showRequestsList, setShowRequestsList] = useState(false);
  const [showSuppliersList, setShowSuppliersList] = useState(false);
  const [requests, setRequests] = useState(dummySupplierRequests);
  const [suppliers, setSuppliers] = useState(dummySuppliers);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [editedItems, setEditedItems] = useState([]);
  const [adminResponse, setAdminResponse] = useState('');

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const processRequest = (requestId, status, response = '') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? {
            ...req,
            status,
            processedDate: new Date(),
            adminResponse: response
          }
        : req
    ));

    setShowRequestDetails(false);
    setSelectedRequest(null);
    setAdminResponse('');
  };

  const updateItemQuantity = (index, quantity) => {
    const updatedItems = [...editedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: Math.max(0, quantity),
      totalPrice: updatedItems[index].unitPrice * Math.max(0, quantity)
    };
    setEditedItems(updatedItems);
  };

  const updateItemPrice = (index, unitPrice) => {
    const updatedItems = [...editedItems];
    updatedItems[index] = {
      ...updatedItems[index],
      unitPrice: Math.max(0, unitPrice),
      totalPrice: Math.max(0, unitPrice) * updatedItems[index].quantity
    };
    setEditedItems(updatedItems);
  };

  const openRequestDetails = (request) => {
    setSelectedRequest(request);
    setEditedItems([...request.items]);
    setShowRequestDetails(true);
  };

  const saveItemChanges = () => {
    if (!selectedRequest) return;
    
    const totalAmount = editedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, items: [...editedItems], totalAmount }
        : req
    ));
    
    setSelectedRequest({ ...selectedRequest, items: [...editedItems], totalAmount });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
            Welcome to Supplier Management
          </h1>
          <p className="text-slate-600 text-lg">Manage supplier requests and supplier directory efficiently</p>
        </div>

        {/* Admin Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 cursor-pointer transform hover:scale-105 border-0"
            onClick={() => setShowRequestsList(true)}
          >
            <CardHeader className="text-center py-12">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                <Package className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <CardTitle className="text-2xl font-bold mb-4 drop-shadow-sm">Supplier Requests</CardTitle>
              <CardDescription className="text-orange-100 text-base leading-relaxed">
                Review and process incoming supplier requests, approve or reject offers, modify quantities and prices
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white hover:shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 cursor-pointer transform hover:scale-105 border-0"
            onClick={() => setShowSuppliersList(true)}
          >
            <CardHeader className="text-center py-12">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                <Building2 className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <CardTitle className="text-2xl font-bold mb-4 drop-shadow-sm">All Suppliers</CardTitle>
              <CardDescription className="text-teal-100 text-base leading-relaxed">
                Browse complete supplier directory, view contact information, ratings and manage supplier relationships
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Supplier Requests List Dialog */}
        <Dialog open={showRequestsList} onOpenChange={setShowRequestsList}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 backdrop-blur-md border-0 shadow-2xl">
            <DialogHeader className="bg-gradient-to-r from-blue-100/50 to-indigo-100/50 -m-6 p-6 mb-4 rounded-t-lg border-b border-blue-200/30">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent flex items-center">
                <Package className="w-6 h-6 mr-2 text-blue-600" />
                Supplier Requests
              </DialogTitle>
              <DialogDescription className="text-blue-600/80 text-base mt-2">
                View and manage all supplier requests with enhanced controls
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 p-1">
              {requests.map(request => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <Card key={request.id} className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer border-0 bg-gradient-to-r from-white/80 via-blue-50/60 to-indigo-50/60 backdrop-blur-sm hover:scale-[1.02] transform" 
                        onClick={() => {
                          setShowRequestsList(false);
                          openRequestDetails(request);
                        }}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl flex items-center justify-center border border-blue-300/40 shadow-lg">
                            <Building2 className="w-7 h-7 text-blue-600 drop-shadow-sm" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">{request.supplierName}</h3>
                            <div className="flex items-center text-sm text-slate-600 space-x-4 mt-1">
                              <span className="flex items-center bg-blue-50/50 px-2 py-1 rounded-full">
                                <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                {request.requestDate.toLocaleDateString()}
                              </span>
                              <span className="bg-indigo-50/50 px-2 py-1 rounded-full">{request.items.length} items</span>
                              <span className="font-bold text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded-full">${request.totalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center border shadow-sm ${getStatusColor(request.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-2" />
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-lg p-4 border border-slate-200/40">
                          <h4 className="font-semibold text-sm mb-3 text-slate-700 flex items-center">
                            <Package className="w-4 h-4 mr-2 text-blue-500" />
                            Items Preview:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {request.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="flex justify-between text-sm bg-gradient-to-r from-white/80 to-blue-50/60 p-3 rounded-lg border border-blue-200/40 shadow-sm">
                                <span className="text-slate-800 font-medium">{item.name}</span>
                                <span className="font-bold text-blue-600 bg-blue-50/70 px-2 py-1 rounded">Qty: {item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          {request.items.length > 3 && (
                            <p className="text-sm text-blue-600 mt-3 font-medium bg-blue-50/50 inline-block px-3 py-1 rounded-full">+{request.items.length - 3} more items</p>
                          )}
                        </div>
                        
                        {request.message && (
                          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
                            <div className="flex items-start">
                              <MessageSquare className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold text-blue-800 mb-1">Supplier Message:</h5>
                                <p className="text-sm text-blue-700 leading-relaxed">{request.message}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center pt-2 border-t border-blue-200/30">
                          <div className="text-sm text-slate-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1 text-blue-500" />
                              Valid until: {request.validUntil.toLocaleDateString()}
                            </span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 text-blue-700 hover:text-blue-800 font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowRequestsList(false);
                              openRequestDetails(request);
                            }}
                          >
                            View Details →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>

        {/* All Suppliers List Dialog */}
        <Dialog open={showSuppliersList} onOpenChange={setShowSuppliersList}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-xl text-slate-800">All Suppliers</DialogTitle>
              <DialogDescription className="text-slate-600">
                Browse your complete supplier directory
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suppliers.map(supplier => (
                <Card key={supplier.id} className="hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-200/50 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center border border-emerald-200/50">
                        <Building2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{supplier.name}</h3>
                        <p className="text-sm text-slate-500">{supplier.category}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {supplier.phone}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-slate-500">Rating: </span>
                          <span className="font-semibold text-amber-600">★ {supplier.rating}</span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{supplier.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Request Details Dialog */}
        <Dialog open={showRequestDetails} onOpenChange={setShowRequestDetails}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-xl text-slate-800">Supplier Request Details</DialogTitle>
              <DialogDescription className="text-slate-600">
                Review and process this supplier request
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6">
                {/* Request Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/50">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Supplier</p>
                    <p className="font-semibold text-slate-800">{selectedRequest.supplierName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Request Date</p>
                    <p className="font-semibold text-slate-800">{selectedRequest.requestDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Valid Until</p>
                    <p className="font-semibold text-slate-800">{selectedRequest.validUntil.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Amount</p>
                    <p className="font-semibold text-lg text-emerald-600">
                      ${editedItems.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Message */}
                {selectedRequest.message && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-medium mb-2 flex items-center text-blue-800">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Supplier Message
                    </h4>
                    <p className="text-blue-700">{selectedRequest.message}</p>
                  </div>
                )}
                
                {/* Items */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-lg text-slate-800">Requested Items</h4>
                    {selectedRequest.status === 'pending' && (
                      <Button onClick={saveItemChanges} variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                        <Edit className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {editedItems.map((item, index) => (
                      <div key={index} className="border border-slate-200/50 rounded-lg p-4 bg-white/80 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium text-slate-800">{item.name}</h5>
                            <p className="text-sm text-slate-500">{item.category}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                          <div>
                            <label className="text-sm font-medium text-slate-600">Quantity</label>
                            {selectedRequest.status === 'pending' ? (
                              <div className="flex items-center mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateItemQuantity(index, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 1)}
                                  className="w-20 mx-2 text-center h-8 border-slate-300"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateItemQuantity(index, item.quantity + 1)}
                                  className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <p className="font-semibold mt-1 text-slate-800">{item.quantity}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-slate-600">Unit Price</label>
                            {selectedRequest.status === 'pending' ? (
                              <Input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => updateItemPrice(index, parseFloat(e.target.value) || 0)}
                                className="mt-1 h-8 border-slate-300"
                                step="0.01"
                                min="0"
                              />
                            ) : (
                              <p className="font-semibold mt-1 text-slate-800">${item.unitPrice}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-slate-600">Total Price</label>
                            <p className="font-bold text-emerald-600 mt-1">${item.totalPrice.toLocaleString()}</p>
                          </div>
                          
                          <div className="text-right">
                            <Badge variant="outline" className="border-slate-300 text-slate-600">{item.category}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Admin Response */}
                {selectedRequest.status === 'pending' && (
                  <div>
                    <label className="text-sm font-medium text-slate-700">Admin Response (Optional)</label>
                    <Textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Add any comments or reasons for your decision..."
                      className="mt-2 border-slate-300"
                      rows={3}
                    />
                  </div>
                )}
                
                {/* Previous Response */}
                {selectedRequest.adminResponse && (
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                    <h4 className="font-medium mb-2 text-slate-800">Admin Response</h4>
                    <p className="text-slate-700">{selectedRequest.adminResponse}</p>
                  </div>
                )}
                
                {/* Actions */}
                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-4 pt-4 border-t border-slate-200">
                    <Button
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
                      onClick={() => processRequest(selectedRequest.id, 'approved', adminResponse)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Request
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg"
                      onClick={() => processRequest(selectedRequest.id, 'rejected', adminResponse)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject Request
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SuppliersManagement;