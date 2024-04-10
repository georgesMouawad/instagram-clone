import React from 'react';
import { useNavigate } from 'react-router-dom';

import Comment from './Comment/Comment';

import { timeAgo } from '../../../core/tools/formatTime';
import { usePostInteractionLogic } from './logic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';

const Post = ({ post }) => {
    const navigate = useNavigate();
    const { liked, comments, userComment, handleLike, handleCommentSubmit, handleCommentChange } =
        usePostInteractionLogic({ post });

    if (post)
        return (
            <div className="post-container flex column center">
                <div className="post-header flex center space-between">
                    <div className="post-header-left flex center">
                        <img
                            src={
                                post.user_image
                                    ? `http://127.0.0.1:8000/profile-pictures/${post.user_image}`
                                    : './images/assets/avatar.png'
                            }
                            alt="avatar"
                        />
                        <p
                            className="post-username bold size-m black-text"
                            onClick={() => navigate(`/profile?id=${post.user_id}`)}
                        >
                            {post.username} <span className="light-text"> {timeAgo(post.created_at)}</span>
                        </p>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="post-image">
                    <img src={`http://127.0.0.1:8000/posts/${post.image}`} alt="post" />
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
                        {post.likes}
                        <span> {post.likes <= 1 ? 'like' : 'likes'}</span>
                    </p>
                </div>
                <div className="post-caption">
                    <p className="size-m black-text bold">
                        {post.username} <span className="light-text regular">{post.caption}</span>
                    </p>
                </div>
                <div className="post-comments">
                    {comments &&
                        comments.length > 0 &&
                        comments.map((comment) => (
                            <Comment key={comment.id} username={comment.username} content={comment.content} />
                        ))}
                </div>
                <form className="post-add-comment" onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={userComment}
                        placeholder="Add a comment..."
                        onChange={handleCommentChange}
                    />
                </form>
            </div>
        );
};

export default Post;
