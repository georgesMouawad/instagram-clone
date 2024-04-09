import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Popup from '../../Elements/Popup/Popup';
import { useUser } from '../../../contexts/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

const LeftBar = ({ posts, setPosts }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [caption, setCaption] = useState('');

    const {setCurrentUser, currentUser} = useUser();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/logout', null);
            if (response.status === 200) {
                setCurrentUser(null);
                localStorage.clear();
                navigate('/auth');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setImageData(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageUpload = async () => {
        const data = new FormData();
        data.append('image', imageData);
        data.append('caption', caption);

        try {
            const response = await sendRequest(requestMethods.POST, '/posts', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status !== 201) throw new Error('Error');
            setShowPopup(false);
            setPosts([response.data.post, ...posts]);
        } catch (error) {
            console.log(error);
        }
    };

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
                                <p onClick={() => navigate('/')}>Home</p>
                            </div>
                            <div className="left-bar-explore flex">
                                <FontAwesomeIcon icon={faCompass} className="left-bar-icon" />
                                <p onClick={() => navigate('/')}>Explore</p>
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
                        handleImageSelect={handleImageSelect}
                        handleImageUpload={handleImageUpload}
                        caption={caption}
                        setCaption={setCaption}
                        handleCaptionChange={handleCaptionChange}
                        handleContinue={handleImageUpload}
                        setShowPopup={setShowPopup}
                    />
                )}
            </>
        );
};

export default LeftBar;
