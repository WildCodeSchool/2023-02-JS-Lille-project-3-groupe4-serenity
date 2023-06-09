import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../adminHeader/AdminHeader";
import AdminNavbar from "../adminNavbar/AdminNavbar";

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
