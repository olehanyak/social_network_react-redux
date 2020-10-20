import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <i className="fab fa-angellist iconFingersVictory"></i>

      <div className={styles.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}</div>
    </header>
  );
};

export default Header;
