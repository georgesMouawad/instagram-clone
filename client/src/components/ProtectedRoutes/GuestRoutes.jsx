import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useUser } from '../../contexts/UserContext';

const GuestRoutes = ({ children }) => {
    const { currentUser } = useUser();
    const navigate = useNavigate();

    const validate = () => {
        if (currentUser) {
            navigate('/');
        } else {
            console.log('User is Guest');
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};

export default GuestRoutes;
