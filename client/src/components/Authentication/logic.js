import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useUser } from '../../contexts/UserContext';
import { sendRequest, requestMethods } from '../../core/tools/apiRequest';

export const useAuthenticationLogic = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { getCurrentUser } = useUser();

    useEffect(() => {
        if (!formData.email.includes('@') && formData.email.length > 0) {
            setError('Invalid email');
        } else if (formData.password.length < 6 && formData.password.length > 0) {
            setError('Password must be at least 6 characters');
        } else {
            setError('');
        }
    }, [formData]);

    const switchHandler = (isLogin) => {
        setIsLogin(isLogin);
    };

    const handleLogin = async (formData) => {
        const data = new FormData();
        data.append('email', formData.email);
        data.append('password', formData.password);

        try {
            const response = await sendRequest(requestMethods.POST, '/auth/login', data);
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                getCurrentUser();
                navigate('/');
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            setError('Wrong email or password');
            console.log(error.response.data);
        }
    };

    const handleSignup = async (formData) => {
        try {
            const response = await sendRequest(requestMethods.POST, '/auth/register', formData);
            if (response.status === 201) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                getCurrentUser();
                navigate('/');
                return;
            } else {
                throw new Error();
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    return { isLogin, error, formData, setFormData, navigate, switchHandler, handleLogin, handleSignup };
};
