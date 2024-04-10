import { useEffect, useState } from 'react';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

export const usePostInteractionLogic = ({ post, setPopupState, setProfileDetails, popupState }) => {
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');

    useEffect(() => {
        const checkLiked = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/like/check?id=${post.id}`);
                if (response.status !== 200) throw new Error('Error');
                setLiked(response.data.liked);
            } catch (error) {}
        };

        const getComments = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, `/comments?id=${post.id}`);
                if (response.status !== 200) throw new Error('Error');
                setComments(response.data.comments);
            } catch (error) {
                console.error(error);
            }
        };

        checkLiked();
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        setLiked(!liked);
        liked ? post.likes-- : post.likes++;
        try {
            const response = await sendRequest(requestMethods.POST, '/like', { id: post.id });
            if (response.status !== 200) throw new Error('Error');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (userComment) {
            try {
                const response = await sendRequest(requestMethods.POST, '/comments', {
                    post_id: post.id,
                    content: userComment,
                });
                if (response.status !== 200) throw new Error('Error');
                setComments([...comments, response.data]);
                setUserComment('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };

    const handlePostDelete = async () => {
        try {
            const response = await sendRequest(requestMethods.DELETE, `/posts?id=${post.id}`);
            if (response.status !== 200) throw new Error('Error');
            setPopupState({ ...popupState, showPhotoView: false, showConfirmationPopup: false });
            setProfileDetails((prevDetails) => ({
                ...prevDetails,
                userPosts: prevDetails.userPosts.filter((postelement) => postelement.id !== post.id),
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const PostedByImage = ({ userImage }) => {
        return (
            <img
                src={userImage ? `http://127.0.0.1:8000/profile-pictures/${userImage}` : './images/assets/avatar.png'}
                alt="user-avatar"
            />
        );
    };

    return {
        handleLike,
        handleCommentSubmit,
        handleCommentChange,
        handlePostDelete,
        PostedByImage,
        comments,
        liked,
        userComment,
    };
};
