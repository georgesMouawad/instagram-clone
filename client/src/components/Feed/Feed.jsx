import React, {useState, useEffect} from 'react';

import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

import './index.css';

const Feed = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/posts');
            if (response.status !== 200) throw new Error('Error');
            console.log(response.data.posts);

            setPosts(response.data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);
    return (
        <>
            <div className="sidebar">
                <LeftBar currentUser={currentUser} posts={posts}  setPosts={setPosts}/>
            </div>
            <div className="feed-main flex">
                <div className="spacer"></div>
                <Main currentUser={currentUser} posts={posts}/>
                <RightBar currentUser={currentUser} />
            </div>
        </>
    );
};

export default Feed;
