import React from "react";
import { connect } from "react-redux";
import { PostType } from "../../../types/types";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import TextAreaReduxForm from "./TextAreaForPosts/TextAreaForPost";

type MyPostPropsType = {
  posts: PostType
  createNewPost: (value: string) => void
  // newPostText: string
}

const MyPosts: React.FC<MyPostPropsType> = (props) => {
  // let postElement = props.posts.map((data: any) => <Post key={data.id} message={data.message} like={data.like} />);
  let postElement
  if (props.posts instanceof Array) {
    postElement = props.posts.map((data) => <Post key={data.id} message={data.message} like={data.like} />)
  }

  interface ObjectType {
    newPost: string
  }

  // const addNewPost = (value: ObjectType) => {
  //   props.createNewPost(value.newPost);
  // };

  const addNewPost = <T extends ObjectType>(value: T) => {
    props.createNewPost(value.newPost);
  };

  // const addNewPost = <T extends { newPost: string }>(value: T) => {
  //   props.createNewPost(value.newPost);
  // };

  return (
    <div className={styles.posts}>
      <h3>My posts</h3>
      <TextAreaReduxForm
        onSubmit={addNewPost as any}
      // newPostText={props.newPostText}
      />
      <div className={styles.block}>{postElement}</div>
    </div>
  );
};

export default connect<{}, {}>(null)(MyPosts);
