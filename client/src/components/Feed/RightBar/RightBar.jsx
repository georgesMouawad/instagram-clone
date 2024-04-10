import React from 'react';

import { useLightBarLogic } from './logic';

import SuggestedCard from './SuggestedCard/SuggestedCard';

const RightBar = () => {
    
    const { currentUser, suggestedUsers, navigate } = useLightBarLogic();

    if(currentUser) return (
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
