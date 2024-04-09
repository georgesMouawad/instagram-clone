import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';

import { useUser } from './contexts/UserContext';
import { UserProvider } from './contexts/UserContext';
import { requestMethods, sendRequest } from './core/tools/apiRequest';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';


const App = () => {
    const {setCurrentUser} = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await sendRequest(requestMethods.GET, '/user');
                if (response.status === 200) {
                    setCurrentUser(response.data.user);
                    return;
                }
                navigate('/auth');
            } catch (error) {
                console.error(error);
            }
        };

        getCurrentUser();
    }, []);

    return (
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
    );
};

export default App;
