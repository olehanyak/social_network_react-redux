import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { logout } from "../../redux/reducers/authReducer";
import { AppStateType } from "../../redux/redux_store";

type MapStatePropsType = {
  isAuth: boolean
  login: string | null
}

type MapDispatchPropsType = {
  logout(): void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType


const HeaderContainer: React.FC<HeaderContainerPropsType> = (props) => {
  return (
    <div className={styles.header}>
      <Header {...props} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { logout })(HeaderContainer);
