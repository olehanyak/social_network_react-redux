import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/redux_store';

const mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

type MapStatePropsType = {
  isAuth: boolean
}

type MapDispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to="/login" />
    return <WrappedComponent {...restProps as WCP} />
  }

  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}

