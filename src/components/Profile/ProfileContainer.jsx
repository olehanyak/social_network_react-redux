import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/actions/actions";
import { dataAPI } from "../../API/api";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.id;

    if (!userId) {
      userId = 11992;
    }
    dataAPI.profileUser(userId).then((data) => {
      console.log(data);
      this.props.setUserProfile(data);
    });
  }
  render() {
    console.log(this.props)
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.userProfile,
  };
};

const WithRouterUrlComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(WithRouterUrlComponent);
