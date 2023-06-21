import React from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import PatientHeaderDesktop from "../patientHeaderDesktop/PatientHeaderDesktop";
import PatientHeaderMobile from "../patientHeaderMobile/PatientHeaderMobile";
import PatientNavbarDesktop from "../patientNavbarDesktop/PatientNavbarDesktop";
import PatientNavbarMobile from "../patientNavbarMobile/PatientNavbarMobile";
import styles from "./PatientLayout.module.css";

function PatientLayout() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div>
      {isDesktop && (
        <div className={styles.patientLayoutDesktopContainer}>
          <PatientNavbarDesktop />
          <div className={styles.headerAndPageDesktopContainer}>
            <PatientHeaderDesktop />
            <div className={styles.outletDesktopContainer}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={styles.patientLayoutMobileContainer}>
          <PatientHeaderMobile />
          <div className={styles.outletMobileContainer}>
            <Outlet />
          </div>
          <PatientNavbarMobile />
        </div>
      )}
    </div>
  );
}

export default PatientLayout;
