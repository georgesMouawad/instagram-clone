import React from 'react';
import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import './index.css';

const Feed = ({ currentUser }) => {
    return (
        <>
            <div className="sidebar">
                <LeftBar currentUser={currentUser} />
            </div>
            <div className="feed-main flex">
                <div className="spacer"></div>
                <Main currentUser={currentUser} />
                <RightBar currentUser={currentUser} />
            </div>
        </>
    );
};

export default Feed;
