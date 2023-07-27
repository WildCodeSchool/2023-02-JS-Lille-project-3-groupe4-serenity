import React from "react";
import {
  FaChartBar,
  FaPlusSquare,
  FaPowerOff,
  FaUserInjured,
} from "react-icons/fa";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import styles from "./PratictionnerNavbarDesktop.module.css";

function PratictionnerNavbarDesktop() {
  const { auth } = useAuth();
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
      <div className={styles.logoContainer}>Serenity</div>
      <div className={styles.pageLinksContainer}>
        <NavLink
          to={`/practitioner/${auth.identifierRpps}`}
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
          to={`/practitioner/patient/${auth.identifierRpps}`}
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
          to={`/practitioner/interventions/${auth.identifierRpps}`}
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
          to="/admin/notifications"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaBell className={styles.linkIcons} />
            Notifications
          </div>
        </NavLink>
        <NavLink
          to="/admin/messagerie"
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

export default PratictionnerNavbarDesktop;
