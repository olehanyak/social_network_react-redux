import React from "react";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    className={styles.profile__image}
                    src="https://bearlog.com.ua/wp-content/uploads/2014/09/Socialni-merezhi-roblyat-lyudejj-zakritimi-1080x360.jpg"
                    alt=""
                />
            </div>
            <div className={styles.avatarDescription}>avatar + description</div>
        </div>
    );
};

export default ProfileInfo;
