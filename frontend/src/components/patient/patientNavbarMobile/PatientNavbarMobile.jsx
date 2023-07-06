import React from "react";
import { FaHome, FaRegBell, FaMusic } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
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
        <HiOutlineChatBubbleOvalLeftEllipsis className={styles.menuChatIcon} />
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
  setMenuOpen: PropTypes.func.isRequired,
};

export default PatientNavbarMobile;
