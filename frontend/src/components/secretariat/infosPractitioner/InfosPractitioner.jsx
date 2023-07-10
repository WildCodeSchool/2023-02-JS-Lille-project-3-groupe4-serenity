import axios from "axios";
import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styles from "./InfosPractitioner.module.css";

function InfosPractitioner() {
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
    <div className={styles.managementPractitionerContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/practitioner">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.ManagePractitionerContainer}>
        <div className={styles.ManagementPractitionerSelectedContainer}>
          Gestion d'un praticien
        </div>
        <div className={styles.ButtonModifyPractitionerContainer}>
          <form onSubmit={handleSubmit}>Modifier</form>
        </div>
        <div className={styles.ButtonDeletePractitionerContainer}>
          <form onSubmit={handleSubmit}>Supprimer</form>
        </div>
        <div className={styles.MaritalStatusContainer}>Etat Civil</div>
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
                  value="masculin"
                  name="sex"
                  checked={inputs.sex === "masculin"}
                  onChange={handleChange}
                  disabled
                />
                <span className={styles.RadioButtonLabelContainer}>
                  Masculin
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.LastNamePractitionerContainer}>
          <label>
            Nom:
            <input
              type="text"
              name="last_name"
              value={inputs.last_name || ""}
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
        <div className={styles.FirstNamePractitionerContainer}>
          <label>
            Prénom:
            <input
              type="text"
              name="first_name"
              value={inputs.first_name || ""}
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
        <div className={styles.IdentifierRppsContainer}>
          <label>
            N. d'identifiant RPPS:
            <input
              type="text"
              name="identifier_rpps"
              value={inputs.identifier_rpps || ""}
              onChange={handleChange}
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
              value={inputs.age || ""}
              onChange={handleChange}
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
              value={inputs.nationality || ""}
              onChange={handleChange}
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
              value={inputs.address || ""}
              onChange={handleChange}
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
              value={inputs.zip_code || ""}
              onChange={handleChange}
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
              value={inputs.city || ""}
              onChange={handleChange}
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
              value={inputs.phone || ""}
              onChange={handleChange}
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
              value={inputs.email || ""}
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
        <div className={styles.ImportantContainer}>Important</div>
        <div className={styles.SpecialityContainer}>
          <label>
            Spécialité:
            <select
              className={styles.multipleChoicesMenu}
              name="speciality"
              value={inputs.speciality || ""}
              onChange={handleChange}
              disabled
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
              <option value="Chirurgie esthétique">Chirurgie esthétique</option>
            </select>
          </label>
        </div>
        <div className={styles.ServiceContainer}>
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
        <div className={styles.RemarkContainer}>
          <label>
            Remarques:
            <input
              type="text"
              name="remark"
              value={inputs.remark || ""}
              onChange={handleChange}
              disabled
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default InfosPractitioner;
