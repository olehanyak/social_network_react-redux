import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";
import FriendsBlock from "./Friends/FriendsBlock";
import { AppStateType } from "../../redux/redux_store";
import { dialogsSelector } from "../../redux/selectors/dialogsSelector";
import { DialogsType } from "../../redux/reducers/dialogsReducer";

type MapStatePropsType = {
  dialogs: Array<DialogsType>
}

const Navbar: React.FC<MapStatePropsType> = ({ dialogs }) => {
  let friendsName = dialogs.map((name) => <FriendsBlock key={name.id} friend={name.name} />);
  return (
    <div className={styles.nav}>
      <nav>
        <div className={styles.nav__item}>
          <NavLink to="/profile" activeClassName={styles.active}>
            Profile
          </NavLink>
        </div>
        <div className={styles.nav__item}>
          <NavLink to="/dialogs" activeClassName={styles.active}>
            Messages
          </NavLink>
        </div>
        <div className={styles.nav__item}>
          <NavLink to="/users" activeClassName={styles.active}>
            Users
          </NavLink>
        </div>
        <div className={styles.nav__item}>
          <NavLink to="/news" activeClassName={styles.active}>
            News
          </NavLink>
        </div>
        <div className={styles.nav__item}>
          <NavLink to="/music" activeClassName={styles.active}>
            Music
          </NavLink>
        </div>
        <div className={styles.nav__item}>
          <NavLink to="/settings" activeClassName={styles.active}>
            Settings
          </NavLink>
        </div>
      </nav>
      <div className={styles.friendsBlock}>
        <h1 className={styles.titleFriendsBlock}>Friends</h1>
        <div className={styles.friendItem}>{friendsName}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogs: dialogsSelector(state),
  };
};

export default connect(mapStateToProps, {})(Navbar);
