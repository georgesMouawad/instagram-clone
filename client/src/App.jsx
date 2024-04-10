import { Route, Routes } from 'react-router-dom';

import AuthenticatedRoutes from './components/ProtectedRoutes/AuthenticatedRoutes';
import Authentication from './components/Authentication/Authentication';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';
import Footer from './components/Elements/Footer/Footer';

import './styles/colors.css';
import './styles/utilities.css';
import './styles/queries.css';
import './App.css';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<Authentication />} />
            </Routes>
            <AuthenticatedRoutes>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </AuthenticatedRoutes>
            <Footer/>
        </>
    );
};

export default App;
