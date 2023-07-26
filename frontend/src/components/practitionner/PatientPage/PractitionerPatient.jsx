import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./PractitionerPatient.module.css";

function PractitionerPatient() {
  const socialSecuNumber = useParams().social_secu_number;
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const fetchPatientBySocialSecuNumber = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients/${socialSecuNumber}`
        );
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatientBySocialSecuNumber();
  }, []);

  return (
    <div className={styles.ManagementPatientContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/patient">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      {Object.keys(patient).length > 0 && (
        <div className={styles.ManagePatientContainer}>
          <div className={styles.ManagementPatientSelectedContainer}>
            Consultation de la fiche patient
          </div>
          <div className={styles.GenderContainer}>
            <div>
              Sexe
              <div className={styles.RadioButtonContainer}>
                <label>
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    checked={patient.gender === "Female"}
                    disabled
                  />
                  <span className={styles.RadioButtonLabelContainer}>
                    Féminin
                  </span>
                </label>
              </div>
              <div className={styles.RadioButtonContainer}>
                <label>
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    checked={patient.gender === "Male"}
                    disabled
                  />
                  <span className={styles.RadioButtonLabelContainer}>
                    Masculin
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.LastNamePatientContainer}>
            <label>
              Nom:
              <input
                type="text"
                name="last_name"
                value={patient.last_name}
                disabled
              />
            </label>
          </div>
          <div className={styles.FirstNamePatientContainer}>
            <label>
              Prénom:
              <input
                type="text"
                name="first_name"
                value={patient.first_name}
                disabled
              />
            </label>
          </div>
          <div className={styles.SocialSecuNumberContainer}>
            <label>
              Numéro de Sécurité Sociale:
              <input
                type="text"
                name="social_secu_number"
                value={patient.social_secu_number}
                disabled
              />
            </label>
          </div>
          <div className={styles.AgeContainer}>
            <label>
              Age:
              <input type="number" name="age" value={patient.age} disabled />
            </label>
          </div>
          <div className={styles.NationalityContainer}>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={patient.nationality}
                disabled
              />
            </label>
          </div>
          <div className={styles.ImportantContainer}>Important</div>
          <div className={styles.AllergyContainer}>
            <label>
              Allergies:
              <input
                type="text"
                name="allergy"
                value={patient.allergy}
                disabled
              />
            </label>
          </div>
          <div className={styles.BloodGroupContainer}>
            <label>
              Groupe sanguin:
              <select
                className={styles.multipleChoicesMenu}
                name="blood_group"
                value={patient.blood_group}
                disabled
              >
                <option
                  value=""
                  aria-label="Select list for blood group"
                  disabled
                  hidden
                />
                <option value="a+">A+</option>
                <option value="a-">A-</option>
                <option value="b+">B+</option>
                <option value="b-">B-</option>
                <option value="ab+">AB+</option>
                <option value="ab-">AB-</option>
                <option value="o+">O+</option>
                <option value="o-">O-</option>
              </select>
            </label>
          </div>
          <div className={styles.RemarkContainer}>
            <label>
              Remarques:
              <input
                type="text"
                name="remark"
                value={patient.remark}
                disabled
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default PractitionerPatient;
