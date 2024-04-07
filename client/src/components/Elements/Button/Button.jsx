import './index.css';

const Button = ({ text, clickHandler, type, size }) => {
    return (
        <button
            className={`flex center border-radius-m box-shadow bold ${type} ${size}`}
            onClick={() => clickHandler && clickHandler.call()}
        >
            {text}
        </button>
    );
};

export default Button;
