import React from 'react';

import { useNavigate } from 'react-router-dom';

const RightBar = ({ currentUser }) => {
    const navigate = useNavigate();

    const SuggestedCard = ({ user }) => {
        return (
            <div className="right-bar-suggested flex space-between">
                <div className="suggested-card flex align-center">
                    <img
                        src={
                            user.image
                                ? `http://127.0.0.1:8000/profile-pictures/${user.image}`
                                : './images/assets/avatar.png'
                        }
                        alt="avatar"
                    />
                    <div className="suggested-card-text">
                        <p className="black-text size-m bold">{user.username}</p>
                        <p className="light-text size-m">Suggested for you</p>
                    </div>
                    <button className="follow-btn primary-text no-bg">Follow</button>
                </div>
            </div>
        );
    };

    return (
        <div className="right-bar-main">
            <div className="right-bar-profile flex align-center">
                <img
                    src={
                        currentUser.image
                            ? `http://127.0.0.1:8000/profile-pictures/${currentUser.image}`
                            : './images/assets/avatar.png'
                    }
                    alt="avatar"
                />
                <p className="size-m black-text bold" onClick={() => navigate(`/profile?id=${currentUser.id}`)}>
                    {currentUser.username}
                </p>
            </div>
            <p className="light-text size-m bold">Suggested for you</p>
        </div>
    );
};

export default RightBar;
