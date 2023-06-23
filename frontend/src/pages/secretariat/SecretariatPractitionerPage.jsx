import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatPractitionerPage.module.css";
/* import PractitionerListTable from "../../components/practitionerListTable/practitionerListTable"; */

function SecretariatPractitionerPage() {
  return (
    <div className={styles.practitionerContainer}>
      <div className={styles.buttonsContainer}>
        <Link to="/secretariat/practitioner/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        {/* <PractitionerListTable /> */}
      </div>
    </div>
  );
}

export default SecretariatPractitionerPage;
