import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import EditProfileForm from '../Elements/EditProfileForm/EditProfileForm';
import LeftBar from '../Feed/LeftBar/LeftBar';
import PhotoView from './PhotoView/PhotoView';
import Button from '../Elements/Button/Button';

import { useUser } from '../../contexts/UserContext';

import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Profile = () => {
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

    const [showPhotoView, setShowPhotoView] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    const [isFollowed, setIsFollowed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [searchParams] = useSearchParams();

    const { currentUser } = useUser();
    console.log(currentUser);

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/posts?user_id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                setUserPosts(response.data.posts.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
            } catch (error) {
                console.log(error);
            }
        };
        const getUserInfo = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/users?id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                setUserInfo(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        const checkIfFollowed = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/follow/check?id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                setIsFollowed(response.data.following);
            } catch (error) {
                console.log(error);
            }
        };
        setIsCurrentUserProfile(currentUser ? currentUser.id === parseInt(searchParams.get('id')) : false);
        getUserPosts();
        getUserInfo();
        if (!isCurrentUserProfile) checkIfFollowed();
    }, [isEditing]);

    const handleUserFollow = async () => {
        try {
            setIsFollowed(!isFollowed);
            const response = await sendRequest(requestMethods.POST, `/follow`, { id: userInfo.id });
            if (response.status !== 200) throw new Error('Error');
        } catch (error) {
            console.log(error);
        }
    };

    const ProfilePost = ({ post }) => {
        return (
            <>
                <div className="profile-post flex center">
                    <img
                        src={`http://127.0.0.1:8000/posts/${post.image}`}
                        alt="post"
                        className="user-post"
                        onClick={() => {
                            setShowPhotoView(true);
                            setSelectedPost(post);
                        }}
                    />
                </div>
            </>
        );
    };

    if (currentUser)
        return (
            <>
                <LeftBar currentUser={currentUser} posts={userPosts} setPosts={setUserPosts} />
                <div className="profile-main flex column">
                    <div className="profile-header flex center">
                        <div className="profile-image">
                            <img
                                src={
                                    userInfo.image
                                        ? `http://127.0.0.1:8000/profile-pictures/${userInfo.image}`
                                        : './images/assets/avatar.png'
                                }
                                alt="avatar"
                            />
                        </div>
                        <div className="profile-info flex column">
                            <div className="profile-info-top flex space-between">
                                <p className="size-xl">{userInfo.username}</p>
                                {isCurrentUserProfile ? (
                                    <Button
                                        type={'secondary-btn'}
                                        size={'btn-s'}
                                        clickHandler={() => {
                                            setIsEditing(true);
                                        }}
                                        text={'Edit profile'}
                                    />
                                ) : (
                                    <Button
                                        type={isFollowed ? 'secondary-btn' : 'primary-btn'}
                                        size={'btn-s'}
                                        clickHandler={handleUserFollow}
                                        text={isFollowed ? 'Following' : 'Follow'}
                                    />
                                )}
                            </div>
                            <div className="profile-info-mid flex">
                                <p className="size-l">
                                    <strong>{userInfo.posts}</strong> posts
                                </p>
                                <p className="size-l">
                                    <strong>{userInfo.followers}</strong> followers
                                </p>
                                <p className="size-l">
                                    <strong>{userInfo.following}</strong> following
                                </p>
                            </div>
                            <div className="profile-info-bottom">
                                <p className="size-m bold">{userInfo.name}</p>
                                <p className="size-m">{userInfo.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-posts-header flex center">
                        <FontAwesomeIcon icon={faTableCells} className="black-text" />
                        <p className="size-s">POSTS</p>
                    </div>

                    <div className="profile-posts flex wrap">
                        {userPosts &&
                            userPosts.length > 0 &&
                            userPosts.map((post) => <ProfilePost post={post} key={post.id} />)}
                    </div>
                </div>
                {isEditing && <EditProfileForm userInfo={userInfo} setIsEditing={setIsEditing} />}
                {showPhotoView && <PhotoView setShowPhotoView={setShowPhotoView} post={selectedPost} />}
            </>
        );
};

export default Profile;
