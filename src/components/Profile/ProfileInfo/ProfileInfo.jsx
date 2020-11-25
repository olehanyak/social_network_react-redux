import React from "react";
import Preloader from "../../Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

export const templatePhoto = "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";

const ProfileInfo = (props) => {
  if (!props.profile) return <Preloader />;

  const { aboutMe, lookingForAJob, lookingForAJobDescription, fullName, contacts, photos } = props.profile;
  const photoUser = photos ? photos.small : photos.large;

  return (
    <div>
      <div>
        <image
          className={styles.profile__image}
          src="https://bearlog.com.ua/wp-content/uploads/2014/09/Socialni-merezhi-roblyat-lyudejj-zakritimi-1080x360.jpg"
          alt="Photo keyboard"
        />
      </div>

      <div className={styles.avatarDescription}>
        <image src={photoUser ? photoUser : templatePhoto} alt="photo" />
        <p>{fullName}</p>
        <p>about me: {aboutMe}</p>
        <p>{`contacts: ${contacts.twitter} ${contacts.github} ${contacts.instagram} ${contacts.youtube}`}</p>
        <p>mail: {lookingForAJob}</p>
        <p>job: {lookingForAJobDescription}</p>
        <ProfileStatus status={props.status} />
      </div>
    </div>
  );
};

export default ProfileInfo;
