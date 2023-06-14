import React from "react";
import {
  FaChartBar,
  FaPlusSquare,
  FaRegHospital,
  FaRocketchat,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./AdminNavbar.module.css";

function AdminNavbar() {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>Serenity</div>
      <div className={styles.pageLinksContainer}>
        <NavLink
          to="/admin"
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
          to="/admin/unit"
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
          to="/admin/practitioner"
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
          to="/admin/patient"
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
          to="/admin/intervention"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.pendingLink
          }
        >
          <div className={styles.iconAndTextContainer}>
            <FaPlusSquare className={styles.linkIcons} />
            Intervention
          </div>
        </NavLink>
      </div>
      <div className={styles.separator} />
      <div className={styles.newsContainer}>
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
        </NavLink>
      </div>
    </div>
  );
}

export default AdminNavbar;
