import './index.css';

const Button = ({ text, clickHandler, type, size, handleSubmit = false }) => {
    return (
        <button
            className={`flex center border-radius-m bold ${type} ${size}`}
            onClick={() => clickHandler && clickHandler.call()}
            type={handleSubmit ? 'submit' : 'button'}
        >
            {text}
        </button>
    );
};

export default Button;
