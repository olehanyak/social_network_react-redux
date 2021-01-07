import React, { Component } from "react";
import { connect } from "react-redux";
import { profileActions } from "../../../redux/reducers/profileReducer";
import { AppStateType } from "../../../redux/redux_store";
import { profileSelector } from "../../../redux/selectors/profileSelector";
import { PostType } from "../../../types/types";
import MyPosts from "./MyPosts";

type MapStateType = {
  posts: PostType
}

type MapDispatchType = {
  createNewPost: (newPostText: string) => void
}

type PropsType = MapStateType & MapDispatchType

class MyPostsContainer extends Component<PropsType> {
  render() {
    let { posts, createNewPost } = this.props;
    return (
      <>
        <MyPosts posts={posts} createNewPost={createNewPost} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: profileSelector(state)
  }
};

const mapDispatchToProps = {
  createNewPost: profileActions.createNewPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer as any);
