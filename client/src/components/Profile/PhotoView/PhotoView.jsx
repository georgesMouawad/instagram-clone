import React, { useState, useEffect } from 'react';

import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import './index.css';
import { timeAgo } from '../../../core/tools/formatTime';

const PhotoView = ({ post, setShowPhotoView }) => {
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');

    const postobject = {
        id: 6,
        image: '1712481515.jpg',
        caption: 'Inventore nihil nostrum atque.',
        created_at: '2024-04-07T08:55:23.000000Z',
        user_id: 5,
        username: 'hill.jefferey',
        user_image: null,
        likes: 2,
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (userComment) {
            try {
                console.log('here');
                const response = await sendRequest(requestMethods.POST, '/comments', {
                    post_id: post.id,
                    content: userComment,
                });
                if (response.status !== 200) throw new Error('Error');
                console.log(response.data);
                setComments([...comments, response.data]);
                setUserComment('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };

    const Comment = ({ comment }) => {
        return (
            <div className="comment-view flex">
                <div className="comment-avatar flex center">
                    <img src="./images/assets/avatar.png" alt="avatar" />
                </div>
                <div className="comment-view-text flex column">
                    <div className="comment-top flex">
                        <p className="comment-username bold size-m">
                            {comment.username}
                            <span className="comment-text size-m regular"> {comment.content}</span>{' '}
                        </p>
                    </div>
                    <div className="comment-info size-s">
                        <p className="light-text">{timeAgo(comment.created_at)}</p>
                    </div>
                </div>
            </div>
        );
    };

    if (post)
        return (
            <div className="photo-view-container black-bg-trsp flex space-between">
                <div className="exit-btn white-text flex center">
                    <FontAwesomeIcon icon={faXmark} onClick={() => setShowPhotoView(false)} />
                </div>
                <div className="profile-view-nav flex center black-text white-bg">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className="photo-view-main white-bg flex">
                    <div className="photo-view">
                        <img src={post.image && `http://127.0.0.1:8000/posts/${post.image}`} alt="post" />
                    </div>
                    <div className="photo-view-comments flex column">
                        <div className="comments-view-header">
                            <div className="comments-view-user flex align-center bold size-m">
                                <img
                                    src={
                                        post.user_image
                                            ? `http://127.0.0.1:8000/profile-pictures/${post.user_image}`
                                            : './images/assets/avatar.png'
                                    }
                                    alt="user-avatar"
                                />
                                <p>{post.username}</p>
                            </div>
                            <div className="comments-view-caption size-m flex align-center">
                                <img
                                    src={
                                        post.user_image
                                            ? `http://127.0.0.1:8000/profile-pictures/${post.image}`
                                            : './images/assets/avatar.png'
                                    }
                                    alt="user-avatar"
                                />
                                <p>
                                    <span className="bold">{post.username}</span> {post.caption}
                                </p>
                            </div>
                        </div>
                        {comments && comments.length > 0 ? (
                            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
                        ) : (
                            <p className="comment-not-found size-m black-text">No comments yet</p>
                        )}

                        <div className="photo-view-bottom">
                            <div className="photo-view-actions size-xl">
                                <FontAwesomeIcon
                                    icon={liked ? faHeartSolid : faHeartRegular}
                                    className="action"
                                    onClick={handleLike}
                                />
                            </div>
                            <div className="photo-view-post-details">
                                <p className="photo-view-likes bold size-m">
                                    <span>{post.likes.length}</span> {post.likes.length === 1 ? 'like' : 'likes'}
                                </p>
                                <p className="photo-view-date light-text size-m">{timeAgo(post.created_at)}</p>
                            </div>
                            <form className="comment-add flex" onSubmit={handleCommentSubmit}>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={userComment}
                                    onChange={handleCommentChange}
                                />
                                <button type="submit" className="light-text">
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="profile-view-nav flex center black-text white-bg">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        );
};

export default PhotoView;
