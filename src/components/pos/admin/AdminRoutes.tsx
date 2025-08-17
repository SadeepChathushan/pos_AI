import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="reports" element={<ReportsView />} />
          <Route path="requests" element={<RequestsManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        <Route path="/pos">
          <Route path="bill-history" element={<BillHistory />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
