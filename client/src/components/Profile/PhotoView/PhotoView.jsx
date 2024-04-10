import React from 'react';

import Comment from './Comment/Comment';
import ConfirmationPopup from '../../Elements/ConfirmationPopup/ConfirmationPopup';

import { usePostInteractionLogic } from '../../Feed/Post/logic';

import { timeAgo } from '../../../core/tools/formatTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import './index.css';

const PhotoView = ({ post, setProfileDetails, setPopupState, popupState, userImage }) => {
    const {
        liked,
        comments,
        currentUser,
        userComment,
        handleLike,
        PostedByImage,
        handlePostDelete,
        handleCommentSubmit,
        handleCommentChange,
        handleCommentDelete,
    } = usePostInteractionLogic({ post, setPopupState, setProfileDetails, popupState });

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
                                    {currentUser.id === post.user_id && <FontAwesomeIcon
                                        icon={faTrashCan}
                                        onClick={() => setPopupState({ ...popupState, showConfirmationPopup: true })}
                                        className="delete-post-btn light-text"
                                    />}
                                </div>
                                <div className="comments-view-caption size-m flex align-center">
                                    <PostedByImage userImage={userImage} />
                                    <p>
                                        <span className="bold">{post.username}</span> {post.caption}
                                    </p>
                                </div>
                            </div>
                            {comments && comments.length > 0 ? (
                                comments.map((comment) => <Comment key={comment.id} comment={comment} handleCommentDelete={handleCommentDelete} currentUser={currentUser} />)
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
