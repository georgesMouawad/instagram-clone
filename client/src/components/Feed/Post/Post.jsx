import React from 'react';
import { useState, useEffect } from 'react';

import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';
import { timeAgo } from '../../../core/tools/formatTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';

const Post = ({ post }) => {
    const { id, caption, user_id, image, created_at } = post;

    const [username, setUsername] = useState('');
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        
        const getUsername = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/users?id=${user_id}`);
                if (response.status !== 200) throw new Error('Error');
                setUsername(response.data.user.username);
            } catch (error) {
                console.error(error);
            }
        };

        const getLikes = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/likes?id=${id}`);
                if (response.status !== 200) throw new Error('Error');
                setLikes(response.data.likes.length);
            } catch (error) {
                console.error(error);
            }
        };

        getUsername();
        getLikes();
    }, []);

    if (post && username)
        return (
            <div className="post-container flex column center">
                <div className="post-header flex center space-between">
                    <div className="post-header-left flex center">
                        <img src="./images/assets/avatar.png" alt="avatar" />
                        <p className="size-m black-text">
                            {username} <span className="light-text"> {timeAgo(created_at)}</span>
                        </p>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="post-image">
                    <img src={'http://127.0.0.1:8000/posts/ ' + image} alt="post" />
                </div>
                <div className="post-actions flex size-xl dark-text">
                    <FontAwesomeIcon icon={faHeartRegular} className="action" />
                    <FontAwesomeIcon icon={faCommentRegular} className="action" />
                </div>
                <div className="post-likes">
                    <p className="black-text size-m bold">
                        999 <span>{likes}</span>
                    </p>
                </div>
                <div className="post-caption">
                    <p className="size-m black-text bold">
                        {username} <span className="light-text regular">{caption}</span>
                    </p>
                </div>
                <div className="post-comments">
                    <p className="size-m black-text bold">
                        Username <span className="light-text regular">Comment</span>
                    </p>
                    <p className="size-m black-text bold">
                        Username <span className="light-text regular">Comment</span>
                    </p>
                </div>
                <div className="post-add-comment">
                    <input type="text" placeholder="Add a comment..." />
                </div>
            </div>
        );
};

export default Post;
