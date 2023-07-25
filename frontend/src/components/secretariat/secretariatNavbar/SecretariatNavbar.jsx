import React from "react";
import axios from "axios";
import {
  FaChartBar,
  FaPlusSquare,
  FaRegHospital,
  FaUserInjured,
  FaUserMd,
  FaPowerOff,
} from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./SecretariatNavbar.module.css";

axios.defaults.withCredentials = true;

function SecretariatNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    try {
      // Envoyer une requête POST à la route /logout pour se déconnecter
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`);

      localStorage.removeItem("auth");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Gérer les erreurs éventuelles
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>Serenity</div>
      <div className={styles.pageLinksContainer}>
        <NavLink
          to="/secretariat"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
          end
        >
          <div className={styles.iconAndTextContainer}>
            <FaChartBar className={styles.linkIcons} />
            Dashboard
          </div>
        </NavLink>
        <NavLink
          to="/secretariat/unit"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaRegHospital className={styles.linkIcons} />
            Services
          </div>
        </NavLink>
        <NavLink
          to="/secretariat/practitioner"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaUserMd className={styles.linkIcons} />
            Praticiens
          </div>
        </NavLink>
        <NavLink
          to="/secretariat/patient"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaUserInjured className={styles.linkIcons} />
            Patients
          </div>
        </NavLink>
        <NavLink
          to="/secretariat/intervention"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaPlusSquare className={styles.linkIcons} />
            Interventions
          </div>
        </NavLink>
      </div>
      <div className={styles.separator} />
      <div className={styles.newsContainer}>
        {/* <NavLink
          to="/secretariat/messagerie"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaRocketchat className={styles.linkIcons} />
            Messagerie
          </div>
        </NavLink> */}
      </div>
      <div className={styles.logoutContainer}>
        <Link to="/" className={styles.logoutLink} onClick={handleLogout}>
          <div className={styles.iconAndTextContainer}>
            <FaPowerOff className={styles.linkIcons} />
            Log out
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SecretariatNavbar;
