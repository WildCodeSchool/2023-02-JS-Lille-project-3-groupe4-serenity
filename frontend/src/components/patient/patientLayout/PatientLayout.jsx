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
      {isDesktop && <PatientHeaderDesktop />}
      {isTabletOrMobile && <PatientHeaderMobile />}
      <div className={styles.patientContent}>
        <Outlet />
      </div>
      {isDesktop && <PatientNavbarDesktop />}
      {isTabletOrMobile && <PatientNavbarMobile />}
    </div>
  );
}

export default PatientLayout;
