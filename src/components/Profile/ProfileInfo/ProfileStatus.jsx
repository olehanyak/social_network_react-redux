import React, { useState } from "react";
import styles from "./ProfileStatus.module.css";

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activeEditMode = () => {
    setEditMode(true);
  };

  const deactivatedEditMode = () => {
    setEditMode(false);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
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
