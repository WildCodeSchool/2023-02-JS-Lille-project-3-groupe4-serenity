import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";
import styles from "./AddPatientForm.module.css";

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
      await axios.post("http://localhost:5050/patients", inputs);
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
      <div className={styles.AddPatientForm}>
        <div className={styles.AddNewPatientContainer}>
          Ajout d'un nouveau patient
        </div>
        <div className={styles.ButtonAddPatient}>
          <form onSubmit={handleSubmit}>Ajouter</form>
        </div>
        <div className={styles.MaritalStatus}>Etat Civil</div>
        <div className={styles.SexContainer}>
          <div>
            Sexe
            <div className={styles.RadioButtonContainer}>
              <label>
                <input
                  type="radio"
                  value="feminin"
                  name="sex"
                  checked={inputs.sex === "feminin"}
                  onChange={handleChange}
                />
                <span className={styles.RadioButtonLabel}>Féminin</span>
              </label>
            </div>
            <div className={styles.RadioButtonContainer}>
              <label>
                <input
                  type="radio"
                  value="masculin"
                  name="sex"
                  checked={inputs.sex === "masculin"}
                  onChange={handleChange}
                />
                <span className={styles.RadioButtonLabel}>Masculin</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.LastNamePatient}>
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
        <div className={styles.FirstNamePatient}>
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
        <div className={styles.SocialSecuNumber}>
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
        <div className={styles.Age}>
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
        <div className={styles.Nationality}>
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
        <div className={styles.AdressAndContact}>Adresse et Contact</div>
        <div className={styles.Adress}>
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
        <div className={styles.ZipCode}>
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
        <div className={styles.City}>
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
        <div className={styles.PhoneNumber}>
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
        <div className={styles.Email}>
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
        <div className={styles.Important}>Important</div>
        <div className={styles.Allergy}>
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
        <div className={styles.BloodGroup}>
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
        <div className={styles.Remark}>
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
