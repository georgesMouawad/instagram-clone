import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';

const Post = ({ post }) => {
    return (
        <div className="post-container flex column center">
            <div className="post-header flex center space-between">
                <div className="post-header-left flex center">
                    <img src="./images/assets/avatar.png" alt="avatar" />
                    <p className="size-m black-text">
                        Username <span className="light-text"> 1d</span>
                    </p>
                </div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className="post-image">
                <img src="./images/assets/post-demo.jpg" alt="post" />
            </div>
            <div className="post-actions flex size-xl dark-text">
                <FontAwesomeIcon icon={faHeartRegular} className="action" />
                <FontAwesomeIcon icon={faCommentRegular} className="action" />
            </div>
            <div className="post-likes">
                <p className="black-text size-m bold">
                    999 <span>likes</span>
                </p>
            </div>
            <div className="post-caption">
                <p className="size-m black-text bold">
                    Username <span className="light-text regular">Caption</span>
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
