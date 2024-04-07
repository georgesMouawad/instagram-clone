import '../index.css';

const SignInForm = ({ switchHandler, handleLogin, error, setFormData, formdata }) => {

    const handleSubmit = (e) => {
        handleLogin(formdata);
        e.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <form className="flex column" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="light-text">Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="user@mail.com"
                        onChange={handleChange}
                        className="off-white-bg input-btn-lg border-radius-l border"
                        required
                    />
                </div>
                <div className="field">
                    <label className="light-text">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        className="off-white-bg input-btn-lg border-radius-l border"
                        required
                    />
                </div>
                <div className="flex center validation-display">{error && <p>{error}</p>}</div>
                <button
                    className="login-btn input-btn-lg primary-bg white-text box-shadow border-radius-l"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <p>
                No Account?{' '}
                <span className="register-link primary-text" onClick={() => switchHandler(false)}>
                    Register Now
                </span>
            </p>
        </>
    );
};

export default SignInForm;
