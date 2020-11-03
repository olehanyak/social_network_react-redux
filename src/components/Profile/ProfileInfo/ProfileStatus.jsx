import React from "react";
import Preloader from "../../Preloader/Preloader";
import styles from "./ProfileStatus.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activeEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivatedEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  componentDidUpdate() {
    console.log('update')
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activeEditMode}>{this.props.status || "-----------"}</span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              className={styles.input}
              autoFocus={true}
              onBlur={this.deactivatedEditMode}
              onChange={this.onChangeStatus}
              type="text"
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
