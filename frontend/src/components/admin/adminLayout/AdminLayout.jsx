import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.layoutContainer}>
      <AdminNavbar />
      <div className={styles.headerAndPageContainer}>
        <AdminHeader />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
