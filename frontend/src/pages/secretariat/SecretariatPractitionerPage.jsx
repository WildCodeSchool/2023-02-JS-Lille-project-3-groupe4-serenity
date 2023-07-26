import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatPractitionerPage.module.css";
import PractitionerListTable from "../../components/practitionerListTable/PractitionerListTable";

function SecretariatPractitionerPage() {
  return (
    <div className={styles.practitionerContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Practiciens</h1>
        <Link to="/secretariat/practitioner/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <PractitionerListTable
          currentColor="var(--main-purple)"
          routeRole="/secretariat"
        />
      </div>
    </div>
  );
}

export default SecretariatPractitionerPage;
