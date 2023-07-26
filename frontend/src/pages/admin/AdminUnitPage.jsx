import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminUnitPage.module.css";
import ServiceListTable from "../../components/serviceListTable/ServiceListTable";

function AdminUnitPage() {
  return (
    <div className={styles.unitsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Services</h1>
        <Link to="/admin/service/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <ServiceListTable currentColor="var(--red)" routeRole="/admin" />
      </div>
    </div>
  );
}

export default AdminUnitPage;
