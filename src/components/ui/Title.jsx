import React from "react";

const Title = ({ children, ...props }) => {
    return (
        <span {...props} className="text-4xl">
            {children}
        </span>
    );
};

export default Title;
