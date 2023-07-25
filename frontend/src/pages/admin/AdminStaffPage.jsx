import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminStaffPage.module.css";

function AdminStaffPage() {
  return (
    <div className={styles.staffContainer}>
      <Link to="/admin/staff/add">
        <button type="button">Ajouter</button>
      </Link>
    </div>
  );
}

export default AdminStaffPage;
