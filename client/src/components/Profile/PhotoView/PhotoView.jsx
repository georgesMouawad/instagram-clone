import React from 'react';

import './index.css';

const PhotoView = () => {
    const photo = {
        id: 2,
        image: '1712481515.jpg',
        caption: 'Iste nihil cum voluptatem nemo dolor rem.',
        created_at: '2024-04-07T08:55:23.000000Z',
        user_id: 9,
        username: 'jermain.baumbach',
        user_image: null,
        likes: 2,
    };

    return (
        <div className="photo-view-main flex">
            <div className="photo-view">
                <img src={photo.image && `http://127.0.0.1:8000/posts/${photo.image}`} alt="post" />
            </div>
            <div className="comments-view flex column">
                <div className="comments-view-header">
                    <div className="comments-view-user flex">
                        <img
                            src={
                                photo.user_image
                                    ? `http://127.0.0.1:8000/profile-pictures/${photo.image}`
                                    : './images/assets/avatar.png'
                            }
                            alt="user-avatar"
                        />
                        <p>{photo.username}</p>
                    </div>
                    <div className="comments-view-caption flex">
                        <img
                            src={
                                photo.user_image
                                    ? `http://127.0.0.1:8000/profile-pictures/${photo.image}`
                                    : './images/assets/avatar.png'
                            }
                            alt="user-avatar"
                        />
                        <p>
                            <span className='bold'>{photo.username}</span> {photo.caption}
                        </p>
                    </div>
                    <div className="comment-view flex">
                        <div className="comment-avatar flex center">
                            <img src="./images/assets/avatar.png" alt="avatar" />
                        </div>
                        <div className="comment-view-text flex column">
                            <div className="comment-top flex">
                                <p className="comment-username bold size-m">
                                    Username
                                    <span className="comment-text size-m regular"> Lorem ipsum dolor.</span>{' '}
                                </p>
                            </div>
                            <div className="comment-info size-s">
                                <p>1d</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoView;
