import { useEffect, useState } from 'react';

import { useUser } from '../../contexts/UserContext';
import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

export const useFeedLogic = () => {
    const [isAllPosts, setIsAllPosts] = useState(false);
    const [posts, setPosts] = useState([]);
    const { currentUser } = useUser();

    const switchHandler = (isAllPosts) => {
        setIsAllPosts(isAllPosts);
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/posts${isAllPosts ? `?all=${isAllPosts}` : ''}`);
                if (response.status !== 200) throw new Error('Error');
                setPosts(response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            } catch (error) {
                console.error(error);
            }
        };
        getPosts();
    }, [isAllPosts]);

    return { posts, setPosts, currentUser, switchHandler };
};
