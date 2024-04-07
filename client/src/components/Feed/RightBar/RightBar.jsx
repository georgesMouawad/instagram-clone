import React from 'react';

const RightBar = () => {
    return (
        <div className="right-bar-main">
            <div className="right-bar-profile flex align-center">
                <img src="./images/assets/avatar.png" alt="avatar" />
                <p className="size-m black-text bold">Username</p>
            </div>
                <p className="light-text size-m bold">Suggested for you</p>
            <div className="right-bar-suggested flex space-between">
                <div className="suggested-card flex align-center">
                    <img src="./images/assets/avatar.png" alt="avatar" />
                    <div className="suggested-card-text">
                        <p className="black-text size-m bold">Username</p>
                        <p className="light-text size-m">Suggested for you</p>
                    </div>
                </div>
                <button className="follow-btn primary-text no-bg">Follow</button>
            </div>
        </div>
    );
};

export default RightBar;
