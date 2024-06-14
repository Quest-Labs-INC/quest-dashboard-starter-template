import React from "react";

const Button = ({
    label = "Click here",
    handleFunction,
    isSelected = false,
    disabled = false,
    additionalClasses = "",
}) => {
    return (
        <button
            onClick={handleFunction}
            type="button"
            disabled={disabled}
            className={`h-10 px-5 text-lg rounded-lg shadow transition-colors duration-150 focus:shadow-outline ${isSelected ? 'bg-green-500 text-white' : 'bg-gray-200'} ${additionalClasses}`}
        >
            {label}
        </button>
    );
}

export default Button;
