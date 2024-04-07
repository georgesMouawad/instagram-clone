import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const LeftBar = () => {
    return (
        <div className="left-bar-main flex column">
            <div className="left-bar-logo">
                <img src="./images/assets/ig-text-logo.png" alt="logo" />
            </div>
            <div className="left-bar-links flex column">
                <div className="left-bar-home flex">
                    <FontAwesomeIcon icon={faHouse} className="left-bar-icon" />
                    <p>Home</p>
                </div>
                <div className="left-bar-explore flex">
                    <FontAwesomeIcon icon={faCompass} className="left-bar-icon" />
                    <p>Explore</p>
                </div>
                <div className="left-bar-profile flex">
                    <img src="./images/assets/avatar.png" alt="avatar" />
                    <p>Profile</p>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
