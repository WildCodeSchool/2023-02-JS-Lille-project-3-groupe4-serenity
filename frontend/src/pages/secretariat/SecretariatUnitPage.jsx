import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatUnitPage.module.css";
import ServiceListTable from "../../components/serviceListTable/ServiceListTable";

function SecretariatUnitPage() {
  return (
    <div className={styles.unitsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Services</h1>
        <Link to="/secretariat/service/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <ServiceListTable />
      </div>
    </div>
  );
}

export default SecretariatUnitPage;
