import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import styles from "./UnderstandingMobile.module.css";

function UnderstandingMobile() {
  const { countOfOnesUstepOne, setCountOfOnesUstepOne } =
    useContext(UnderstepsContext);

  const [checkedValues, setCheckedValues] = useState([false, false]);

  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  const [videoLink, setVideoLink] = useState("");
  const [pdf1Link, setPdf1Link] = useState("");
  const [typeInter, setTypeInter] = useState("");

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id);
        const statuts = data.map((item) => item.understepStatut);

        const type = data.map((item) => item.type_intervention);

        const underStepsSubset = ids.slice(0, 2);
        const statutsSubset = statuts.slice(0, 2);

        setCheckedValues(statutsSubset);
        setUnderStepIds(underStepsSubset);
        setTypeInter(type[0]);
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
    const fetchResourcesForIntervention = async () => {
      try {
        if (typeInter !== "") {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/resources/type/${typeInter}`
          );
          const { data } = response;

          const videoData = data.find((item) => item.type_resource === "Video");
          const pdfData = data.find((item) => item.type_resource === "Pdf");

          if (videoData) {
            setVideoLink(videoData.link);
          } else {
            setVideoLink("");
          }

          if (pdfData) {
            setPdf1Link(pdfData.link);
          } else {
            setPdf1Link("");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchResourcesForIntervention();
  }, [typeInter]);

  return (
    <div className={styles.understandingMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Comprendre mon opération</p>
        <ProgressBar
          completed={(countOfOnesUstepOne / 2) * 100}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--yellow)"
          bgColor="var(--light-yellow)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.videosAndTitleContainer}>
        <div className={styles.videoAndCheckbox}>
          <p className={styles.blocTitle}>Vidéos</p>
          <input
            type="checkbox"
            checked={checkedValues[0]}
            onChange={handleChange(0)}
          />
        </div>

        <div className={styles.videoBloc}>
          {videoLink && (
            <video
              width="90%"
              height="100%"
              controls
              className={styles.videoStyle}
            >
              <track src="captions.vtt" kind="captions" label="English" />
              <source
                src={`${import.meta.env.VITE_BACKEND_URL}/${videoLink}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className={styles.documentsAndTitleContainer}>
        <div className={styles.videoAndCheckbox}>
          <p className={styles.blocTitle}>Schémas et documentations</p>
          <input
            type="checkbox"
            checked={checkedValues[1]}
            onChange={handleChange(1)}
          />
        </div>

        <div className={styles.documentsContainer}>
          <a href={`${import.meta.env.VITE_BACKEND_URL}/${pdf1Link}`}>
            Document
          </a>
        </div>
      </div>
    </div>
  );
}

export default UnderstandingMobile;
