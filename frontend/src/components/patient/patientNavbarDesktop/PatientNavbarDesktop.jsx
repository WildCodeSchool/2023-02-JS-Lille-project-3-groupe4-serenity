import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPowerOff, FaAddressBook, FaMusic, FaOm } from "react-icons/fa";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import styles from "./PatientNavbarDesktop.module.css";

axios.defaults.withCredentials = true;

function PatientNavbarDesktop() {
  const { idInter, idPatient } = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    try {
      // Envoyer une requête POST à la route /logout pour se déconnecter
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`);

      localStorage.removeItem("auth");
      toast.success("Déconnexion réussie !", {
        progressClassName: styles.toastProgress,
        autoClose: 1500,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // Gérer les erreurs éventuelles
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer} />
      <div className={styles.pageLinksContainer}>
        <NavLink
          to={`/patient/${idPatient}/${idInter}/understanding`}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaAddressBook className={styles.linkIcons} />
            Ma préparation
          </div>
        </NavLink>
        <NavLink
          to={`/patient/${idPatient}/${idInter}/breathe`}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaOm className={styles.linkIcons} />
            Gagner en sérénité
          </div>
        </NavLink>
        <NavLink
          to={`/patient/${idPatient}/${idInter}/music`}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
          end
        >
          <div className={styles.iconAndTextContainer}>
            <FaMusic className={styles.linkIcons} />
            Musique
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
            Déconnexion
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PatientNavbarDesktop;
