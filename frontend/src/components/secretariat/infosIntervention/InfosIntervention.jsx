import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../../services/dateUtils";
import styles from "./InfosIntervention.module.css";

function InfoIntervention() {
  const idIntervention = useParams().id;
  const [intervention, setIntervention] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInterventionByProcedureDate = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idIntervention}`
        );

        setIntervention(response.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInterventionByProcedureDate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire de modification
  };

  return (
    <div className={styles.infosInterventionContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/intervention">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.ButtonModifyInterventionContainer}>
          <form onSubmit={handleSubmit}>Modifier</form>
        </div>
        <div className={styles.ButtonDeleteInterventionContainer}>
          <form onSubmit={handleSubmit}>Supprimer</form>
        </div>
        <div className={styles.titleFormContainer}>
          Gestion d'une intervention
        </div>
        {Object.keys(intervention).length > 0 && (
          <>
            <div className={styles.NameInterventionContainer}>
              <label>
                Nom de l'intervention:
                <input
                  type="text"
                  name="nom_Intervention"
                  value={intervention.nom_Intervention}
                  disabled
                />
              </label>
            </div>
            <div className={styles.socialSecuNumberInterventionContainer}>
              <label>
                N° sécurité sociale:
                <input
                  type="text"
                  name="social_secu_number"
                  value={`${intervention.social_secu_number} ${intervention.patient_last_name} ${intervention.patient_first_name}`}
                  disabled
                />
              </label>
            </div>
            <div className={styles.identifierRppsContainer}>
              <label>
                Identifiant RPPS:
                <input
                  type="text"
                  name="identifier_rpps"
                  value={`${intervention.identifier_rpps} ${intervention.practitioner_last_name} ${intervention.practitioner_first_name}`}
                  disabled
                />
              </label>
            </div>
            <div className={styles.procedureDateContainer}>
              <label>
                Date de procédure:
                <input
                  type="text"
                  name="procedure_date"
                  value={formatDate(intervention.procedure_date)}
                  disabled
                />
              </label>
            </div>
            <div className={styles.typeInterventionContainer}>
              <label>
                Type d'intervention:
                <input
                  type="text"
                  name="type_intervention"
                  value={intervention.type_intervention}
                  disabled
                />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoIntervention;
