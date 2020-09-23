import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Navbar.module.css";
import FriendsBlock from "./Friends/FriendsBlock";

const Navbar = ({ dialogs }) => {
    let friendsName = dialogs.map((name) => <FriendsBlock key={name.id} friend={name.name} />);
    return (
        <div className={styles.nav}>
            <nav>
                <div className={styles.nav__item}>
                    <NavLink to="/profile" activeClassName={styles.active}>
                        Profile
                    </NavLink>
                </div>
                <div className={styles.nav__item}>
                    <NavLink to="/dialogs" activeClassName={styles.active}>
                        Messages
                    </NavLink>
                </div>
                <div className={styles.nav__item}>
                    <NavLink to="/news" activeClassName={styles.active}>
                        News
                    </NavLink>
                </div>
                <div className={styles.nav__item}>
                    <NavLink to="/music" activeClassName={styles.active}>
                        Music
                    </NavLink>
                </div>
                <div className={styles.nav__item}>
                    <NavLink to="/settings" activeClassName={styles.active}>
                        Settings
                    </NavLink>
                </div>
            </nav>
            <div className={styles.friendsBlock}>
                <h1 className={styles.titleFriendsBlock}>Friends</h1>
                <div className={styles.friendItem}>{friendsName}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    let { dialogs } = state.dialogsPage;
    return {
        dialogs: dialogs,
    };
};


export default connect(mapStateToProps, null)(Navbar);
