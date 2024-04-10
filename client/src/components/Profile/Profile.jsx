import React from 'react';

import { useProfileLogic } from './logic';

import EditProfileForm from '../Elements/EditProfileForm/EditProfileForm';
import LeftBar from '../Feed/LeftBar/LeftBar';
import PhotoView from './PhotoView/PhotoView';
import Button from '../Elements/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells } from '@fortawesome/free-solid-svg-icons';

import './index.css';

const Profile = () => {
    const {
        popupState,
        currentUser,
        ProfilePost,
        selectedPost,
        setPopupState,
        profileDetails,
        handleUserFollow,
        setProfileDetails,
        isCurrentUserProfile,
    } = useProfileLogic();

    if (currentUser && profileDetails.userInfo)
        return (
            <>
                <LeftBar setProfileDetails={setProfileDetails} profileDetails={profileDetails} />
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
                        setProfileDetails={setProfileDetails}
                        popupState={popupState}
                        post={selectedPost}
                        userImage={profileDetails.userInfo.image}
                    />
                )}
            </>
        );
};

export default Profile;
