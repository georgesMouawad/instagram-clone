import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

const LeftBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response =  await sendRequest(requestMethods.POST, '/auth/logout', null);
            if (response.status === 200) {
                localStorage.clear();
                navigate('/auth');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="left-bar-main flex column">
            <div className="left-bar-top">
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
                    <div className="left-bar-create flex">
                        <FontAwesomeIcon icon={faSquarePlus} className="left-bar-icon" />
                        <p>Create</p>
                    </div>
                    <div className="left-bar-profile flex">
                        <img src="./images/assets/avatar.png" alt="avatar" />
                        <p>Profile</p>
                    </div>
                </div>
            </div>
            <div className="left-bar-bottom left-bar-links">
                <div className="left-bar-logout flex align-center">
                    <FontAwesomeIcon icon={faRightFromBracket} className="left-bar-icon" />
                    <p onClick={handleLogout}>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
