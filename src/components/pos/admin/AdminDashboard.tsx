import React, { useState, useEffect, useCallback } from 'react';
import { BarChart3, ShoppingCart, FileText, Package, Users, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TileId = 'dashboard' | 'pos' | 'reports' | 'inventory' | 'users' | 'requests';

interface AdminHomeProps {
  onOpen?: (id: TileId) => void;
}

interface Tile {
  id: TileId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  gradient: string;
  shadowColor: string;
}

const AdminDashboard: React.FC<AdminHomeProps> = ({ onOpen }) => {
  // State for tiles order
  const [tiles, setTiles] = useState<Tile[]>([
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
  ]);

  // Navigation state
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const pathMap: Record<TileId, string> = {
    dashboard: '/admin',
    pos: '/pos/bill-history',
    inventory: '/admin/inventory',
    reports: '/admin/reports',
    users: '/admin/users',
    requests: '/admin/requests',
  };

  const navigate = useNavigate();

  const handleTileClick = (tile: Tile) => {
    const path = pathMap[tile.id];
    if (onOpen) onOpen(tile.id);
    console.log(`Navigate to: ${path}`);
    navigate(path); // navigate to the route
  };

  // Calculate grid dimensions based on screen size
  const getGridDimensions = () => {
    const width = window.innerWidth;
    if (width >= 1024) return { cols: 3, rows: Math.ceil(tiles.length / 3) }; // For desktop
    if (width >= 768) return { cols: 2, rows: Math.ceil(tiles.length / 2) };  // For tablets
    return { cols: 2, rows: Math.ceil(tiles.length / 2) }; // For mobile devices, 2x2 layout
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { cols, rows } = getGridDimensions();
    const currentRow = Math.floor(selectedIndex / cols);
    const currentCol = selectedIndex % cols;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (currentRow > 0) {
          const newIndex = selectedIndex - cols;
          setSelectedIndex(Math.max(0, newIndex));
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (currentRow < rows - 1) {
          const newIndex = selectedIndex + cols;
          setSelectedIndex(Math.min(tiles.length - 1, newIndex));
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        if (currentCol > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        break;

      case 'ArrowRight':
        e.preventDefault();
        if (currentCol < cols - 1 && selectedIndex < tiles.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        handleTileClick(tiles[selectedIndex]);
        break;
    }
  }, [selectedIndex, tiles]);

  // Add event listener for keyboard navigation
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle window resize for grid recalculation
  useEffect(() => {
    const handleResize = () => {
      const { cols } = getGridDimensions();
      const maxIndex = tiles.length - 1;
      if (selectedIndex > maxIndex) {
        setSelectedIndex(maxIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedIndex, tiles.length]);

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragging(true);
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newTiles = [...tiles];
      const draggedTile = newTiles[draggedIndex];

      newTiles.splice(draggedIndex, 1);
      const actualDropIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newTiles.splice(actualDropIndex, 0, draggedTile);

      setTiles(newTiles);
      if (selectedIndex === draggedIndex) {
        setSelectedIndex(actualDropIndex);
      } else if (selectedIndex > draggedIndex && selectedIndex <= dropIndex) {
        setSelectedIndex(selectedIndex - 1);
      } else if (selectedIndex < draggedIndex && selectedIndex >= dropIndex) {
        setSelectedIndex(selectedIndex + 1);
      }
    }

    setDragging(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleMouseClick = (index: number) => {
    setSelectedIndex(index);
    handleTileClick(tiles[index]);
  };

  return (
    <div className="min-h-screen bg-gray-50" tabIndex={0}>
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Manage your business operations</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            const isSelected = index === selectedIndex;
            const isDraggedOver = dragOverIndex === index;
            const isBeingDragged = draggedIndex === index;

            return (
              <div
                key={tile.id}
                className={`group relative p-8 rounded-2xl text-left transition-all duration-300 cursor-pointer
                  bg-gradient-to-br ${tile.gradient}
                  shadow-xl ${tile.shadowColor}
                  hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-indigo-300
                  min-h-[200px] flex flex-col justify-between
                  ${isSelected ? 'ring-4 ring-blue-400 ring-offset-2 ring-offset-gray-50' : ''}
                  ${isDraggedOver ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
                  ${isBeingDragged ? 'opacity-50 scale-105 rotate-2' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => handleMouseClick(index)}
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
                    <p className="text-white/90 text-sm font-medium">{tile.subtitle}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 rounded-full bg-white/25 group-hover:bg-white/40 transition-colors duration-300"></div>
                </div>

                {/* Selection indicator */}
                {isSelected && !isBeingDragged && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/60 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Use arrow keys to navigate • Press Enter to select • Drag cards to reorder</p>
          {dragging && (
            <p className="mt-2 text-orange-600 font-medium">
              Drop the card in a new position to reorder
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
