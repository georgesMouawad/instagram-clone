import React, { useState, useEffect } from 'react';

import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import { requestMethods, sendRequest } from '../../core/tools/apiRequest';
import { useUser } from '../../contexts/UserContext';

import './index.css';

const Feed = () => {
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

    return (
        <div className='feed-all flex'>
            <div className="sidebar">
                <LeftBar currentUser={currentUser} posts={posts} setPosts={setPosts} />
            </div>
            <div className="feed-main flex">
                <Main currentUser={currentUser} posts={posts} />
            </div>
            <div className="right-bar">
                <RightBar currentUser={currentUser} />
            </div>
        </div>
    );
};

export default Feed;
