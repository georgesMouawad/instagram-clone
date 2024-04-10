import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUser } from '../../contexts/UserContext';

import { requestMethods, sendRequest } from '../../core/tools/apiRequest';

export const useProfileLogic = () => {
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [popupState, setPopupState] = useState({
        isEditing: false,
        showPhotoView: false,
        showConfirmationPopup: false,
    });
    const [selectedPost, setSelectedPost] = useState({});
    const [profileDetails, setProfileDetails] = useState({
        userInfo: {},
        userPosts: {},
        isFollowed: false,
    });
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

    return {
        popupState,
        currentUser,
        ProfilePost,
        selectedPost,
        setPopupState,
        profileDetails,
        handleUserFollow,
        setProfileDetails,
        isCurrentUserProfile,
    };
};
