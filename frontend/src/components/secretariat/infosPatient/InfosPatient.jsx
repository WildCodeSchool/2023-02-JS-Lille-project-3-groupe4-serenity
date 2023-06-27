import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
/* import axios from "axios"; */
import styles from "./InfosPatient.module.css";

function AddPatient() {
  const [inputs] = useState({});

  /*   const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  }; */

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
                value={inputs.last_name || ""}
                disabled
              />
            </label>
            <label>
              Téléphone:
              <input
                type="text"
                name="phone"
                value={inputs.phone || ""}
                disabled
              />
            </label>
            <label>
              Adresse:
              <input
                type="text"
                name="address"
                value={inputs.address || ""}
                disabled
              />
            </label>
            <label>
              Groupe sanguin:
              <input
                type="text"
                name="bloog_group"
                value={inputs.blood_group || ""}
                disabled
              />
            </label>
            <label>
              N° sécurité sociale:
              <input
                type="text"
                name="social_secu_number"
                value={inputs.social_secu_number || ""}
                disabled
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={inputs.email || ""}
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
                value={inputs.first_name || ""}
                disabled
              />
            </label>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={inputs.nationality || ""}
                disabled
              />
            </label>
            <label>
              Code postal:
              <input
                type="text"
                name="zip_code"
                value={inputs.zip_code || ""}
                disabled
              />
            </label>
            <label>
              Allergies:
              <input
                type="text"
                name="allergy"
                value={inputs.allergy || ""}
                disabled
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="gender"
                value={inputs.gender || ""}
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
                value={inputs.age || ""}
                disabled
              />
            </label>

            <div className={styles.divFake} />

            <label>
              Ville:
              <input
                type="text"
                name="city"
                value={inputs.city || ""}
                disabled
              />
            </label>
            <label>
              Remarques:
              <input
                type="text"
                name="remark"
                value={inputs.remark || ""}
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
