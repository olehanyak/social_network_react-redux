import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <i className="fab fa-angellist iconFingersVictory"></i>
      {/* <img
                className={styles.header__icon}
                src="https://f0.pngfuel.com/png/497/515/facebook-scalable-graphics-icon-facebook-logo-facebook-logo-png-clip-art.png"
                alt=""
            /> */}
    </header>
  );
};

export default Header;
