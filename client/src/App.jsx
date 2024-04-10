import { Route, Routes } from 'react-router-dom';

import AuthenticatedRoutes from './components/ProtectedRoutes/AuthenticatedRoutes';
import GuestRoutes from './components/ProtectedRoutes/GuestRoutes';
import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';

const App = () => {
    return (
        <>
            <GuestRoutes>
                <Routes>
                    <Route path="/auth" element={<Authentication />} />
                </Routes>
            </GuestRoutes>
            <AuthenticatedRoutes>
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Feed />} />
                </Routes>
            </AuthenticatedRoutes>
        </>
    );
};

export default App;
