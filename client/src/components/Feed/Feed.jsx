import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

import './index.css';

const Feed = ({ currentUser }) => {
    return (
        <div className="feed-main flex">
            <LeftBar currentUser={currentUser} />
            <Main currentUser={currentUser} />
            <RightBar currentUser={currentUser} />
        </div>
    );
};

export default Feed;
