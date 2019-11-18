import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';


export function Profile(props) {
  const { style } = props;

  return (
    <div className={styles.wrapper} style={style}>
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'unset' }}>
                    <div className={styles.backButton} />
                </Link>
                <div className={styles.editProfile}>Edit Profile</div>
                <div className={styles.submitButton} />
            </div>
        </div>
        <div className={styles.profile}>
            <div className={styles.avatar} />
            <div className={styles.formContainer}>
                <div className={styles.formLabel}>Full name</div>
                <input className={styles.inputForm} placeholder='Vladimir Carpa'/>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formLabel}>Username</div>
                <input className={styles.inputForm} placeholder='@oswalth'/>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formLabel}>Bio</div>
                <input className={styles.inputForm} placeholder='WebDev'/>
            </div>
        </div>
    </div>
  );
}
