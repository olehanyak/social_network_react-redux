import React, { ChangeEvent, useState } from "react";
import styles from "./ProfileStatus.module.css";

type PropsType = {
  status: string
}

const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activeEditMode = () => {
    setEditMode(true);
  };

  const deactivatedEditMode = () => {
    setEditMode(false);
  };

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      Status: 
      {!editMode && (
        <div>
          <span onDoubleClick={activeEditMode}>{status || "-----------"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            className={styles.input}
            autoFocus={true}
            onBlur={deactivatedEditMode}
            onChange={onChangeStatus}
            type="text"
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
