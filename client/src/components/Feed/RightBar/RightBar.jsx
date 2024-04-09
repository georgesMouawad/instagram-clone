import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

const RightBar = ({ currentUser }) => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/follow/recommended');
                if (response.status === 200) {
                    console.log(response.data.users);
                    setSuggestedUsers(response.data.users);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getSuggestedUsers();
    }, []);

    const SuggestedCard = ({ user }) => {
        const [isFollowed, setIsFollowed] = useState(false);

        const handleUserFollow = async () => {
            try {
                setIsFollowed(!isFollowed);
                const response = await sendRequest(requestMethods.POST, `/follow`, { id: user.id });
                if (response.status !== 200) throw new Error('Error');
            } catch (error) {
                console.log(error);
            }
        };

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
                        <p className="light-text size-m">{user.name}</p>
                    </div>
                    <button className={isFollowed ? 'follow-btn primary-bg white-text border-radius-m' : 'follow-btn primary-text no-bg'} onClick={handleUserFollow}>
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
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
            {suggestedUsers.length > 0 && <p className="light-text size-m bold">Suggested for you</p>}
            {suggestedUsers.map((user) => (
                <SuggestedCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default RightBar;
