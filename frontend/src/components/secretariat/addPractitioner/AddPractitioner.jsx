import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./AddPractitioner.module.css";

function AddPractitioner() {
  const [inputs, setInputs] = useState({ roles: "pratitioner" });

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.addPractitionerContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/practitioner">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <h3>Ajout d'un nouveau praticien</h3>
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
              Âge:
              <input
                type="number"
                name="age"
                value={inputs.age || ""}
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
              Spécialité:
              <input
                type="text"
                name="social_secu_number"
                value={inputs.social_secu_number || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Rôle:
              <input type="text" name="roles" value="Praticien" disabled />
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
          <div className={styles.rightContainer}>
            <label>
              Genre:
              <select
                className={styles.multipleChoicesMenu}
                name="gender"
                value={inputs.gender || ""}
                onChange={handleChange}
              >
                <option
                  value=""
                  aria-label="Select list for gender"
                  disabled
                  hidden
                />
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
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
              Ville:
              <input
                type="text"
                name="city"
                value={inputs.city || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Identifiant RPPS:
              <input
                type="text"
                name="remark"
                value={inputs.remark || ""}
                onChange={handleChange}
              />
            </label>

            <input type="submit" className={styles.sendButton} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPractitioner;
