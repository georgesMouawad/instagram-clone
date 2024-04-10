import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../../contexts/UserContext';

import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

export const useLightBarLogic = () => {

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    
    const { currentUser } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/follow/recommended');
                if (response.status === 200) {
                    setSuggestedUsers(response.data.users);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getSuggestedUsers();
    }, []);

    return { suggestedUsers, navigate, currentUser };
}