import React from "react";
import Preloader from "../../Preloader/Preloader";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  const { lookingForAJob, lookingForAJobDescription, fullName, contacts, photos } = props.profile;

  return (
    <div>
      <div>
        <img
          className={styles.profile__image}
          src="https://bearlog.com.ua/wp-content/uploads/2014/09/Socialni-merezhi-roblyat-lyudejj-zakritimi-1080x360.jpg"
          alt="Photo keyboard"
        />
      </div>

      <div className={styles.avatarDescription}>
        <img src={photos ? photos.small : photos.large} alt="photo" />
        <p>{fullName}</p>
        <p>{contacts.vk}</p>
        <p>mail: {lookingForAJob}</p>
        <p>job: {lookingForAJobDescription}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
