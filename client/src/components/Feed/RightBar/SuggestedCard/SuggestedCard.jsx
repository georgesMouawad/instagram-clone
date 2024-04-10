import React from 'react';

import { useSuggestedCardLogic } from './logic';

const SuggestedCard = ({ user }) => {

    const { isFollowed, handleUserFollow, navigate } = useSuggestedCardLogic({ user });

    return (
        <div className="right-bar-suggested flex space-between">
            <div className="suggested-card flex space-between">
                <div className="suggested-card-avatar flex center">
                    <img
                        src={
                            user.image
                                ? `http://127.0.0.1:8000/profile-pictures/${user.image}`
                                : './images/assets/avatar.png'
                        }
                        alt="avatar"
                    />
                    <div className="suggested-card-text">
                        <p className="black-text size-m bold" onClick={() => navigate(`/profile?id=${user.id}`)}>{user.username}</p>
                        <p className="light-text size-m">{user.name}</p>
                    </div>
                </div>
                <button
                    className={
                        isFollowed
                            ? 'follow-btn primary-bg white-text border-radius-m'
                            : 'follow-btn primary-text no-bg'
                    }
                    onClick={handleUserFollow}
                >
                    {isFollowed ? 'Following' : 'Follow'}
                </button>
            </div>
        </div>
    );
};

export default SuggestedCard;
