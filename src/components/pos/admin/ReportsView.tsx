import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Calendar,
  BarChart3,
  PieChart,
  Users2,
  Download,
  Package,
  Activity,
} from "lucide-react";
import {
  getSalesByPeriod,
  dummySales,
  dummyItems,
} from "@/data/dummyData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ReportsView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");
  const [stockData, setStockData] = useState(dummyItems);

  const periodData = getSalesByPeriod(selectedPeriod);
  const profitMargin = 0.3;
  const totalProfit = periodData.totalSales * profitMargin;

  // --- Top items ---
  const itemSales = dummySales.reduce((acc, sale) => {
    sale.items.forEach((item) => {
      if (!acc[item.itemId]) {
        acc[item.itemId] = { name: item.itemName, quantity: 0, revenue: 0 };
      }
      acc[item.itemId].quantity += item.quantity;
      acc[item.itemId].revenue += item.total;
    });
    return acc;
  }, {} as Record<string, { name: string; quantity: number; revenue: number }>);

  const topItems = Object.entries(itemSales)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, 5);

  // --- Customer analysis ---
  const customerAnalysis = {
    totalCustomers: dummySales.filter((s) => s.customerInfo).length,
    loyalCustomers: Math.floor(
      dummySales.filter((s) => s.customerInfo).length * 0.3
    ),
    averageOrderValue:
      periodData.totalTransactions > 0
        ? periodData.totalSales / periodData.totalTransactions
        : 0,
  };

  // --- Revenue Report (dummy trend) ---
  const revenueTrend = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 20000 },
    { month: "Jun", revenue: 25000 },
  ];

  const revenueByCategory = stockData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = 0;
    acc[item.category] += item.stock * item.price;
    return acc;
  }, {} as Record<string, number>);

  const revenueCategoryData = Object.entries(revenueByCategory).map(
    ([category, value]) => ({ category, value })
  );

  // --- Export ---
  const exportReport = () => {
    const reportData = {
      period: selectedPeriod,
      totalSales: periodData.totalSales,
      totalTransactions: periodData.totalTransactions,
      totalProfit,
      topItems,
      customerAnalysis,
      stockData,
      generatedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `pos-report-${selectedPeriod}-${new Date()
      .toISOString()
      .split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // --- KPI tiles ---
  const kpiCards = [
    {
      title: "Total Sales",
      value: `$${periodData.totalSales.toFixed(2)}`,
      subtitle: `${selectedPeriod} revenue`,
      icon: DollarSign,
      gradient: "from-emerald-500 via-green-500 to-teal-500",
    },
    {
      title: "Total Profit",
      value: `$${totalProfit.toFixed(2)}`,
      subtitle: "30% profit margin",
      icon: TrendingUp,
      gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
    },
    {
      title: "Transactions",
      value: `${periodData.totalTransactions}`,
      subtitle: "Total orders",
      icon: ShoppingCart,
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
    },
    {
      title: "Avg. Order",
      value: `$${customerAnalysis.averageOrderValue.toFixed(2)}`,
      subtitle: "Per transaction",
      icon: Calendar,
      gradient: "from-orange-400 via-amber-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive business insights and performance metrics
          </p>
        </div>

        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </header>

      {/* KPI Section */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl text-white bg-gradient-to-br ${card.gradient}
                  shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
                <p className="text-sm opacity-80">{card.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Report */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-red-500" /> Revenue Report
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Line Chart */}
            <div>
              <h4 className="font-medium mb-3">Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Bar Chart */}
            <div>
              <h4 className="font-medium mb-3">Revenue by Category</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueCategoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Existing Reports */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Items */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-600" /> Top Selling Items
            </h2>
            <div className="space-y-4">
              {topItems.map(([itemId, data], index) => (
                <div
                  key={itemId}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      #{index + 1} {data.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {data.quantity} units sold
                    </p>
                  </div>
                  <p className="font-medium text-indigo-600">
                    ${data.revenue.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Users2 className="w-5 h-5 text-green-600" /> Customer Analysis
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold">
                  {customerAnalysis.totalCustomers}
                </p>
                <p className="text-sm text-gray-500">Total Customers</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {customerAnalysis.loyalCustomers}
                </p>
                <p className="text-sm text-gray-500">Loyal Customers</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Retention</span>
                <span className="font-medium text-green-600">
                  {Math.round(
                    (customerAnalysis.loyalCustomers /
                      customerAnalysis.totalCustomers) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span>Avg Order Value</span>
                <span className="font-medium">
                  ${customerAnalysis.averageOrderValue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Repeat Purchase</span>
                <span className="font-medium text-indigo-600">65%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Report */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-orange-500" /> Stock Report
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">Stock Categories</h4>
              {Object.entries(
                stockData.reduce((acc, item) => {
                  if (!acc[item.category]) {
                    acc[item.category] = { count: 0, totalStock: 0 };
                  }
                  acc[item.category].count++;
                  acc[item.category].totalStock += item.stock;
                  return acc;
                }, {} as Record<string, { count: number; totalStock: number }>),
              ).map(([category, data]) => (
                <div
                  key={category}
                  className="flex justify-between py-1 border-b text-sm"
                >
                  <span>{category}</span>
                  <span>
                    {data.count} items / {data.totalStock} units
                  </span>
                </div>
              ))}
            </div>

            {/* Low stock */}
            <div>
              <h4 className="font-medium mb-3">Low Stock Items</h4>
              {stockData
                .filter((item) => item.stock <= item.lowStockThreshold)
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-1 border-b text-sm text-red-600"
                  >
                    <span>{item.name}</span>
                    <span>{item.stock} left</span>
                  </div>
                ))}
            </div>

            {/* Stock value */}
            <div>
              <h4 className="font-medium mb-3">Stock Value</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Value</span>
                  <span className="font-semibold">
                    $
                    {stockData
                      .reduce((sum, item) => sum + item.price * item.stock, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Units</span>
                  <span className="font-semibold">
                    {stockData.reduce((sum, item) => sum + item.stock, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Item Value</span>
                  <span className="font-semibold">
                    {(
                      stockData.reduce((sum, item) => sum + item.price, 0) /
                      stockData.length
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ReportsView;
