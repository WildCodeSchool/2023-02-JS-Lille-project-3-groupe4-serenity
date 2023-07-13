import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import UnderstandingMobile from "../../components/patient/understandingMobile/UnderstandingMobile";
import VideoModal from "../../components/videoModal/VideoModal";
import UnderstepsContext from "../../contexts/UnderstepsContext";
import styles from "./PatientUnderstandingPage.module.css";

function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const { setCountOfOnesUstepOne } = useContext(UnderstepsContext);

  const [checkedValues, setCheckedValues] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [videoLink, setVideoLink] = useState("");
  const [setPdf1Link] = useState("");
  const [setPdf2Link] = useState("");
  const [setPdf3Link] = useState("");

  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id);
        const statuts = data.map((item) => item.understepStatut);

        const underStepsSubset = ids.slice(0, 4);
        const statutsSubset = statuts.slice(0, 4);

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
          statutUnderstep: checked ? 1 : 0, // Si la case est cochée, le statut est mis à 1, sinon à 0
        }
      )
      .then(() => {
        if (checked) {
          setCountOfOnesUstepOne((prevCount) => prevCount + 1);
        } else {
          setCountOfOnesUstepOne((prevCount) => prevCount - 1);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
      });
  };

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const response = await axios.get("http://localhost:5050/resources");
        const { data } = response;
        if (data.length > 0) {
          setVideoLink(data[5].link);
          setPdf1Link(data[6].link);
          setPdf2Link(data[7].link);
          setPdf3Link(data[8].link);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideoLink();
  }, []);

  return (
    <div className={styles.understandingPageContainer}>
      {isTabletOrMobile && <UnderstandingMobile />}
      {isDesktop && (
        <div className={styles.understandingDesktopContainer}>
          <div className={styles.prepContainer}>
            <div className={styles.leftContainer}>
              <p className={styles.docsTitle}>Schémas et documentations</p>
              <div className={styles.docsContainer}>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[0]}
                      onChange={handleChange(0)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[1]}
                      onChange={handleChange(1)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[2]}
                      onChange={handleChange(2)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <p className={styles.docsTitle}>Vidéos</p>
              <div className={styles.videosContainer}>
                <div className={styles.videoCardAndName}>
                  <div className={styles.videoCard}>
                    <div className={styles.topCard}>
                      <input
                        type="checkbox"
                        checked={checkedValues[3]}
                        onChange={handleChange(3)}
                      />
                    </div>
                    <div className={styles.bottomCard}>
                      <VideoModal
                        videoTitle="Video du Dr Noailles"
                        videoLink={`http://localhost:5050/${videoLink}`}
                      />
                    </div>
                  </div>
                  <div className={styles.videoTextBloc}>
                    <p className={styles.videoName}>Vidéo du Dr Noailles</p>
                    <p className={styles.videoTime}>5 min</p>

                    {/* {videoLink && (
                      <video width="560" height="315" controls>
                        <track
                          src="captions.vtt"
                          kind="captions"
                          label="English"
                        />
                        <source
                          src={`http://localhost:5050/${videoLink}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    )} */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className={styles.rightContainer}>
              <p className={styles.docsTitle}>Documents PDF</p>
              <div className={styles.pdfsContainer}>
                <div>
                  <iframe
                    src={`http://localhost:5050/${pdf1Link}`}
                    title="PDF Document 1"
                    width="100%"
                    height="500px"
                  />
                </div>
                <div>
                  <iframe
                    src={`http://localhost:5050/${pdf2Link}`}
                    title="PDF Document 2"
                    width="100%"
                    height="500px"
                  />
                </div>
                <div>
                  <iframe
                    src={`http://localhost:5050/${pdf3Link}`}
                    title="PDF Document 3"
                    width="100%"
                    height="500px"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientUnderstandingPage;
