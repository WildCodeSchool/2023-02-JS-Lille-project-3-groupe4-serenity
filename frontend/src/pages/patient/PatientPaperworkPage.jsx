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
                      infosText="Le consentement préalable et libre du citoyen est indispensable pour tout acte médical, sauf nécessité thérapeutique et incapacité à consentir. Il doit être éclairé, basé sur une information préalable des actes, des risques prévisibles et des conséquences. Le citoyen a le droit de refuser ou d'interrompre un acte médical, et peut demander un délai de réflexion ou un autre avis. Pour les mineurs, le consentement est donné par les détenteurs de l'autorité parentale, sauf risque pour la santé du mineur. Le médecin peut saisir le Procureur de la République pour prendre des mesures d'assistance éducative. L'avis du mineur doit être pris en compte. Pour les incapables majeurs, l'avis de la personne est important, sauf décision judiciaire spécifique. Le consentement des représentants légaux peut être requis. Le médecin peut saisir le Procureur de la République si le refus du représentant met en danger la santé du majeur protégé."
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
                      infosText="Avant une opération, il est obligatoire de consulter un médecin anesthésiste-réanimateur selon le décret n° 94-1 050 du 5 décembre 1994. Cette consultation a lieu plusieurs jours avant l'intervention pour permettre une préparation adéquate. L'objectif de cette consultation est triple. Tout d'abord, elle vise à vous préparer en prescrivant ou en arrêtant les traitements nécessaires pour aborder l'opération dans les meilleures conditions et en effectuant un bilan de santé. Ensuite, elle a pour but de vous informer sur les différentes techniques d'anesthésie, les possibilités de prise en charge de la douleur et la nécessité éventuelle d'une transfusion sanguine, afin que vous puissiez donner un consentement éclairé à l'intervention. Enfin, elle vous permet d'évaluer avec le médecin anesthésiste, à la fin de la consultation, les bénéfices de l'intervention en fonction des risques liés à votre état de santé et des contraintes spécifiques de l'acte opératoire."
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
                      titleText="Signature du devis"
                      infosText="Le devis médical est un document essentiel présentant les soins et les coûts associés. Il clarifie les obligations du patient et du professionnel de santé pour prévenir les litiges. Les éléments obligatoires d'un devis sont : la date de création, la durée de validité, le nom et l'adresse du client, le début et la durée estimée de la prestation, la TVA, ainsi qu'un décompte détaillé des prestations et produits avec leurs quantités et prix unitaires. Il est important de noter que le patient n'est pas obligé de signer le devis avant une opération chirurgicale. Cependant, si le patient refuse de signer le devis, le chirurgien sera dans l'obligation de refuser d'effectuer l'opération. Le devis médical permet aux patients de comprendre clairement les services et les coûts associés, favorisant la transparence. Il établit les termes dès le départ, créant une relation de confiance et offrant une protection en cas de désaccord ou de litige."
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
