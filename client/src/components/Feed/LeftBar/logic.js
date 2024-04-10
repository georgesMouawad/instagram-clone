import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../../contexts/UserContext';
import { requestMethods, sendRequest } from '../../../core/tools/apiRequest';

export const useLeftBarLogic = ({ posts, setPosts, setProfileDetails }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [caption, setCaption] = useState('');

    const { setCurrentUser, currentUser } = useUser();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/logout', null);
            if (response.status === 200) {
                setCurrentUser(null);
                localStorage.clear();
                navigate('/auth');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setImageData(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    };

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageUpload = async () => {
        const data = new FormData();
        data.append('image', imageData);
        data.append('caption', caption);

        try {
            const response = await sendRequest(requestMethods.POST, '/posts', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowPopup(false);
            setCaption('');
            setImage(null);
            if (response.status !== 201) throw new Error('Error');
            setProfileDetails &&
                setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    userPosts: [response.data.post, ...prevDetails.userPosts],
                }));
            setPosts && setPosts([response.data.post, ...posts]);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        image,
        caption,
        setImage,
        navigate,
        showPopup,
        setCaption,
        currentUser,
        handleLogout,
        setShowPopup,
        handleImageSelect,
        handleImageUpload,
        handleCaptionChange,
    };
};
