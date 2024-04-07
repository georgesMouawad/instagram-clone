import React from 'react';
import { useState, useEffect } from 'react';

import { timeAgo } from '../../../core/tools/formatTime';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const { caption, username, image, created_at, likes } = post;

    useEffect(() => {
        const checkLiked = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/like/check?id=${post.id}`);
                if (response.status !== 200) throw new Error('Error');
                setLiked(response.data.liked);
            } catch (error) {}
        };

        const getComments = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/comments?id=${post.id}`);
                if (response.status !== 200) throw new Error('Error');
                setComments(response.data.comments);
            } catch (error) {
                console.error(error);
            }
        };

        checkLiked();
        getComments();
    }, [liked, post.id]);

    const handleLike = async () => {
        setLiked(!liked);
        liked ? post.likes-- : post.likes++;
        try {
            const response = await sendRequest(requestMethods.POST, '/like', { id: post.id });
            if (response.status !== 200) throw new Error('Error');
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const Comment = ({ username, content }) => {
        return (
            <p className="size-m black-text bold">
                {username} <span className="light-text regular">{content}</span>
            </p>
        );
    };

    if (post)
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
                    <img src={`http://127.0.0.1:8000/posts/${image}`} alt="post" />
                </div>
                <div className="post-actions flex size-xl dark-text">
                    <FontAwesomeIcon
                        icon={liked ? faHeartSolid : faHeartRegular}
                        className="action"
                        onClick={handleLike}
                    />
                    <FontAwesomeIcon icon={faCommentRegular} className="action" />
                </div>
                <div className="post-likes">
                    <p className="black-text size-m bold">
                        {likes}
                        <span> {likes <= 1 ? 'like' : 'likes'}</span>
                    </p>
                </div>
                <div className="post-caption">
                    <p className="size-m black-text bold">
                        {username} <span className="light-text regular">{caption}</span>
                    </p>
                </div>
                <div className="post-comments">
                    {comments &&
                        comments.length > 0 &&
                        comments.map((comment) => (
                            <Comment key={comment.id} username={comment.username} content={comment.content} />
                        ))}
                </div>
                <form className="post-add-comment">
                    <input type="text" placeholder="Add a comment..." />
                </form>
            </div>
        );
};

export default Post;
