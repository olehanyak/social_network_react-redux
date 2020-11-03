import React from "react";
import styles from "./Preloader.module.css";
import preloader from "../../assets/img/pinwheel.svg";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt="Preload" />
    </div>
  );
};

export default Preloader;
