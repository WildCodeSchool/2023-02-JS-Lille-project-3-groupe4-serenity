import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import styles from "./AddStaff.module.css";

function AddStaff() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/staff`, inputs);
      navigate("/admin/staff");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.addStaffContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/admin/staff/add">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.AddPatientFormContainer}>
        <div className={styles.AddNewPatientContainer}>
          Nouveau compte secrétariat
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
              autoComplete="off"
              value={inputs.lastName || ""}
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
              value={inputs.firstName || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.SocialSecuNumberContainer}>
          <label>
            Rôle:
            <select
              name="role"
              value={inputs.role || ""}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un rôle</option>
              <option value="Admin">Admin</option>
              <option value="Secretaire">Secrétaire</option>
              <option value="Manager">Manager</option>
              <option value="Agent">Agent</option>
            </select>
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
              value={inputs.zipCode || ""}
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
      </div>
    </div>
  );
}

export default AddStaff;
