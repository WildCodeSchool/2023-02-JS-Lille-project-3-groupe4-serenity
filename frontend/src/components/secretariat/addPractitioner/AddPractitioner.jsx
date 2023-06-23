import axios from "axios";
import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AddPractitioner.module.css";

function AddPractitioner() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5050/practitioners", inputs);
      navigate("/secretariat/practitioner");
    } catch (err) {
      console.error(err);
    }
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
                name="address"
                value={inputs.address || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Spécialité:
              <select
                className={styles.multipleChoicesMenu}
                name="speciality"
                value={inputs.speciality || ""}
                onChange={handleChange}
              >
                <option
                  value=""
                  aria-label="Select list for speciality"
                  disabled
                  hidden
                />
                <option value="Cardiologie">Cardiologie</option>
                <option value="Orthopédie">Orthopédie</option>
                <option value="Chirurgie Dentaire">Chirurgie Dentaire</option>
                <option value="Chirurgie esthétique">
                  Chirurgie esthétique
                </option>
              </select>
            </label>
            <label>
              Nom service:
              <select
                className={styles.multipleChoicesMenu}
                name="nom_service"
                value={inputs.nom_service || ""}
                onChange={handleChange}
              >
                <option
                  value=""
                  aria-label="Select list for service"
                  disabled
                  hidden
                />
                <option value="Cardiologie">Cardiologie</option>
                <option value="Chirurgie orthopédique">
                  Chirurgie orthopédique
                </option>
                <option value="Chirurgie dentaire">Chirurgie dentaire</option>
                <option value="Neurologie">Neurologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Reanimation">Réanimation</option>
              </select>
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
              Type d'intervention:
              <select
                className={styles.multipleChoicesMenu}
                name="type_intervention"
                value={inputs.type_intervention || ""}
                onChange={handleChange}
              >
                <option
                  value=""
                  aria-label="Select list for intervention type"
                  disabled
                  hidden
                />
                <option value="Chirurgie">Chirurgie</option>
                <option value="Pose implant">Pose implant</option>
              </select>
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
                name="identifier_rpps"
                value={inputs.identifier_rpps || ""}
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
