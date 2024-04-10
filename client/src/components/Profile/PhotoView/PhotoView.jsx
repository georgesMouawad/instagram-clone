import React, { useState, useEffect } from 'react';

import Comment from './Comment/Comment';

import { timeAgo } from '../../../core/tools/formatTime';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import './index.css';
import ConfirmationPopup from '../../Elements/ConfirmationPopup/ConfirmationPopup';

const PhotoView = ({ post, setProfileDetails, setPopupState, popupState, userImage }) => {
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');

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

    const handlePostDelete = async () => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/posts?id=${post.id}`);
            if (response.status !== 200) throw new Error('Error');
            setPopupState({ ...popupState, showPhotoView: false, showConfirmationPopup: false });
            setProfileDetails((prevDetails) => ({
                ...prevDetails,
                userPosts: prevDetails.userPosts.filter((postelement) => postelement.id !== post.id),
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const PostedByImage = ({ userImage }) => {
        return (
            <img
                src={userImage ? `http://127.0.0.1:8000/profile-pictures/${userImage}` : './images/assets/avatar.png'}
                alt="user-avatar"
            />
        );
    };

    if (post)
        return (
            <>
                <div className="photo-view-container black-bg-trsp flex space-between">
                    <div className="exit-btn white-text flex center">
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setPopupState({ ...popupState, showPhotoView: false })}
                        />
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
                                <div className="comments-view-user flex space-between bold size-m black-text">
                                    <div className="comments-view-user-info flex center">
                                        <PostedByImage userImage={userImage} />
                                        <p>{post.username}</p>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        onClick={() => setPopupState({ ...popupState, showConfirmationPopup: true })}
                                        className="delete-post-btn light-text"
                                    />
                                </div>
                                <div className="comments-view-caption size-m flex align-center">
                                    <PostedByImage userImage={userImage} />
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
                                        <span>{post.likes}</span> {post.likes === 1 ? 'like' : 'likes'}
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
                {popupState.showConfirmationPopup && (
                    <ConfirmationPopup
                        handleCancel={() => setPopupState({ ...popupState, showConfirmationPopup: false })}
                        handleContinue={handlePostDelete}
                    />
                )}
            </>
        );
};

export default PhotoView;
