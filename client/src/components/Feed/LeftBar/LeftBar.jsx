import React from 'react';

import { useLeftBarLogic } from './logic';

import Popup from '../../Elements/Popup/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LeftBar = ({ posts, setPosts, setProfileDetails, switchHandler }) => {
    const {
        image,
        caption,
        setImage,
        navigate,
        showPopup,
        setCaption,
        currentUser,
        handleLogout,
        setShowPopup,
        handleImageSelect,
        handleImageUpload,
        handleCaptionChange,
    } = useLeftBarLogic({ posts, setPosts, setProfileDetails });

    if (currentUser)
        return (
            <>
                <div className="left-bar-main flex column">
                    <div className="left-bar-top">
                        <div className="left-bar-logo">
                            <img src="./images/assets/ig-text-logo.png" alt="logo" />
                        </div>
                        <div className="left-bar-links flex column">
                            <div className="left-bar-home flex">
                                <FontAwesomeIcon icon={faHouse} className="left-bar-icon" />
                                <p
                                    onClick={() => {
                                        navigate('/');
                                        switchHandler(false);
                                    }}
                                >
                                    Home
                                </p>
                            </div>
                            <div className="left-bar-explore flex">
                                <FontAwesomeIcon icon={faCompass} className="left-bar-icon" />
                                <p
                                    onClick={() => {
                                        navigate('/');
                                        switchHandler(true);
                                    }}
                                >
                                    Explore
                                </p>
                            </div>
                            <div className="left-bar-create flex">
                                <FontAwesomeIcon icon={faSquarePlus} className="left-bar-icon" />
                                <p
                                    onClick={() => {
                                        setShowPopup(true);
                                    }}
                                >
                                    Create
                                </p>
                            </div>
                            <div className="left-bar-profile flex">
                                <img
                                    src={
                                        currentUser.image
                                            ? `http://127.0.0.1:8000/profile-pictures/${currentUser.image}`
                                            : './images/assets/avatar.png'
                                    }
                                    alt="avatar"
                                />
                                <p
                                    onClick={() => {
                                        navigate(`/profile?id=${currentUser.id}`);
                                    }}
                                >
                                    Profile
                                </p>
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
                {showPopup && (
                    <Popup
                        image={image}
                        caption={caption}
                        setImage={setImage}
                        setCaption={setCaption}
                        setShowPopup={setShowPopup}
                        handleContinue={handleImageUpload}
                        handleImageSelect={handleImageSelect}
                        handleImageUpload={handleImageUpload}
                        handleCaptionChange={handleCaptionChange}
                    />
                )}
            </>
        );
};

export default LeftBar;
