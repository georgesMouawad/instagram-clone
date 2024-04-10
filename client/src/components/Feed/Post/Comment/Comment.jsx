import React from 'react';

const Comment = ({ username, content }) => {
    return (
        <div className="flex space-between">
            <p className="size-m black-text bold">
                {username} <span className="light-text regular">{content}</span>
            </p>
        </div>
    );
};

export default Comment;
