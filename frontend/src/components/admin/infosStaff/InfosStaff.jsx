import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./InfosStaff.module.css";

function InfosStaff() {
  const staffId = useParams().id;
  const [staff, setStaff] = useState({});

  useEffect(() => {
    const fetchStaffById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/staff/${staffId}`
        );
        setStaff(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStaffById();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire de modification
  };

  return (
    <div className={styles.ManagementStaffContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/admin/staff">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      {Object.keys(staff).length > 0 && (
        <div className={styles.ManageStaffContainer}>
          <div className={styles.ManagementStaffSelectedContainer}>
            Gestion d'un compte
          </div>
          <div className={styles.ButtonModifyStaffContainer}>
            <form onSubmit={handleSubmit}>Modifier</form>
          </div>
          <div className={styles.ButtonDeleteStaffContainer}>
            <form onSubmit={handleSubmit}>Supprimer</form>
          </div>
          <div className={styles.GenderContainer}>
            <div>
              Sexe
              <div className={styles.RadioButtonContainer}>
                <label>
                  <input
                    type="radio"
                    value="Femme"
                    name="gender"
                    checked={staff.gender === "Femme"}
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
                    value="Homme"
                    name="gender"
                    checked={staff.gender === "Homme"}
                    disabled
                  />
                  <span className={styles.RadioButtonLabelContainer}>
                    Masculin
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.LastNameStaffContainer}>
            <label>
              Nom:
              <input
                type="text"
                name="last_name"
                value={staff.last_name}
                disabled
              />
            </label>
          </div>
          <div className={styles.FirstNameStaffContainer}>
            <label>
              Prénom:
              <input
                type="text"
                name="first_name"
                value={staff.first_name}
                disabled
              />
            </label>
          </div>
          <div className={styles.RoleContainer}>
            <label>
              Rôle:
              <input type="text" name="role" value={staff.roles} disabled />
            </label>
          </div>
          <div className={styles.AgeContainer}>
            <label>
              Age:
              <input type="number" name="age" value={staff.age} disabled />
            </label>
          </div>
          <div className={styles.NationalityContainer}>
            <label>
              Nationalité:
              <input
                type="text"
                name="nationality"
                value={staff.nationality}
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
                value={staff.address}
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
                value={staff.zip_code}
                disabled
              />
            </label>
          </div>
          <div className={styles.CityContainer}>
            <label>
              Ville:
              <input type="text" name="city" value={staff.city} disabled />
            </label>
          </div>
          <div className={styles.PhoneNumberContainer}>
            <label>
              Numéro de téléphone:
              <input type="text" name="phone" value={staff.phone} disabled />
            </label>
          </div>
          <div className={styles.emailContainer}>
            <label>
              E-mail
              <input type="text" name="email" value={staff.email} disabled />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfosStaff;
