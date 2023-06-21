import React from "react";
import {
  FaChartBar,
  FaPlusSquare,
  FaRegHospital,
  FaRocketchat,
  FaUserInjured,
  FaUserMd,
  FaPowerOff,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import styles from "./SecretariatNavbar.module.css";

function SecretariatNavbar() {
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
        <NavLink
          to="/secretariat/messagerie"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaRocketchat className={styles.linkIcons} />
            Messagerie
          </div>
        </NavLink>
      </div>
      <div className={styles.logoutContainer}>
        <Link to="/" className={styles.logoutLink}>
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
