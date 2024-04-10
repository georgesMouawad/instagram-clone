import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useUser } from '../../contexts/UserContext';

const AuthenticatedRoutes = ({ children }) => {
    const { currentUser } = useUser();
    const navigate = useNavigate();

    const validate = () => {
        if (!currentUser) {
            navigate('/auth');
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
