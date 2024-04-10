import React from 'react';

import { timeAgo } from '../../../../core/tools/formatTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

import './index.css';

const Comment = ({ comment, handleCommentDelete, currentUser }) => {
    return (
        <div className="comment-view flex space-between">
            <div className='flex'> 
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
            {comment.user_id === currentUser.id && <FontAwesomeIcon
                icon={faXmarkCircle}
                className="comment-delete-icon light-text"
                onClick={() => handleCommentDelete(comment.id)}
            />}
        </div>
    );
};

export default Comment;
