import React from 'react';

import { useFeedLogic } from './logic';

import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import './index.css';

const Explore = () => {

    const { currentUser, posts, setPosts } = useFeedLogic();

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

export default Explore;
