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
        <h1 className={styles.titleContainer}>Les chiffres du secrétariat:</h1>
        {countPatient && (
          <div key="patient-count" className={styles.NumberPatientContainer}>
            <h2>Nombre de patients: {countPatient}</h2>
          </div>
        )}
        {countIntervention && (
          <div
            key="intervention-count"
            className={styles.NumberInterventionContainer}
          >
            <h2>Nombre d'interventions: {countIntervention}</h2>
          </div>
        )}
        {countPractitioner && (
          <div
            key="practitioner-count"
            className={styles.NumberPractitionerContainer}
          >
            <h2>Nombre de practiciens: {countPractitioner}</h2>
          </div>
        )}
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.titleContainer}>Prochaine intervention:</h1>

        <div className={styles.NumberPatientContainer}>
          <h2>Date: {formatDate(oldestIntervention.dateIntervention)}</h2>
        </div>

        <div className={styles.NumberInterventionContainer}>
          <h2>
            Patient: {oldestIntervention.patientFirstName}{" "}
            {oldestIntervention.patientLastName}
          </h2>
        </div>

        <div className={styles.NumberInterventionContainer}>
          <h2>
            Practicien: {oldestIntervention.practitionerFirstName}{" "}
            {oldestIntervention.practitionerLastName}
          </h2>
        </div>
        <div className={styles.NumberInterventionContainer}>
          <h2>Intervention: {oldestIntervention.typeIntervention}</h2>
        </div>
      </div>
    </div>
  );
}
export default SecretariatDashboard;
