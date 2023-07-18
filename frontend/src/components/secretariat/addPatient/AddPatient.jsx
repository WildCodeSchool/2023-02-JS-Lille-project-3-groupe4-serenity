import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./AddPatient.module.css";

function AddPatient() {
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
      navigate("/secretariat/patient");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.addPatientContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/patient">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.AddPatientFormContainer}>
        <div className={styles.AddNewPatientContainer}>
          Ajout d'un nouveau patient
        </div>
        <div className={styles.ButtonAddPatientContainer}>
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
                  value="feminin"
                  name="gender"
                  checked={inputs.gender === "feminin"}
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
                  value="masculin"
                  name="gender"
                  checked={inputs.gender === "masculin"}
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
              value={inputs.remark || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
