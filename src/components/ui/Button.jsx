import React from "react";

const Button = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#222] px-4 py-2 text-xl transition duration-200 ease-in-out hover:opacity-75 disabled:opacity-50"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {children}
        </button>
    );
};

export default Button;
