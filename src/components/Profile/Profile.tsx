import React from "react";
import styles from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { UserProfileType } from "../../types/types";

type PropsType = {
  isOwner: boolean
  profile: UserProfileType
  status: string
  updateProfileStatus: () => void
  updateStatus: () => void
  changeProfilePhoto(): void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.profileArea}>
      <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateProfileStatus} changeProfilePhoto={props.changeProfilePhoto} />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
