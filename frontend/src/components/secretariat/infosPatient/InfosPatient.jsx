import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./InfosPatient.module.css";

function AddPatient() {
  const [patient, setPatient] = useState({});
  const socialSecuNumber = useParams().social_secu_number;

  useEffect(() => {
    const fectchPatientById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/patients/${socialSecuNumber}`
        );
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchPatientById();
  }, []);

  return (
    <div className={styles.addPatientContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/patient">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>

      <div className={styles.formContainer}>
        <form>
          <div className={styles.leftContainer}>
            <label>
              Nom:
              <input
                type="text"
                name="last_name"
                value={patient.last_name || ""}
                disabled
              />
            </label>
            <label>
              Téléphone:
              <input
                type="text"
                name="phone"
                value={patient.phone || ""}
                disabled
              />
            </label>
            <label>
              Adresse:
              <input
                type="text"
                name="address"
                value={patient.address || ""}
                disabled
              />
            </label>
            <label>
              Groupe sanguin:
              <input
                type="text"
                name="bloog_group"
                value={patient.blood_group || ""}
                disabled
              />
            </label>
            <label>
              N° sécurité sociale:
              <input
                type="text"
                name="social_secu_number"
                value={patient.social_secu_number || ""}
                disabled
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={patient.email || ""}
                disabled
              />
            </label>
          </div>
          <div className={styles.middleContainer}>
            <label>
              Prénom:
              <input
                type="text"
                name="first_name"
                value={patient.first_name || ""}
                disabled
              />
            </label>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={patient.nationality || ""}
                disabled
              />
            </label>
            <label>
              Code postal:
              <input
                type="text"
                name="zip_code"
                value={patient.zip_code || ""}
                disabled
              />
            </label>
            <label>
              Allergies:
              <input
                type="text"
                name="allergy"
                value={patient.allergy || ""}
                disabled
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="gender"
                value={patient.gender || ""}
                disabled
              />
            </label>

            <div className={styles.divFake} />
          </div>
          <div className={styles.rightContainer}>
            <label>
              Âge:
              <input
                type="number"
                name="age"
                value={patient.age || ""}
                disabled
              />
            </label>

            <div className={styles.divFake} />

            <label>
              Ville:
              <input
                type="text"
                name="city"
                value={patient.city || ""}
                disabled
              />
            </label>
            <label>
              Remarques:
              <input
                type="text"
                name="remark"
                value={patient.remark || ""}
                disabled
              />
            </label>
            <div className={styles.divFake} />
            <div className={styles.divFake} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
