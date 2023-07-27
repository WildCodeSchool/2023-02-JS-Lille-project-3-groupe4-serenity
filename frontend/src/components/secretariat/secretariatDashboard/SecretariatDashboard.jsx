import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDate from "../../../services/dateUtils";
import styles from "./SecretariatDashboard.module.css";

function SecretariatDashboard() {
  const [countPatient, setCountPatient] = useState([]);
  const [countIntervention, setCountIntervention] = useState([]);
  const [countPractitioner, setCountPractitioner] = useState([]);
  const [oldestIntervention, setOldestIntervention] = useState([]);

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
    const fectchAllInterventions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions`
        );
        setOldestIntervention(response.data[0]);
        setCountIntervention(response.data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllInterventions();
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
    <div className={styles.dashboardContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.titleContainer}>Les chiffres du secrétariat</h1>
        <div className={styles.dataContainer}>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Nombre de patients</h2>
            <h3 className={styles.dataValue}>{countPatient}</h3>
          </div>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Nombre d'interventions</h2>
            <h3 className={styles.dataValue}>{countIntervention}</h3>
          </div>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Nombre de practiciens</h2>
            <h3 className={styles.dataValue}>{countPractitioner}</h3>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.titleContainer}>Prochaine intervention</h1>
        <div className={styles.dataContainer}>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Date</h2>
            <h3 className={styles.dataNextValue}>
              {formatDate(oldestIntervention.dateIntervention)}
            </h3>
          </div>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Patient</h2>
            <h3 className={styles.dataNextValue}>
              {oldestIntervention.patientFirstName}{" "}
              {oldestIntervention.patientLastName}
            </h3>
          </div>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Practicien</h2>
            <h3 className={styles.dataNextValue}>
              {oldestIntervention.practitionerFirstName}{" "}
              {oldestIntervention.practitionerLastName}
            </h3>
          </div>
          <div className={styles.dataCard}>
            <h2 className={styles.dataTitle}>Intervention</h2>
            <h3 className={styles.dataNextValue}>
              {" "}
              {oldestIntervention.typeIntervention}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SecretariatDashboard;
