import React from "react";
import styles from "../DialogItem/DialogItem.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
  name: string
  id: number
}

export const DialogItem: React.FC<PropsType> = ({ name, id }) => {
  let path = "/dialogs/" + id;

  return (
    <div className={styles.dialogItem}>
      <img className={styles.avatar} src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="Avatar" />
      <NavLink to={path} className={styles.active}>
        {name}
      </NavLink>
    </div>
  );
};

