import React, { ChangeEvent } from "react";
import { UserProfileType } from "../../../types/types";
import Preloader from "../../Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

export const templatePhoto = "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";

type PropsType = {
  isOwner: boolean
  profile: UserProfileType
  status: string
  updateStatus: () => void
  changeProfilePhoto(photoFile: any): void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  if (!props.profile) return <Preloader />;

  const { aboutMe, lookingForAJob, lookingForAJobDescription, fullName, contacts, photos } = props.profile;
  const Large = photos.large
  const photoUser = photos ? photos.small : Large;

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>): any => {
    if (e.target.files === null) {
      throw new Error("Error finding e.target.files");
    }
    props.changeProfilePhoto(e.target.files[0])
  }

  return (
    <div>
      {/* <div>
        <img
          className={styles.profileImage}
          src="https://bearlog.com.ua/wp-content/uploads/2014/09/Socialni-merezhi-roblyat-lyudejj-zakritimi-1080x360.jpg"
          alt="Photo keyboard"
        />
      </div> */}

      <img className={styles.templatePhotoUser} src={photoUser !== null ? photoUser : templatePhoto} alt="photo" />
      {props.isOwner && <div className={styles.choosePhotoBtn}><input className={styles.input} onChange={onChangePhoto} type={"file"} /></div>}
      <section className={styles.profileDescription}>
        <h4 className={styles.userName}>{fullName}</h4>
        <b>About me: {aboutMe}</b>
        <b>Looking for a job: {lookingForAJob}</b>
        <div className={styles.contacts}>
          <b>Contacts:</b>
          <div>twitter - <a href={contacts.twitter}>{contacts.twitter}</a></div>
          <div>github - <a href={contacts.github}>{contacts.github}</a></div>
          <div>instagram - <a href={contacts.instagram}>{contacts.instagram}</a></div>
          <div>youtube - <a href={contacts.youtube}>{contacts.youtube}</a></div>
          <div>facebook - <a href={contacts.facebook}>{contacts.facebook}</a></div>
          <div>vk - <a href={contacts.vk}>{contacts.vk}</a></div>
        </div>
        <b>Job: {lookingForAJobDescription}</b>
        <ProfileStatus status={props.status} />
      </section>
    </div>
  );
};

export default ProfileInfo;
