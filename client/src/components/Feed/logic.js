import { useEffect, useState } from 'react';

import { useUser } from '../../contexts/UserContext';
import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

export const useFeedLogic = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useUser();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/posts');
                if (response.status !== 200) throw new Error('Error');
                setPosts(response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            } catch (error) {
                console.error(error);
            }
        };
        getPosts();
    }, []);

    return { posts, setPosts, currentUser };
};
