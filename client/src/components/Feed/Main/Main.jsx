import React from 'react';

import Post from '../Post/Post';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

const Main = () => {
    const getPosts = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/posts');
            console.log(response);
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="feed-mid-container flex column">
            <Post></Post>
        </div>
    );
};

export default Main;
