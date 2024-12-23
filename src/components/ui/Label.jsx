import React from "react";

const Label = ({ children, ...props }) => {
    return (
        <span {...props} className="text-2xl">
            {children}
        </span>
    );
};

export default Label;
