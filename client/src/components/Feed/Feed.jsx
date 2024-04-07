import LeftBar from './LeftBar/LeftBar';
import RightBar from './RightBar/RightBar';
import Main from './Main/Main';

import './index.css';

const Feed = () => {
    return (
        <div className='feed-main flex'>
            <LeftBar />
            <Main />
            <RightBar />
        </div>
    );
};

export default Feed;
