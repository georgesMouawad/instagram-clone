import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Authentication from './components/Authentication/Authentication';
import Feed from './components/Feed/Feed';

import { requestMethods, sendRequest } from './core/tools/apiRequest';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';

const App = () => {
    const [currentUser, setCurrentUser] = useState({});

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
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" element={<Feed currentUser={currentUser} />} />
        </Routes>
    );
};

export default App;
