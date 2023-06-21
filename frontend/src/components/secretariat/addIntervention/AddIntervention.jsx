import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import styles from "./AddIntervention.module.css";

function AddIntervention() {
  const [inputs, setInputs] = useState({ roles: "patient" });

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.addInterventionContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/intervention">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <h3>Ajout d'une nouvelle intervention</h3>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.leftContainer}>
            <label>
              Nom:
              <input
                type="text"
                name="last_name"
                value={inputs.last_name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Téléphone:
              <input
                type="text"
                name="phone"
                value={inputs.phone || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Adresse:
              <input
                type="text"
                name="adress"
                value={inputs.adress || ""}
                onChange={handleChange}
              />
            </label>
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
              </select>
            </label>
            <label>
              N° sécurité sociale:
              <input
                type="text"
                name="social_secu_number"
                value={inputs.social_secu_number || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.middleContainer}>
            <label>
              Prénom:
              <input
                type="text"
                name="first_name"
                value={inputs.first_name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={inputs.nationality || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Code postal:
              <input
                type="text"
                name="zip_code"
                value={inputs.zip_code || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Allergies:
              <input
                type="text"
                name="allergy"
                value={inputs.allergy || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Rôle:
              <input type="text" name="roles" value="Patient" disabled />
            </label>

            <label>
              Mot de passe:
              <input
                type="text"
                name="pwd"
                value={inputs.pwd || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.rightContainer}>
            <label>
              Âge:
              <input
                type="number"
                name="age"
                value={inputs.age || ""}
                onChange={handleChange}
              />
            </label>

            <div className={styles.divFake} />

            <label>
              Ville:
              <input
                type="text"
                name="city"
                value={inputs.city || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Remarques:
              <input
                type="text"
                name="remark"
                value={inputs.remark || ""}
                onChange={handleChange}
              />
            </label>
            <div className={styles.divFake} />
            <input type="submit" className={styles.sendButton} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIntervention;
