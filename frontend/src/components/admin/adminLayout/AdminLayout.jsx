import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <AdminNavbar />
    </div>
  );
}

export default AdminLayout;
