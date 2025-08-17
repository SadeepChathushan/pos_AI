import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import InventoryManagement from './InventoryManagement';
import ReportsView from './ReportsView';
import RequestsManagement from './RequestsManagement';
import UserManagement from './UserManagement';
import BillHistory from '../cashier/BillHistory';

function AdminLayout() {
  return <Outlet />;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/inventory" element={<InventoryManagement />} />
      <Route path="/admin/reports" element={<ReportsView />} />
      <Route path="/admin/requests" element={<RequestsManagement />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/pos/bill-history" element={<BillHistory />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}