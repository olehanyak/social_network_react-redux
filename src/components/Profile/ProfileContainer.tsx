import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Profile from "./Profile";
import { getProfileUser, getProfileStatus, updateProfileStatus } from "../../redux/reducers/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { UserProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";

type MapStateType = {
  profile: UserProfileType
  status: string
  isAuth: boolean,
  authorizedUserId: number,
}

type MapDispatchType = {
  getProfileUser: (userId: number) => void
  getProfileStatus: (userId: number) => void
  updateProfileStatus: () => void
}

type OwnPropsType = {
  updateStatus: () => void
}

type PropsType = MapStateType & MapDispatchType & OwnPropsType

class ProfileContainer extends Component<PropsType & RouteComponentProps<any>> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    console.log(this.props);

    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfileUser(userId);
    this.props.getProfileStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateProfileStatus}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.userProfile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
  };
};

const composition = compose(
  connect(mapStateToProps, { getProfileUser, getProfileStatus, updateProfileStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

export default composition;
