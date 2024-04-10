import React, { useState } from 'react';

import Button from '../Button/Button';

import { sendRequest, requestMethods } from '../../../core/tools/apiRequest';
import { useUser } from '../../../contexts/UserContext';

import './index.css';

const EditProfileForm = ({ userInfo, setPopupState, popupState }) => {

    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [formData, setFormData] = useState(
        userInfo
            ? {
                  username: userInfo.username,
                  email: userInfo.email,
                  bio: userInfo.bio,
                  name: userInfo.name,
                  image: userInfo.image,
              }
            : {}
    );

    const {currentUser, setCurrentUser} = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

    const handleEditProfile = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('bio', formData.bio);
        data.append('name', formData.name);
        imageData && data.append('image', imageData);

        try {
            const response = await sendRequest(requestMethods.POST, '/users', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status !== 200) throw new Error('Error');
            console.log(image)
            setCurrentUser(response.data.user);
            setPopupState({ ...popupState, isEditing: false });
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    return (
        <div>
            <form className="edit-profile-form white-bg border flex column" onSubmit={handleEditProfile}>
                <div className="edit-profile-image light-gray-bg flex space-between border-radius-l ">
                    <div className="edit-profile-info flex">
                        <img
                            src={
                                image
                                    ? `${image}`
                                    : userInfo && userInfo.image
                                    ? `http://127.0.0.1:8000/profile-pictures/${userInfo.image}`
                                    : './images/assets/avatar.png'
                            }
                            alt="avatar"
                        />
                        <p className="size-l bold">{userInfo.username}</p>
                    </div>
                    <label htmlFor="image-upload" className="primary-btn size-m bold border-radius">
                        Change photo
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        name="image"
                        onChange={handleImageSelect}
                    />
                </div>
                <div className="edit-profile-header flex size-l black-text bold">
                    <p>Edit your profile</p>
                </div>
                <label className="black-text size-l bold">
                    Name
                    <input
                        className="input-btn-lg border border-radius-m"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label className="black-text size-l bold">
                    Username
                    <input
                        className="input-btn-lg border border-radius-m"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <label className="black-text size-l bold">
                    Bio
                    <textarea
                        className="border-radius-m"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        style={{ resize: 'none' }}
                    ></textarea>
                </label>
                <label className="black-text size-l bold">
                    Email
                    <input
                        className="input-btn-lg border border-radius-m"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <div className="edit-profile-btns flex center">
                    <Button
                        color={'primary-btn'}
                        size={'btn-s'}
                        text={'Submit'}
                        clickHandler={handleEditProfile}
                        handleSubmit={true}
                        type={'submit'}
                    />
                    <Button
                        color={'secondary-btn'}
                        size={'btn-s'}
                        text={'Cancel'}
                        clickHandler={() => setPopupState({ ...popupState, isEditing: false })}
                    />
                </div>
                {error && (
                    <div className="edit-profile-validation">
                        <p className="size-m bold">{error}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditProfileForm;
