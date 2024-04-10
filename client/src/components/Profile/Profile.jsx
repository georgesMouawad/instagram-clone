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
    const [popupState, setPopupState] = useState({
        isEditing: false,
        showPhotoView: false,
    });
    const [selectedPost, setSelectedPost] = useState({});
    const [profileDetails, setProfileDetails] = useState({
        userInfo: {},
        userPosts: {},
        isFollowed: false,
    });
    // const [isFollowed, setIsFollowed] = useState(false);
    // const [userInfo, setUserInfo] = useState({});
    // const [userPosts, setUserPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const { currentUser } = useUser();

    useEffect(() => {
        const getProfilePosts = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/posts?user_id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                const sortedResponse = response.data.posts.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
                setProfileDetails((prevDetails) => ({ ...prevDetails, userPosts: sortedResponse }));
            } catch (error) {
                console.log(error);
            }
        };
        const getProfileInfo = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/users?id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                setProfileDetails((prevDetails) => ({ ...prevDetails, userInfo: response.data.user }));
            } catch (error) {
                console.log(error);
            }
        };
        const checkIfFollowed = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/follow/check?id=${searchParams.get('id')}`);
                if (response.status !== 200) throw new Error('Error');
                setProfileDetails((prevDetails) => ({ ...prevDetails, isFollowed: response.data.following }));
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser) {
            setIsCurrentUserProfile(currentUser && currentUser.id === parseInt(searchParams.get('id')));
            !isCurrentUserProfile && checkIfFollowed();
            getProfilePosts();
            getProfileInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupState.isEditing, searchParams, currentUser]);

    const handleUserFollow = async () => {
        try {
            setProfileDetails({ ...profileDetails, isFollowed: !profileDetails.isFollowed });
            const response = await sendRequest(requestMethods.POST, `/follow`, { id: profileDetails.userInfo.id });
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
                            setPopupState({ ...popupState, showPhotoView: true });
                            setSelectedPost(post);
                        }}
                    />
                </div>
            </>
        );
    };

    if (currentUser && profileDetails.userInfo)
        return (
            <>
                <LeftBar
                    setProfileDetails={setProfileDetails}
                    profileDetails={profileDetails}
                />
                <div className="profile-main flex column">
                    <div className="profile-header flex center">
                        <div className="profile-image">
                            <img
                                src={
                                    profileDetails.userInfo.image
                                        ? `http://127.0.0.1:8000/profile-pictures/${profileDetails.userInfo.image}`
                                        : './images/assets/avatar.png'
                                }
                                alt="avatar"
                            />
                        </div>
                        <div className="profile-info flex column">
                            <div className="profile-info-top flex space-between">
                                <p className="size-xl">{profileDetails.userInfo.username}</p>
                                {isCurrentUserProfile ? (
                                    <Button
                                        color={'secondary-btn'}
                                        size={'btn-s'}
                                        clickHandler={() => {
                                            setPopupState({ ...popupState, isEditing: true });
                                        }}
                                        text={'Edit profile'}
                                    />
                                ) : (
                                    <Button
                                        color={profileDetails.isFollowed ? 'secondary-btn' : 'primary-btn'}
                                        size={'btn-s'}
                                        clickHandler={handleUserFollow}
                                        text={profileDetails.isFollowed ? 'Following' : 'Follow'}
                                    />
                                )}
                            </div>
                            <div className="profile-info-mid flex">
                                <p className="size-l">
                                    <strong>{profileDetails.userInfo.posts}</strong> posts
                                </p>
                                <p className="size-l">
                                    <strong>{profileDetails.userInfo.followers}</strong> followers
                                </p>
                                <p className="size-l">
                                    <strong>{profileDetails.userInfo.following}</strong> following
                                </p>
                            </div>
                            <div className="profile-info-bottom">
                                <p className="size-m bold">{profileDetails.userInfo.name}</p>
                                <p className="size-m">{profileDetails.userInfo.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-posts-header flex center">
                        <FontAwesomeIcon icon={faTableCells} className="black-text" />
                        <p className="size-s">POSTS</p>
                    </div>

                    <div className="profile-posts flex wrap">
                        {profileDetails.userPosts &&
                            profileDetails.userPosts.length > 0 &&
                            profileDetails.userPosts.map((post) => <ProfilePost post={post} key={post.id} />)}
                    </div>
                </div>
                {popupState.isEditing && (
                    <EditProfileForm
                        userInfo={profileDetails.userInfo}
                        setPopupState={setPopupState}
                        popupState={popupState}
                    />
                )}
                {popupState.showPhotoView && (
                    <PhotoView
                        setPopupState={setPopupState}
                        popupState={popupState}
                        post={selectedPost}
                        userImage={profileDetails.userInfo.image}
                    />
                )}
            </>
        );
};

export default Profile;
