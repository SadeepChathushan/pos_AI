// src/layouts/POSLayout.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import POSInterface from './cashier/POSInterface';
import SalesmanDashboard from './salesman/SalesmanDashboard';
import { Button } from '@/components/ui/button';

// If you use React Router, uncomment the next line and the navigate call.
// import { useNavigate } from 'react-router-dom';

const POSLayout: React.FC = () => {
  const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // Not signed in → ask to login
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Not signed in</h1>
          <p className="text-sm text-muted-foreground mt-2">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      // If you use React Router:
      // navigate('/login', { replace: true });
      // Otherwise, a simple hard redirect:
      window.location.href = '/';
    } catch {
      // no-op; your AuthContext/toast can handle errors if needed
    }
  };

  const RoleHeader = () => (
    <header className="w-full border-b border-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">POS</span>
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">POS System</div>
            <div className="text-xs text-muted-foreground leading-tight capitalize">{user.role} panel</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium">{user.name ?? 'User'}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );

  // Render the correct main view by role — no sidebar, no manual switching
  const renderByRole = () => {
    switch (user.role) {
      case 'cashier':
        return <POSInterface />;            // Cashier → POSInterface
      case 'salesman':
        return <SalesmanDashboard />;       // Salesman → SalesmanDashboard
      case 'admin':
        return <AdminDashboard />;          // Admin → AdminDashboard
      default:
        return (
          <div className="h-[calc(100vh-56px)] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Unsupported role</h2>
              <p className="text-sm text-muted-foreground mt-2">
                No view is mapped for role: <span className="font-mono">{String(user.role)}</span>
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RoleHeader />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">{renderByRole()}</div>
      </main>
    </div>
  );
};

export default POSLayout;
