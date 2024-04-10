import React from 'react';

import { timeAgo } from '../../../../core/tools/formatTime';

const Comment = ({ comment }) => {
    return (
        <div className="comment-view flex">
            <div className="comment-avatar flex center">
                <img
                    src={
                        comment.user_image
                            ? `http://127.0.0.1:8000/profile-pictures/${comment.user_image}`
                            : './images/assets/avatar.png'
                    }
                    alt="avatar"
                />
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

export default Comment;
