import React, { useEffect, useState } from 'react';

import Post from '../Post/Post';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

const Main = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/posts');
            if (response.status !== 200) throw new Error('Error');
            console.log(response.data.posts);
            setPosts(response.data.posts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="feed-mid-container flex column">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Main;
