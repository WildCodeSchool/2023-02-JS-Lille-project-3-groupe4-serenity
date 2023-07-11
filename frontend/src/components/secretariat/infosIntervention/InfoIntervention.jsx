import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./InfoIntervention.module.css";

function InfoIntervention() {
  const idIntervention = useParams().id;
  const [intervention, setIntervention] = useState({});

  useEffect(() => {
    const fetchInterventionByProcedureDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/interventions/${idIntervention}`
        );
        setIntervention(response.data);
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
    <div className={styles.addInterventionContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/intervention">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <h3>Gestion d'une intervention</h3>
      {Object.keys(intervention).length > 0 && (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.leftContainer}>
              <label>
                Nom de l'intervention:
                <input
                  type="text"
                  name="Nom_de_l_intervention"
                  value={intervention.Nom_de_l_intervention}
                  disabled
                />
              </label>
              <label>
                N° sécurité sociale:
                <input
                  type="text"
                  name="Numéro_de_sécurité_sociale_du_patient"
                  value={intervention.Numéro_de_sécurité_sociale_du_patient}
                  disabled
                />
              </label>
              <label>
                Identifiant RPPS:
                <input
                  type="text"
                  name="Identifiant_RPPS_du_praticien"
                  value={intervention.Identifiant_RPPS_du_praticien}
                  disabled
                />
              </label>
              <label>
                Date de procédure:
                <input
                  type="date"
                  name="Date_de_l_intervention"
                  value={intervention.Date_de_l_intervention}
                  disabled
                />
              </label>
            </div>
            <div className={styles.middleContainer}>
              <label className={styles.multipleChoicesMenu}>
                Type d'intervention:
                <input
                  type="text"
                  name="Type_d_intervention"
                  value={intervention.Type_d_intervention}
                  disabled
                />
              </label>
              <label>
                Nom du patient:
                <input
                  type="text"
                  name="Nom_du_patient"
                  value={intervention.Nom_du_patient}
                  disabled
                />
              </label>
              <label>
                Nom du praticien:
                <input
                  type="text"
                  name="Nom_du_Practicien"
                  value={intervention.Nom_du_Practicien}
                  disabled
                />
              </label>
              <input type="submit" className={styles.sendButton} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default InfoIntervention;
