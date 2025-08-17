import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import your admin components directly
import AdminDashboard from "./components/pos/admin/AdminDashboard";
import InventoryManagement from "./components/pos/admin/InventoryManagement";
import ReportsView from "./components/pos/admin/ReportsView";
import RequestsManagement from "./components/pos/admin/RequestsManagement";
import UserManagement from "./components/pos/admin/UserManagement";
import BillHistory from "./components/pos/cashier/BillHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Index />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inventory" element={<InventoryManagement />} />
            <Route path="/admin/reports" element={<ReportsView />} />
            <Route path="/admin/requests" element={<RequestsManagement />} />
            <Route path="/admin/users" element={<UserManagement />} />
            
            {/* POS routes */}
            <Route path="/pos/bill-history" element={<BillHistory />} />
            
            {/* Catch-all 404 route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;