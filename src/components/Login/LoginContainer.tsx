import React from "react";
import { connect } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import { AppStateType } from "../../redux/redux_store";
import { authSelector, captchaUrlSelector } from "../../redux/selectors/authSelector";
import Login from "./Login";

type MapStateLoginPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchLoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginPropsType = MapStateLoginPropsType & MapDispatchLoginPropsType

const LoginContainer: React.FC<LoginPropsType> = (props) => {
  const { login, isAuth, captchaUrl } = props;
  return (
    <div>
      <Login login={login} isAuth={isAuth} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: authSelector(state),
    captchaUrl: captchaUrlSelector(state)
  };
};

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
