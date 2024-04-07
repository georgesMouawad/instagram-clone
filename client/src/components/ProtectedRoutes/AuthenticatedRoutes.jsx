import { useNavigate } from 'react-router-dom';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';
import { useEffect } from 'react';

const AuthenticatedRoutes = ({ children }) => {
    const navigate = useNavigate();

    const validate = async () => {
        try {
            const response = await sendRequest(requestMethods.GET, '/users/getuserrole');
            if (response.data.role !== 0) {
                console.log('User is Logged In');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};

export default AuthenticatedRoutes;
