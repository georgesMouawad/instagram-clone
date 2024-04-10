import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../../contexts/UserContext';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

import SuggestedCard from './SuggestedCard/SuggestedCard';

const RightBar = () => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    
    const { currentUser } = useUser();

    const navigate = useNavigate();

    console.log('right bar')

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
