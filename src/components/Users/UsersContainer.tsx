import React, { Component } from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  getUsers,
  selectPages,
} from "../../redux/reducers/usersReducer";
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {
  userSelector,
  totalPagesSelector,
  currentPageSelector,
  sizePageSelector,
  isFetchingSelector,
  followingProgressSelector,
} from "../../redux/selectors/userSelector";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";

type MapStatePropsType = {
  currentPage: number
  sizePage: number
  users: Array<UsersType>
  totalPages: number
  isFetching: boolean
  followingProgress: Array<number>
}

type MapDispatchPropsType = {
  getUsers: (currentPage: number, sizePage: number) => void
  selectPages: (page: number, sizePage: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends Component<PropsType> {
  componentDidMount() {
    const { getUsers, currentPage, sizePage } = this.props;
    getUsers(currentPage, sizePage);
  }

  onSelectedPage = (page: number) => {
    const { selectPages, sizePage } = this.props;
    selectPages(page, sizePage);
  };

  render() {
    let { users, totalPages, sizePage, currentPage, follow, unfollow, isFetching, followingProgress } = this.props;

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

const mapStateToProps = (state: AppStateType) => {
  return {
    users: userSelector(state),
    totalPages: totalPagesSelector(state),
    currentPage: currentPageSelector(state),
    sizePage: sizePageSelector(state),
    isFetching: isFetchingSelector(state),
    followingProgress: followingProgressSelector(state),
  }
};

const mapDispatchToProps = {
  follow,
  unfollow,
  // setUsers,
  // setCurrentPage,
  // totalCountPage,
  // setToggleIsFetching,
  getUsers,
  selectPages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
