import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet, NavLink } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import PatientHeaderDesktop from "../patientHeaderDesktop/PatientHeaderDesktop";
import PatientHeaderMobile from "../patientHeaderMobile/PatientHeaderMobile";
import PatientNavbarDesktop from "../patientNavbarDesktop/PatientNavbarDesktop";
import PatientNavbarMobile from "../patientNavbarMobile/PatientNavbarMobile";
import styles from "./PatientLayout.module.css";

function PatientLayout() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  const [isMenuOpen, setMenuOpen] = useState(false);

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
          {isMenuOpen && (
            <div
              className={`${styles.menuContainer} ${isMenuOpen ? "open" : ""}`}
            >
              <div className={styles.closeContainer}>
                <FaRegWindowClose
                  className={styles.closeIcon}
                  onClick={() => setMenuOpen(false)}
                />
              </div>
              <div className={styles.linkContainer}>
                <h2 className={styles.linkText}>
                  <NavLink
                    to="/patient/understanding"
                    className={({ isActive }) =>
                      isActive ? styles.activeLinkText : styles.linkText
                    }
                    onClick={() => setMenuOpen(false)}
                    end
                  >
                    Comprendre mon opération
                  </NavLink>
                </h2>

                <h2 className={styles.linkText}>
                  <NavLink
                    to="/patient/understanding/paperwork"
                    className={({ isActive }) =>
                      isActive ? styles.activeLinkText : styles.linkText
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Formalités adminitratives
                  </NavLink>
                </h2>
                <h2 className={styles.linkText}>
                  <NavLink
                    to="/patient/understanding/serenity"
                    className={({ isActive }) =>
                      isActive ? styles.activeLinkText : styles.linkText
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Préparer mon arrivée
                  </NavLink>
                </h2>
                <h2 className={styles.linkText}>
                  <NavLink
                    to="/patient/understanding/outboarding"
                    className={({ isActive }) =>
                      isActive ? styles.activeLinkText : styles.linkText
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Anticiper ma sortie
                  </NavLink>
                </h2>
                <h2 className={styles.linkText}>
                  <NavLink
                    to="/patient/understanding/checklist"
                    className={({ isActive }) =>
                      isActive ? styles.activeLinkText : styles.linkText
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Ma checklist
                  </NavLink>
                </h2>
                <div className={styles.separator} />
                <h2 className={styles.linkText}>Test</h2>
              </div>
            </div>
          )}
          <PatientHeaderMobile />
          <div className={styles.outletMobileContainer}>
            <Outlet />
          </div>
          <PatientNavbarMobile
            isMenuOpen={isMenuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      )}
    </div>
  );
}

export default PatientLayout;
