import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import { AppStateType } from "../../redux/redux_store";
import Login from "./Login";

type MapStateLoginPropsType = {
  isAuth: boolean
}

type MapDispatchLoginPropsType = {
  login: (email: string, password: number, rememberMe: boolean) => void
}

type LoginPropsType = MapStateLoginPropsType & MapDispatchLoginPropsType

const LoginContainer: React.FC<LoginPropsType> = (props) => {
  return (
    <div>
      <Login login={props.login} isAuth={props.isAuth} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { login })(LoginContainer);
