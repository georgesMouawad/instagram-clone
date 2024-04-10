import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default App;
