import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminStaffPage.module.css";
import StaffListTable from "../../components/admin/staffListTable/StaffListTable";

function AdminStaffPage() {
  return (
    <div className={styles.staffContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Staff</h1>
        <Link to="/admin/staff/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        {" "}
        <StaffListTable />
      </div>
    </div>
  );
}

export default AdminStaffPage;
