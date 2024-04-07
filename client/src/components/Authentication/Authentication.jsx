import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';

import { useAuthenticationLogic } from './logic';

import './index.css';

const Authentication = () => {
    const { isLogin, error, formData, setFormData, navigate, switchHandler, handleLogin, handleSignup } =
        useAuthenticationLogic();

    return (
        <div className="form-component flex center">
            <div className="container box-shadow border-radius flex center column">
                <div className="logo-form">
                    <img src="./images/assets/logo-dark-grey.png" alt="logo" onClick={() => navigate('/')} />
                </div>
                {isLogin ? (
                    <SignInForm
                        switchHandler={switchHandler}
                        handleLogin={handleLogin}
                        error={error}
                        setFormData={setFormData}
                        formdata={formData}
                    />
                ) : (
                    <SignUpForm
                        switchHandler={switchHandler}
                        handleSignup={handleSignup}
                        setFormData={setFormData}
                        formData={formData}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
};

export default Authentication;
