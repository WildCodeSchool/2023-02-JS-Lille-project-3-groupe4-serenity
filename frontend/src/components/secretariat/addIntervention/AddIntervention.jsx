import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "./AddIntervention.module.css";

function AddIntervention({ currentColor, routeRole }) {
  const [inputs, setInputs] = useState({ roles: "patient" });
  const [practitionerList, setPractitionerList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  const [uniqueInterventions, setUniqueInterventions] = useState([]);

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

  useEffect(() => {
    const fetchAllInterventions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions`
        );
        const allInterventions = response.data;
        // Use Set to get unique types of interventions
        const uniqueTypes = [
          ...new Set(
            allInterventions.map(
              (intervention) => intervention.typeIntervention
            )
          ),
        ];
        setUniqueInterventions(uniqueTypes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllInterventions();
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

      navigate(`${routeRole}/intervention`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={styles.addInterventionContainer}
      style={{ borderColor: currentColor }}
    >
      <div className={styles.closeButtonContainer}>
        <Link to={`${routeRole}/intervention`}>
          <FaRegWindowClose
            className={styles.closeIcon}
            style={{ color: currentColor }}
          />
        </Link>
      </div>
      <h3>Ajout d'une nouvelle intervention</h3>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.leftContainer}>
            <label>
              Nom de l'intervention:
              <input
                type="text"
                name="nom_intervention"
                autoComplete="off"
                value={inputs.nom_intervention || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              N° sécurité sociale:
              <select
                className={styles.multipleChoicesMenu}
                name="social_secu_number"
                value={inputs.social_secu_number || ""}
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
                    {practitioner.identifier_rpps} {practitioner.first_name}{" "}
                    {practitioner.last_name}
                  </option>
                ))}
              </select>
            </label>
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
          <div className={styles.middleContainer}>
            <label>
              Type interventions:
              <select
                className={styles.multipleChoicesMenu}
                name="type_intervention"
                value={inputs.type_intervention || ""}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Séléctionnez un type d'interventions
                </option>
                {uniqueInterventions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Nom du patient:
              <input
                type="text"
                value={inputs.last_name || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label>
              Nom du practicien:
              <input
                type="text"
                value={inputs.last_name || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <button
              type="submit"
              className={styles.sendButton}
              style={{ backgroundColor: currentColor }}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddIntervention.propTypes = {
  currentColor: PropTypes.string.isRequired,
  routeRole: PropTypes.string.isRequired,
};

export default AddIntervention;
