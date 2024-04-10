import React from 'react';

import Post from '../Post/Post';

const Main = ({posts, currentUser}) => {
    return (
        <div className="feed-mid-container flex column">
            {posts &&
                posts.length > 0 &&
                posts.map((post) => <Post key={post.id} post={post} currentUser={currentUser} />)}
        </div>
    );
};

export default Main;
