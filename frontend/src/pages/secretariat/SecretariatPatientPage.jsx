import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./SecretariatPatientPage.module.css";
import PatientListTable from "../../components/patientListTable/PatientListTable";

function SecretariatPatientPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fectchAllPatient = async () => {
      try {
        const response = await axios.get("http://localhost:5050/patients");
        setPatients(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPatient();
  }, []);
  return (
    <div className={styles.patientsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Patients</h1>
        <Link to="/secretariat/patient/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
        {patients && patients.map((patient) => <h1>{patient}</h1>)}
      </div>
      <div className={styles.dataContainer}>
        {" "}
        <PatientListTable />
      </div>
    </div>
  );
}

export default SecretariatPatientPage;
