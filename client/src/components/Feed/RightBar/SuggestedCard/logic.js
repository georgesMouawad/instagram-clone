import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { requestMethods, sendRequest } from '../../../../core/tools/apiRequest';

export const useSuggestedCardLogic = ({ user }) => {
    const [isFollowed, setIsFollowed] = useState(false);

    const navigate = useNavigate();

    const handleUserFollow = async () => {
        try {
            setIsFollowed(!isFollowed);
            const response = await sendRequest(requestMethods.POST, `/follow`, { id: user.id });
            if (response.status !== 200) throw new Error('Error');
        } catch (error) {
            console.log(error);
        }
    };

    return { isFollowed, handleUserFollow, navigate };
};
