import React, { useState, useEffect } from 'react';

import Button from '../Elements/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = ({ currentUser }) => {
    const [searchParams] = useSearchParams();
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(
        currentUser.id === parseInt(searchParams.get('id'))
    );

    const handleEditProfile = () => {
        console.log('Edit Profile');
    };

    const handleUserFollow = () => {
        console.log('Follow User');
    };

    return (
        <div className="profile-main flex column">
            <div className="profile-header flex center">
                <div className="profile-image">
                    <img src="./images/assets/avatar.png" alt="avatar" />
                </div>
                <div className="profile-info flex column">
                    <div className="profile-info-top flex space-between">
                        <p className="size-xl">Usename</p>
                        {isCurrentUserProfile ? (
                            <Button
                                type={'secondary-btn'}
                                size={'btn-s'}
                                clickHandler={handleEditProfile}
                                text={'Edit profile'}
                            />
                        ) : (
                            <Button
                                type={'primary-btn'}
                                size={'btn-s'}
                                clickHandler={handleUserFollow}
                                text={'Follow'}
                            />
                        )}
                    </div>
                    <div className="profile-info-bottom flex">
                        <p className="size-l">
                            <strong>0</strong> posts
                        </p>
                        <p className="size-l">
                            <strong>0</strong> followers
                        </p>
                        <p className="size-l">
                            <strong>0</strong> following
                        </p>
                    </div>
                </div>
            </div>
            <div className="profile-posts-header flex center">
                <FontAwesomeIcon icon={faTableCells} className="black-text" />
                <p className="size-s">POSTS</p>
            </div>

            <div className="profile-posts flex wrap">
                <div className="profile-post flex center">
                    <img src="./images/assets/post-demo.jpg" alt="avatar" />
                </div>
                <div className="profile-post flex center">
                    <img src="./images/assets/post-demo.jpg" alt="avatar" />
                </div>
                <div className="profile-post flex center">
                    <img src="./images/assets/post-demo.jpg" alt="avatar" />
                </div>
                <div className="profile-post flex center">
                    <img src="./images/assets/post-demo.jpg" alt="avatar" />
                </div>
                <div className="profile-post flex center">
                    <img src="./images/assets/post-demo.jpg" alt="avatar" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
