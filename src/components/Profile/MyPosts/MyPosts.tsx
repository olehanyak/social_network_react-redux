import React from "react";
import { PostType } from "../../../types/types";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import TextAreaReduxForm from "./TextAreaForPosts/TextAreaForPost";

type PropsType = {
  posts: PostType
  createNewPost: (newPost: string) => void
  newPostText: string
}

type OwnType = {
  addNewPost: (value: string) => void
}

const MyPosts: React.FC<PropsType & OwnType> = (props) => {
  // let postElement = props.posts.map((data: any) => <Post key={data.id} message={data.message} like={data.like} />);
  let postElement
  if (props.posts instanceof Array) {
    postElement = props.posts.map((data) => <Post key={data.id} message={data.message} like={data.like} />)
  }

  const addNewPost = (value: string) => {
    // console.log(value.newPost);
    props.createNewPost(value.newPost);
  };

  return (
    <div className={styles.posts}>
      <h3>My posts</h3>
      <TextAreaReduxForm
        onSubmit={addNewPost}
        newPostText={props.newPostText}
      />
      <div className={styles.block}>{postElement}</div>
    </div>
  );
};

export default MyPosts;
