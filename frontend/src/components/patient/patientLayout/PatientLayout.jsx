import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet, useParams } from "react-router-dom";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import PatientHeaderDesktop from "../patientHeaderDesktop/PatientHeaderDesktop";
import PatientHeaderMobile from "../patientHeaderMobile/PatientHeaderMobile";
import PatientNavbarDesktop from "../patientNavbarDesktop/PatientNavbarDesktop";
import PatientNavbarMobile from "../patientNavbarMobile/PatientNavbarMobile";
import PatientPreparationMenu from "../patientPreparationMenu/PatientPreparationMenu";
import styles from "./PatientLayout.module.css";

function PatientLayout() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { idInter, idPatient } = useParams();

  const [ustepOne, setUstepOne] = useState([]);
  const [ustepTwo, setUstepTwo] = useState([]);
  const [ustepThree, setUstepThree] = useState([]);
  const [ustepFour, setUstepFour] = useState([]);
  const [ustepFive, setUstepFive] = useState([]);
  const [countOfOnesUstepOne, setCountOfOnesUstepOne] = useState(0);
  const [countOfOnesUstepTwo, setCountOfOnesUstepTwo] = useState(0);
  const [countOfOnesUstepThree, setCountOfOnesUstepThree] = useState(0);
  const [countOfOnesUstepFour, setCountOfOnesUstepFour] = useState(0);
  const [countOfOnesUstepFive, setCountOfOnesUstepFive] = useState(0);

  const contextValue = React.useMemo(
    () => ({
      countOfOnesUstepOne,
      setCountOfOnesUstepOne,
      countOfOnesUstepTwo,
      setCountOfOnesUstepTwo,
      countOfOnesUstepThree,
      setCountOfOnesUstepThree,
      countOfOnesUstepFour,
      setCountOfOnesUstepFour,
      countOfOnesUstepFive,
      setCountOfOnesUstepFive,
    }),
    [
      countOfOnesUstepOne,
      countOfOnesUstepTwo,
      countOfOnesUstepThree,
      countOfOnesUstepFour,
      countOfOnesUstepFive,
    ]
  );

  useEffect(() => {
    const fetchStep = async () => {
      try {
        // Requête HTTP GET pour récupérer les données des étapes de l'intervention spécifiée
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        setUstepOne(response.data.slice(0, 2));
        setUstepTwo(response.data.slice(2, 7));
        setUstepThree(response.data.slice(7, 10));
        setUstepFour(response.data.slice(10, 11));
        setUstepFive(response.data.slice(11, 16));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStep();
  }, []);

  useEffect(() => {
    const onesCountUstepOne = ustepOne.reduce((count, step) => {
      return count + (step.understepStatut === 1 ? 1 : 0);
    }, 0);
    setCountOfOnesUstepOne(onesCountUstepOne);

    // Calculate the count of "1" values in ustepTwo
    const onesCountUstepTwo = ustepTwo.reduce((count, step) => {
      return count + (step.understepStatut === 1 ? 1 : 0);
    }, 0);
    setCountOfOnesUstepTwo(onesCountUstepTwo);

    // Calculate the count of "1" values in ustepThree
    const onesCountUstepThree = ustepThree.reduce((count, step) => {
      return count + (step.understepStatut === 1 ? 1 : 0);
    }, 0);
    setCountOfOnesUstepThree(onesCountUstepThree);

    // Calculate the count of "1" values in ustepFour
    const onesCountUstepFour = ustepFour.reduce((count, step) => {
      return count + (step.understepStatut === 1 ? 1 : 0);
    }, 0);
    setCountOfOnesUstepFour(onesCountUstepFour);

    // Calculate the count of "1" values in ustepFive
    const onesCountUstepFive = ustepFive.reduce((count, step) => {
      return count + (step.understepStatut === 1 ? 1 : 0);
    }, 0);
    setCountOfOnesUstepFive(onesCountUstepFive);
  }, [ustepOne, ustepTwo, ustepThree, ustepFour, ustepFive]);

  return (
    <UnderstepsContext.Provider value={contextValue}>
      <div>
        {isDesktop && (
          <div className={styles.patientLayoutDesktopContainer}>
            <PatientNavbarDesktop />
            <div className={styles.headerAndPageDesktopContainer}>
              <PatientHeaderDesktop />
              <PatientPreparationMenu />
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
                className={`${styles.menuContainer} ${
                  isMenuOpen ? "open" : ""
                }`}
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
                      to={`/patient/${idPatient}/${idInter}/understanding`}
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
                      to={`/patient/${idPatient}/${idInter}/understanding/paperwork`}
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
                      to={`/patient/${idPatient}/${idInter}/understanding/serenity`}
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
                      to={`/patient/${idPatient}/${idInter}/understanding/outboarding`}
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
                      to={`/patient/${idPatient}/${idInter}/understanding/checklist`}
                      className={({ isActive }) =>
                        isActive ? styles.activeLinkText : styles.linkText
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Ma checklist
                    </NavLink>
                  </h2>
                  <div className={styles.separator} />
                  <h2 className={styles.linkText}>
                    <NavLink
                      to={`/patient/${idPatient}/${idInter}/breathe`}
                      className={({ isActive }) =>
                        isActive ? styles.activeLinkText : styles.linkText
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Meditation
                    </NavLink>
                  </h2>
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
    </UnderstepsContext.Provider>
  );
}

export default PatientLayout;
