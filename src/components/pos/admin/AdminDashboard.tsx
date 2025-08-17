import React from 'react';
import {
  BarChart3,
  ShoppingCart,
  FileText,
  Package,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TileId = 'dashboard' | 'pos' | 'reports' | 'inventory' | 'users' | 'requests';

interface AdminHomeProps {
  onOpen?: (id: TileId) => void;
}

const AdminDashboard: React.FC<AdminHomeProps> = ({ onOpen }) => {
  const navigate = useNavigate();

  // Define a mapping for routes
  const pathMap: Record<TileId, string> = {
    dashboard: '/admin',
    pos: '/pos/bill-history',
    inventory: '/admin/inventory',
    reports: '/admin/reports',
    users: '/admin/users',
    requests: '/admin/requests',
  };

  const tiles: Array<{
    id: TileId;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    shadowColor: string;
  }> = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Overview & Analytics',
      icon: BarChart3,
      gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
      shadowColor: 'shadow-pink-500/25',
    },
    {
      id: 'pos',
      title: 'Point of Sale',
      subtitle: 'Billing & Payments',
      icon: ShoppingCart,
      gradient: 'from-emerald-500 via-green-500 to-teal-500',
      shadowColor: 'shadow-green-500/25',
    },
    {
      id: 'inventory',
      title: 'Inventory',
      subtitle: 'Stock Management',
      icon: Package,
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      id: 'reports',
      title: 'Reports',
      subtitle: 'Charts & Analytics',
      icon: FileText,
      gradient: 'from-fuchsia-500 via-purple-500 to-violet-500',
      shadowColor: 'shadow-purple-500/25',
    },
    {
      id: 'users',
      title: 'Users',
      subtitle: 'Manage Accounts',
      icon: Users,
      gradient: 'from-gray-700 via-gray-800 to-gray-900',
      shadowColor: 'shadow-gray-500/25',
    },
    {
      id: 'requests',
      title: 'Requests',
      subtitle: 'Stock & Approvals',
      icon: AlertTriangle,
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/25',
    },
  ];

  const handleTileClick = (tile: { id: TileId }) => {
    console.log(`Clicked tile: ${tile.id}`);
    const path = pathMap[tile.id];
    console.log(`Navigating to: ${path}`);
    
    // Call the onOpen prop if provided
    if (onOpen) {
      onOpen(tile.id);
    }
    
    // Navigate to the route
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Manage your business operations</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                aria-label={tile.title}
                className={`group relative p-8 rounded-2xl text-left transition-all duration-300
                  bg-gradient-to-br ${tile.gradient}
                  shadow-xl ${tile.shadowColor}
                  hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-indigo-300
                  min-h-[200px] flex flex-col justify-between
                `}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="self-start">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">
                      {tile.title}
                    </h3>
                    <p className="text-white/90 text-sm font-medium">
                      {tile.subtitle}
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 rounded-full bg-white/25 group-hover:bg-white/40 transition-colors duration-300"></div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;