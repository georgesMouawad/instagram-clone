import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useUser } from '../../contexts/UserContext';

const AuthenticatedRoutes = ({ children }) => {
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();

    const validate = async () => {
        if (!currentUser) {
            navigate('/auth');
            return;
        } else {
            console.log('User is Logged In');
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};

export default AuthenticatedRoutes;
