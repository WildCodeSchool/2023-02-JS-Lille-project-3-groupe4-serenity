import { StyledEngineProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import InfosModal from "../../components/infosModal/InfosModal";
import PaperworksMobile from "../../components/patient/paperworksMobile/PaperworksMobile";
import UnderstepsContext from "../../contexts/UnderstepsContext";
import styles from "./PatientPaperworkPage.module.css";

function PatientPaperworkPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  const [checkedValues, setCheckedValues] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [underStepIds, setUnderStepIds] = useState([]);

  const { setCountOfOnesUstepTwo } = useContext(UnderstepsContext);

  const { idPatient, idInter } = useParams();

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id);
        const statuts = data.map((item) => item.understepStatut);

        const underStepsSubset = ids.slice(2, 7);
        const statutsSubset = statuts.slice(2, 7);

        setCheckedValues(statutsSubset);
        setUnderStepIds(underStepsSubset);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStep();
  }, [idInter]);

  const handleChange = (index) => (event) => {
    const { checked } = event.target;

    setCheckedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = checked;
      return newValues;
    });

    const firstFiveUnderStepIds = underStepIds;

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/steps/${
          firstFiveUnderStepIds[index]
        }`,
        {
          statutUnderstep: checked ? 1 : 0,
        }
      )
      .then(() => {
        if (checked) {
          setCountOfOnesUstepTwo((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        } else {
          setCountOfOnesUstepTwo((prevCount) => prevCount - 1); // Decrement onesCountUstepOne by 1 if checkbox is unchecked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
  };

  return (
    <div className={styles.paperworkPageContainer}>
      {isTabletOrMobile && <PaperworksMobile />}
      {isDesktop && (
        <div className={styles.paperworksDesktopPage}>
          <div className={styles.prepContainer}>
            <div className={styles.fullCard}>
              <div className={`${styles.documentCard} ${styles.infoPatient}`}>
                <div className={styles.topCard}>
                  <input
                    type="checkbox"
                    checked={checkedValues[0]}
                    onChange={handleChange(0)}
                  />
                </div>
                <Link
                  to={`/patient/${idPatient}/${idInter}/understanding/paperwork/infospatient`}
                  className={styles.linkContainer}
                >
                  <div className={styles.bottomCard} />
                </Link>
              </div>
              <p className={styles.infosCard}>Données administratives</p>
            </div>

            <div className={styles.fullCard}>
              <div className={`${styles.documentCard} ${styles.insurance}`}>
                <div className={styles.topCard}>
                  <input
                    type="checkbox"
                    checked={checkedValues[1]}
                    onChange={handleChange(1)}
                  />
                </div>

                <div className={styles.bottomCard}>
                  <StyledEngineProvider>
                    <InfosModal
                      titleText="Votre mutuelle"
                      infosText="Avez-vous penser à nous envoyer votre carte de mutuelle ou à leur demander un accord de prise en charge pour votre hospitalisation ?"
                    />
                  </StyledEngineProvider>
                </div>
              </div>
              <p className={styles.infosCard}>Votre mutuelle</p>
            </div>
            <div className={styles.fullCard}>
              <div className={`${styles.documentCard} ${styles.contract}`}>
                <div className={styles.topCard}>
                  <input
                    type="checkbox"
                    checked={checkedValues[2]}
                    onChange={handleChange(2)}
                  />
                </div>
                <div className={styles.bottomCard}>
                  <StyledEngineProvider>
                    <InfosModal
                      titleText="Consentement éclairé"
                      infosText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                  </StyledEngineProvider>
                </div>
              </div>
              <p className={styles.infosCard}>Consentement éclairé</p>
            </div>
            <div className={styles.fullCard}>
              <div className={`${styles.documentCard} ${styles.doctor}`}>
                <div className={styles.topCard}>
                  <input
                    type="checkbox"
                    checked={checkedValues[3]}
                    onChange={handleChange(3)}
                  />
                </div>
                <div className={styles.bottomCard}>
                  {" "}
                  <StyledEngineProvider>
                    <InfosModal
                      titleText="Votre anesthésiste"
                      infosText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                  </StyledEngineProvider>
                </div>
              </div>
              <p className={styles.infosCard}>Votre anesthésiste</p>
            </div>
            <div className={styles.fullCard}>
              <div className={`${styles.documentCard} ${styles.invoice}`}>
                <div className={styles.topCard}>
                  <input
                    type="checkbox"
                    checked={checkedValues[4]}
                    onChange={handleChange(4)}
                  />
                </div>
                <div className={styles.bottomCard}>
                  <StyledEngineProvider>
                    <InfosModal
                      titleText="Votre anesthésiste"
                      infosText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                  </StyledEngineProvider>
                </div>
              </div>
              <p className={styles.infosCard}>Signature du devis</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPaperworkPage;
