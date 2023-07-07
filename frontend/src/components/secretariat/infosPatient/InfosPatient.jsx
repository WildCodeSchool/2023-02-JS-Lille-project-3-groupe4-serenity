import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./InfosPatient.module.css";

function InfosPatient() {
  const [patient, setPatient] = useState({});
  const socialSecuNumber = useParams().social_secu_number;

  useEffect(() => {
    const fectchPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients/${socialSecuNumber}`
        );
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchPatient();
  }, []);

  return (
    <div className={styles.ManagementPatientContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/patient">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.ManagePatientContainer}>
        <div className={styles.ManagementPatientSelectedContainer}>
          Gestion d'un patient
        </div>

        <button className={styles.ButtonModifyPatientContainer} type="button">
          Modifier
        </button>
        <button className={styles.ButtonDeletePatientContainer} type="button">
          Supprimer
        </button>
        <div className={styles.MaritalStatusContainer}>Etat Civil</div>
        <div className={styles.SexContainer}>
          <div>
            Sexe
            <div className={styles.RadioButtonContainer}>
              <label>
                <input
                  type="radio"
                  value="Female"
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
                  value="Male"
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
              value={patient.last_name || ""}
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
              value={patient.first_name || ""}
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
              value={patient.social_secu_number || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.AgeContainer}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={patient.age || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.NationalityContainer}>
          <label>
            Nationalité:
            <input
              type="text"
              name="nationality"
              value={patient.nationality || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.AdressAndContactContainer}>
          Adresse et Contact
        </div>
        <div className={styles.AdressContainer}>
          <label>
            Adresse:
            <input
              type="text"
              name="address"
              value={patient.address || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.ZipCodeContainer}>
          <label>
            Code Postal:
            <input
              type="text"
              name="zip_code"
              value={patient.zip_code || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.CityContainer}>
          <label>
            Ville:
            <input
              type="text"
              name="city"
              value={patient.city || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.PhoneNumberContainer}>
          <label>
            Numéro de téléphone:
            <input
              type="text"
              name="phone"
              value={patient.phone || ""}
              disabled
            />
          </label>
        </div>
        <div className={styles.emailContainer}>
          <label>
            E-mail
            <input
              type="text"
              name="email"
              value={patient.email || ""}
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
              value={patient.allergy || ""}
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
              value={patient.remark || ""}
              disabled
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default InfosPatient;
