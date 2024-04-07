import React from 'react';

import './index.css';
import Button from '../Button/Button';

const Popup = ({ message, handleContinue, imageAction = null, captionAction = null, setCaption }) => {
    return (
        <div className="popupmain flex column center black-bg-trsp-s">
            <div className="popupmain-inner white-bg flex column space-evenly box-shadow border-radius">
                {!imageAction ? (
                    <div className="popupmain-text black-text">
                        <h1>Notice</h1>
                        <div>
                            <p className="notice-text">{message}</p>
                        </div>
                    </div>
                ) : (
                    <div className="image-upload">
                        <div className="popupmain-image">
                            <input type="file" id="image-upload" accept="image/*" name="image" onChange={imageAction} />
                        </div>
                        <div className="upload-caption">
                            <input
                                type="text"
                                placeholder="Enter caption"
                                value={setCaption}
                                onChange={captionAction}
                            />
                        </div>
                    </div>
                )}

                <Button text={'Continue'} type={'primary-btn'} size={'btn-l'} clickHandler={handleContinue} />
            </div>
        </div>
    );
};

export default Popup;
