import React from "react";
import ReactAudioPlayer from "react-audio-player";
import styles from "./PatientMusicPage.module.css";
import music from "../../assets/music_relaxation.mp3";

function PatientMusicPage() {
  return (
    <div className={styles.PatientMusicPageContainer}>
      <div className={styles.audioBloc}>
        <h1 className={styles.musicTitle}>
          Que diriez vous d'un petit moment de relaxation en music?
        </h1>
        <div className={styles.imageContainer} />
        <div className={styles.audioPlayer}>
          <ReactAudioPlayer
            src={music}
            autoPlay={false}
            controls
            style={{
              backgroundColor: "black",
              color: "green",
              caretColor: "green",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientMusicPage;
