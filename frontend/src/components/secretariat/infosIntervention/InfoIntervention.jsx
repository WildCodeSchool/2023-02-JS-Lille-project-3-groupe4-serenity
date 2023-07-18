import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./InfoIntervention.module.css";

function InfoIntervention() {
  const idIntervention = useParams().id;
  const [intervention, setIntervention] = useState([]);

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
                  name="Nom_de_l_intervention"
                  value={intervention.Nom_de_l_intervention}
                  disabled
                />
              </label>
            </div>
            <div className={styles.socialSecuNumberInterventionContainer}>
              <label>
                N° sécurité sociale:
                <input
                  type="text"
                  name="Numéro_de_sécurité_sociale_du_patient"
                  value={`${intervention.Numéro_de_sécurité_sociale_du_patient} ${intervention.Nom_du_patient} ${intervention.Prenom_du_patient}`}
                  disabled
                />
              </label>
            </div>
            <div className={styles.identifierRppsContainer}>
              <label>
                Identifiant RPPS:
                <input
                  type="text"
                  name="Identifiant_RPPS_du_praticien"
                  value={`${intervention.Identifiant_RPPS_du_praticien} ${intervention.Nom_du_Practicien} ${intervention.Prenom_du_practicien}`}
                  disabled
                />
              </label>
            </div>
            <div className={styles.procedureDateContainer}>
              <label>
                Date de procédure:
                <input
                  type="text"
                  name="Date_de_l_intervention"
                  value={intervention.Date_de_l_intervention}
                  disabled
                />
              </label>
            </div>
            <div className={styles.typeInterventionContainer}>
              <label className={styles.multipleChoicesMenu}>
                Type d'intervention:
                <input
                  type="text"
                  name="type_intervention"
                  value={intervention.Type_d_intervention}
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
