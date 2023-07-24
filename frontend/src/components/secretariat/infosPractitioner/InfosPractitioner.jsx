import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./InfosPractitioner.module.css";

function InfosPractitioner() {
  const identifierRpps = useParams().identifier_rpps;
  const [practicien, setPracticien] = useState({});

  useEffect(() => {
    const fetchPracticienByIdentifierRpps = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/practitioners/${identifierRpps}`
        );
        setPracticien(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPracticienByIdentifierRpps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire de modification
  };

  return (
    <div className={styles.managementPractitionerContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/practitioner">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      {Object.keys(practicien).length > 0 && (
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
          <div className={styles.GenderContainer}>
            <div>
              Sexe
              <div className={styles.RadioButtonContainer}>
                <label>
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    checked={practicien.gender === "Female"}
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
                    value="male"
                    name="gender"
                    checked={practicien.gender === "Male"}
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
                value={practicien.last_name}
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
                value={practicien.first_name}
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
                value={practicien.identifier_rpps}
                disabled
              />
            </label>
          </div>
          <div className={styles.AgeContainer}>
            <label>
              Age:
              <input type="number" name="age" value={practicien.age} disabled />
            </label>
          </div>
          <div className={styles.NationalityContainer}>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={practicien.nationality}
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
                value={practicien.address}
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
                value={practicien.zip_code}
                disabled
              />
            </label>
          </div>
          <div className={styles.CityContainer}>
            <label>
              Ville:
              <input type="text" name="city" value={practicien.city} disabled />
            </label>
          </div>
          <div className={styles.PhoneNumberContainer}>
            <label>
              Numéro de téléphone:
              <input
                type="text"
                name="phone"
                value={practicien.phone}
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
                value={practicien.email}
                disabled
              />
            </label>
          </div>
          <div className={styles.ImportantContainer}>Important</div>
          <div className={styles.SpecialityContainer}>
            <label>
              Spécialité:
              <input
                className={styles.multipleChoicesMenu}
                name="speciality"
                value={practicien.speciality}
                disabled
              />
            </label>
          </div>
          <div className={styles.ServiceContainer}>
            <label>
              Nom service:
              <input
                className={styles.multipleChoicesMenu}
                name="nom_service"
                value={practicien.nom_service}
                disabled
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfosPractitioner;
