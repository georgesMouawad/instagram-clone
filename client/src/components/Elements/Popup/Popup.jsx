import React from 'react';

import './index.css';
import Button from '../Button/Button';

const Popup = ({ message, handleContinue }) => {
    return (
        <div className="popupmain flex column center black-bg-trsp-s">
            <div className="popupmain-inner white-bg flex column space-evenly box-shadow border-radius">
                <div className="popupmain-text black-text">
                    <h1>Notice</h1>
                    <div>
                        <p className="notice-text">{message}</p>
                    </div>
                </div>
                <Button text={'Continue'} type={'primary-btn'} size={'btn-l'} clickHandler={handleContinue} />
            </div>
        </div>
    );
};

export default Popup;
