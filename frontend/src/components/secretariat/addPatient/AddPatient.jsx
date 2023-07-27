import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./AddPatient.module.css";

function AddPatient({ currentColor, routeRole }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/patients`, inputs);

      toast.success("Patient créé !", {
        progressClassName: styles.toastProgress,
        autoClose: 1500,
      });

      navigate(`${routeRole}/patient`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={styles.addPatientContainer}
      style={{ borderColor: currentColor }}
    >
      <div className={styles.closeButtonContainer}>
        <Link to={`${routeRole}/patient`}>
          <FaRegWindowClose
            className={styles.closeIcon}
            style={{ color: currentColor }}
          />
        </Link>
      </div>
      <div className={styles.AddPatientFormContainer}>
        <div className={styles.AddNewPatientContainer}>
          Ajout d'un nouveau patient
        </div>
        <div
          className={styles.ButtonAddPatientContainer}
          style={{ backgroundColor: currentColor }}
        >
          <form onSubmit={handleSubmit}>
            <button type="submit">Ajouter</button>
          </form>
        </div>
        <div className={styles.MaritalStatusContainer}>Etat Civil</div>
        <div className={styles.genderContainer}>
          <div>
            Sexe
            <div className={styles.RadioButtonContainer}>
              <label>
                <input
                  type="radio"
                  value="Femme"
                  name="gender"
                  checked={inputs.gender === "Femme"}
                  onChange={handleChange}
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
                  value="Homme"
                  name="gender"
                  checked={inputs.gender === "Homme"}
                  onChange={handleChange}
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
              autoComplete="off"
              value={inputs.last_name || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.FirstNamePatientContainer}>
          <label>
            Prénom:
            <input
              type="text"
              name="first_name"
              autoComplete="off"
              value={inputs.first_name || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.SocialSecuNumberContainer}>
          <label>
            Numéro de Sécurité Sociale:
            <input
              type="text"
              name="social_secu_number"
              autoComplete="off"
              value={inputs.social_secu_number || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.AgeContainer}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              autoComplete="off"
              value={inputs.age || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.NationalityContainer}>
          <label>
            Nationalité:
            <input
              type="text"
              name="nationality"
              autoComplete="off"
              value={inputs.nationality || ""}
              onChange={handleChange}
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
              autoComplete="off"
              value={inputs.address || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.ZipCodeContainer}>
          <label>
            Code Postal:
            <input
              type="text"
              name="zip_code"
              autoComplete="off"
              value={inputs.zip_code || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.CityContainer}>
          <label>
            Ville:
            <input
              type="text"
              name="city"
              autoComplete="off"
              value={inputs.city || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.PhoneNumberContainer}>
          <label>
            Numéro de téléphone:
            <input
              type="text"
              name="phone"
              autoComplete="off"
              value={inputs.phone || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.emailContainer}>
          <label>
            E-mail
            <input
              type="text"
              name="email"
              autoComplete="off"
              value={inputs.email || ""}
              onChange={handleChange}
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
              autoComplete="off"
              value={inputs.allergy || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.BloodGroupContainer}>
          <label>
            Groupe sanguin:
            <select
              className={styles.multipleChoicesMenu}
              name="blood_group"
              value={inputs.blood_group || ""}
              onChange={handleChange}
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
              autoComplete="off"
              value={inputs.remark || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

AddPatient.propTypes = {
  currentColor: PropTypes.string.isRequired,
  routeRole: PropTypes.string.isRequired,
};

export default AddPatient;
