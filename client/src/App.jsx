import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';

import { useUser } from './contexts/UserContext';
import { requestMethods, sendRequest } from './core/tools/apiRequest';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';

const App = () => {
    const { currentUser, setCurrentUser } = useUser();

    const navigate = useNavigate();

    const handleAuthenticationSuccess = () => {
        getCurrentUser();
    };

    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/auth" element={<Authentication handleAuthenticationSuccess={handleAuthenticationSuccess} />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default App;
