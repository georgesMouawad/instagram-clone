const SignupForm = ({ switchHandler, handleSignup, error, formData, setFormData }) => {
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };
    return (
        <>
            <form className="flex column center" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="light-text">First Name</label>
                    <input
                        className="off-white-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label className="light-text">Last Name</label>
                    <input
                        className="off-white-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="last_name"
                        placeholder="last name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label className="light-text">Email</label>
                    <input
                        className="off-white-bg input-btn-lg border-radius-l border"
                        type="text"
                        name="email"
                        placeholder="user@mail.com"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label className="light-text">Password:</label>
                    <input
                        className="off-white-bg input-btn-lg border-radius-l border"
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex center validation-display">{error && <p>{error}</p>}</div>
                <button
                    className="login-btn input-btn-lg primary-bg white-text box-shadow border-radius-l"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <p>
                Have an Account?{' '}
                <span className="login-link primary-text" onClick={() => switchHandler(true)}>
                    Sign In
                </span>
            </p>
        </>
    );
};

export default SignupForm;
