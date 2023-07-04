import React from "react";
import { FaHome, FaRegBell, FaMusic, FaRocketchat } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import PropTypes from "prop-types";
import styles from "./NavbarMobile.module.css";

function PatientNavbarMobile({ isMenuOpen, setMenuOpen }) {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarIconContainer}>
        <FaHome className={styles.menuIcon} />
      </div>
      <div className={styles.navbarIconContainer}>
        <FaRegBell className={styles.menuIcon} />
      </div>
      <div className={styles.navbarChatContainer}>
        <FaRocketchat className={styles.menuChatIcon} />
      </div>
      <div className={styles.navbarIconContainer}>
        <FaMusic className={styles.menuIcon} />
      </div>
      <div className={styles.navbarIconContainer}>
        <MdOutlineMenu
          className={styles.menuIcon}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </div>
    </div>
  );
}

PatientNavbarMobile.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.bool.isRequired,
};

export default PatientNavbarMobile;
