import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { compose } from "redux";
import Profile from "./Profile";
import { getProfileUser, getProfileStatus, updateProfileStatus, changeProfilePhoto } from "../../redux/reducers/profileReducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { UserProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";
import { userProfileSelector, userProfileStatusSelector } from "../../redux/selectors/profileSelector";
import { authSelector, authUserIdSelector } from "../../redux/selectors/authSelector";

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
  changeProfilePhoto(): void
}

type OwnPropsType = {
  isOwner: boolean
  updateStatus: () => void
}

type PropsType = MapStateType & MapDispatchType & OwnPropsType
class ProfileContainer extends Component<PropsType & RouteComponentProps<any>> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    console.log(userId);

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
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateProfileStatus}
          changeProfilePhoto={this.props.changeProfilePhoto}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: userProfileSelector(state),
    status: userProfileStatusSelector(state),
    isAuth: authSelector(state),
    authorizedUserId: authUserIdSelector(state),
  };
};

const composition = compose<React.ComponentType>(
  connect(mapStateToProps, { getProfileUser, getProfileStatus, updateProfileStatus, changeProfilePhoto }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);

export default composition;
