import React, { Component } from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  setToggleIsFetching,
  setUsers,
  unfollow,
  totalCountPage,
  getUsers,
  selectPages,
} from "../../redux/actions/actions";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.sizePage);
  }

  onSelectedPage = (page) => {
    this.props.selectPages(page, this.props.sizePage);
  };

  render() {
    let {
      users,
      totalPages,
      sizePage,
      currentPage,
      follow,
      unfollow,
      isFetching,
      followingProgress,
    } = this.props;

    return (
      <>
        {isFetching ? <Preloader /> : null}
        <Users
          users={users}
          totalPages={totalPages}
          sizePage={sizePage}
          currentPage={currentPage}
          follow={follow}
          unfollow={unfollow}
          onSelectedPage={this.onSelectedPage}
          followingProgress={followingProgress}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    totalPages: state.usersPage.totalPages,
    currentPage: state.usersPage.currentPage,
    sizePage: state.usersPage.sizePage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
  };
};

const mapDispatchToProps = {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  totalCountPage,
  setToggleIsFetching,
  getUsers,
  selectPages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
