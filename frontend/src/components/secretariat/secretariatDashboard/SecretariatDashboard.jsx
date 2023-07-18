import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./SecretariatDashboard.module.css";

function SecretariatDashboard() {
  const [countPatient, setCountPatient] = useState([]);
  const [countIntervention, setCountIntervention] = useState([]);
  const [countPractitioner, setCountPractitioner] = useState([]);

  useEffect(() => {
    const fetchCountPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients/count`
        );
        setCountPatient(response.data[0]["COUNT(*)"]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountPatient();
  }, []);

  useEffect(() => {
    const fetchCountIntervention = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/count`
        );
        setCountIntervention(response.data[0]["count(*)"]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountIntervention();
  }, []);

  useEffect(() => {
    const fetchCountPractitioner = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/practitioners/count`
        );
        setCountPractitioner(response.data[0]["count(*)"]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountPractitioner();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.titleContainer}>Mon Dashboard:</div>
      {countPatient && (
        <div key="patient-count" className={styles.NumberPatientContainer}>
          Nombre de patients:
          {countPatient}
        </div>
      )}
      {countIntervention && (
        <div
          key="intervention-count"
          className={styles.NumberInterventionContainer}
        >
          Nombre d'interventions:
          {countIntervention}
        </div>
      )}
      {countPractitioner && (
        <div
          key="practitioner-count"
          className={styles.NumberPractitionerContainer}
        >
          Nombre de practiciens:
          {countPractitioner}
        </div>
      )}
    </div>
  );
}
export default SecretariatDashboard;
