import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  console.log(props);
  return (
    <header className={styles.headerSection}>
      <div className={styles.sotNet}>moonmen</div>

      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <div>
            <span className={styles.userName}>{props.login}</span> <button className="btn btn-outline-primary" onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
