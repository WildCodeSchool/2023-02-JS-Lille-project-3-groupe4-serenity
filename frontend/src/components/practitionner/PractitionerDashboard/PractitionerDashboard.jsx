import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PractitionerDashboard.module.css";

function PractitionerDashboard() {
  const [interventions, setInterventions] = useState([]);
  const { identifierRpps } = useParams();

  useEffect(() => {
    const fetchAllInterventionByIdentifierRpps = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/interventions/${identifierRpps}`
        );
        setInterventions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllInterventionByIdentifierRpps();
  }, [identifierRpps]);

  const getFutureInterventionDate = () => {
    if (interventions && interventions.length > 0) {
      return interventions[0].intervention_date;
    }
    return null;
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.titleAndSpecialityContainer}>
        <div className={styles.titleContainer}>Mon Dashboard:</div>
        {interventions && interventions.length > 0 && (
          <div className={styles.specialityPractitionerContainer}>
            Spécialité: {interventions[0].speciality}
          </div>
        )}
      </div>
      <div className={styles.informationsInterventionContainer}>
        <div className={styles.interventionContainer}>
          Informations sur ma prochaine intervention:
        </div>
        <div className={styles.numberOffutureInterventionContainer}>
          <div className={styles.dateOfFutureInterventionContainer}>
            Date de la prochaine intervention: {getFutureInterventionDate()}
          </div>

          <div className={styles.nameOfFutureInterventionContainer}>
            {interventions.map((intervention) => (
              <div key={intervention.id}>
                <p>Ma prochaine Intervention:{intervention.nom_intervention}</p>
              </div>
            ))}
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
    </div>
  );
}

export default PractitionerDashboard;
