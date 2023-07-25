import React, { useState, useEffect, useContext } from "react";
import { FaHome, FaRegBell, FaMusic } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdOutlineMenu } from "react-icons/md";
import PropTypes from "prop-types";
import NotificationsModalMobile from "../notificationsModal/NotificationsModalMobile";
import styles from "./NavbarMobile.module.css";
import UnderstepsContext from "../../../contexts/UnderstepsContext";

function PatientNavbarMobile({ isMenuOpen, setMenuOpen }) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [progressTotal, setProgressTotal] = useState(0);

  const handleNotificationClick = () => {
    setIsNotificationVisible(false);
  };

  const {
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  } = useContext(UnderstepsContext);

  useEffect(() => {
    const sum =
      countOfOnesUstepOne +
      countOfOnesUstepTwo +
      countOfOnesUstepThree +
      countOfOnesUstepFour +
      countOfOnesUstepFive;

    const percentage = Math.round((sum / 16) * 100);
    setProgressTotal(percentage);
  }, [
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  ]);

  useEffect(() => {
    if (progressTotal < 100) {
      setIsNotificationVisible(true);
    }
  }, []);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarIconContainer}>
        <FaHome className={styles.menuIcon} />
      </div>
      <div
        className={styles.navbarIconContainer}
        onClick={handleNotificationClick}
        onKeyDown={(e) => {
          // Handle keyboard accessibility
          if (e.key === "Enter" || e.key === " ") {
            handleNotificationClick();
          }
        }}
        tabIndex={0} // Add tabIndex to make it focusable
        role="button"
      >
        {isNotificationVisible && <div className={styles.notificationNumber} />}
        <FaRegBell className={styles.menuIcon} />
        {progressTotal === 100 ? (
          <NotificationsModalMobile
            infosText={`Félicitations, Vous êtes à ${progressTotal}% de taux de complétion de vos démarches et êtes maintenant prêt(e) pour votre intervention !`}
          />
        ) : (
          <NotificationsModalMobile
            infosText={`Vous êtes à ${progressTotal}% de taux de complétion de vos démarches, pensez à à toutes les compléter avant votre intervention !`}
          />
        )}
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
