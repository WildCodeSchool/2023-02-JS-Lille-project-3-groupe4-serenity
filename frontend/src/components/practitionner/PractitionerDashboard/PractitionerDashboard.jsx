import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../../services/dateUtils";
import styles from "./PractitionerDashboard.module.css";

function PractitionerDashboard() {
  const [interventions, setInterventions] = useState([]);
  const { identifierRpps } = useParams();

  useEffect(() => {
    const fetchAllInterventionByIdentifierRpps = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/interventions/practitioner/${identifierRpps}`
        );
        setInterventions(response?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllInterventionByIdentifierRpps();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.titleAndSpecialityContainer}>
        <div className={styles.titleContainer}>Mon Dashboard:</div>

        <div className={styles.specialityPractitionerContainer}>
          Spécialité: {interventions[0]?.speciality}
        </div>
      </div>
      {interventions.length !== 0 ? (
        <div className={styles.informationsInterventionContainer}>
          <div className={styles.interventionContainer}>
            Informations sur ma prochaine intervention:
          </div>
          <div className={styles.numberOffutureInterventionContainer}>
            <div className={styles.dateOfFutureInterventionContainer}>
              Date de la prochaine intervention:{" "}
              {formatDate(interventions[0].intervention_date)}
            </div>

            <div className={styles.nameOfFutureInterventionContainer}>
              <p>
                Ma prochaine Intervention:{interventions[0].nom_intervention}
              </p>
            </div>
          </div>
          <div className={styles.numberPatientsCOntainer}>
            Nombre de patients:
          </div>
          <div
            key="patient-count"
            className={styles.NumberInterventionOfPractitionerContainer}
          >
            En attente de leurs opérations: {interventions.length}
          </div>
        </div>
      ) : (
        <h1>Pas d'intervention en attente.</h1>
      )}
    </div>
  );
}

export default PractitionerDashboard;
