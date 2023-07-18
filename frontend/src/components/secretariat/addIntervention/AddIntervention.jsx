import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./AddIntervention.module.css";

function AddIntervention() {
  const [inputs, setInputs] = useState([]);
  const [practitionerList, setPractitionerList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fectchAllPractitionner = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/practitioners`
        );
        setPractitionerList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPractitionner();
  }, []);

  useEffect(() => {
    const fectchAllPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients`
        );
        setPatientsList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPatient();
  }, []);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/interventions`,
        inputs
      );
      navigate("/secretariat/intervention");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.addInterventionContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/intervention">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.titleFormContainer}>
          Ajout d'une nouvelle intervention
        </div>
        <div className={styles.NameInterventionContainer}>
          <label>
            Nom de l'intervention:
            <input
              type="text"
              name="nom_Intervention"
              value={inputs.nom_Intervention || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.socialSecuNumberInterventionContainer}>
          <label>
            N° sécurité sociale:
            <select
              className={styles.multipleChoicesMenu}
              name="social_number"
              value={inputs.social_number || ""}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Séléctionnez un patient
              </option>
              {patientsList.map((patient) => (
                <option
                  key={patient.social_secu_number}
                  value={patient.social_secu_number}
                  className={styles.optionSelectText}
                >
                  {patient.social_secu_number} {patient.first_name}{" "}
                  {patient.last_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.identifierRppsContainer}>
          <label>
            Identifiant RPPS:
            <select
              className={styles.multipleChoicesMenu}
              name="identifier_rpps"
              value={inputs.identifier_rpps || ""}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Séléctionnez un practicien
              </option>
              {practitionerList.map((practitioner) => (
                <option
                  key={practitioner.identifier_rpps} 
                  value={practitioner.identifier_rpps}
                >
                  {practitioner.identifier_rpps} {practitioner.prenom}{" "}
                  {practitioner.nom}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.procedureDateContainer}>
          <label>
            Date de procédure:
            <input
              type="date"
              name="procedure_date"
              value={inputs.procedure_date || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.typeInterventionContainer}>
          <label>
            Type d'intervention:
            <select
              className={styles.multipleChoicesMenu}
              name="type_intervention"
              value={inputs.type_intervention || ""}
              onChange={handleChange}
            >
              <option
                value=""
                aria-label="Select list for intervention type"
                disabled
                hidden
              />
              <option value="Pose implant">Pose implant</option>
              <option value="Chirurgie">Chirurgie</option>
            </select>
          </label>
        </div>
        <input
          type="submit"
          className={styles.sendButtonContainer}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
export default AddIntervention;
