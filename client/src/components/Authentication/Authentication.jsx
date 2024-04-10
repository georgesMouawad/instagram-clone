import SignInForm from './Forms/SignInForm';
import SignUpForm from './Forms/SignUpForm';
import Footer from '../Elements/Footer/Footer';

import { useAuthenticationLogic } from './logic';

import './index.css';

const Authentication = () => {
    const { isLogin, error, formData, setFormData, navigate, switchHandler, handleLogin, handleSignup } =
        useAuthenticationLogic();

    return (
        <>
            <div className="form-component flex center">
                {isLogin && (
                    <div className="left-image">
                        <img src="./images/assets/welcome.jpg" alt="phone" />
                    </div>
                )}
                <div className="container flex center column">
                    <div className="logo-form flex column center box-shadow border border-radius-s">
                        <img src="./images/assets/ig-text-logo.png" alt="logo" onClick={() => navigate('/')} />
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
                    <div className="register-switch white-bg box-shadow border border-radius-s size-m flex center">
                        {isLogin ? (
                            <p>
                                Don't have an account?{' '}
                                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                                    Register Now
                                </span>
                            </p>
                        ) : (
                            <p>
                                Have an account'?{' '}
                                <span className="register-link primary-text" onClick={() => switchHandler(true)}>
                                    Sign in
                                </span>
                            </p>
                        )}
                    </div>
                    <div className="applinks flex center column size-m">
                        <p>Get the app.</p>
                        <div className="apps flex">
                            <img src="./images/assets/playstore.png" alt="playstore" />
                            <img src="./images/assets/appstore.png" alt="appstore" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Authentication;
