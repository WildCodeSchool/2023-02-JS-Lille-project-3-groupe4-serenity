import React from "react";
import {
  FaRocketchat,
  FaPowerOff,
  FaRegBell,
  FaAddressBook,
  FaMusic,
  FaOm,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import styles from "./PatientNavbarDesktop.module.css";

function PatientNavbarDesktop() {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>Serenity</div>
      <div className={styles.pageLinksContainer}>
        <NavLink
          to="/patient/understanding/initiation/6/26"
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
          to="/patient/breathe"
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
          to="/patient/music"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaMusic className={styles.linkIcons} />
            Musique
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
            <FaRegBell className={styles.linkIcons} />
            Notifications
          </div>
        </NavLink>
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

export default PatientNavbarDesktop;
